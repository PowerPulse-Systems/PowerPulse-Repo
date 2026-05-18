/**
 * PowerPulse ESP32 Provisioning Firmware
 * 
 * Boot logic:
 *   1. Check reset button (GPIO 0) — if held 5s, factory reset
 *   2. Check NVS for stored provisioning config
 *   3. If provisioned → connect WiFi → connect MQTT → normal operation
 *   4. If not provisioned → start BLE server, wait for provisioning
 * 
 * Recovery:
 *   - If WiFi fails 5 times consecutively → re-enter BLE provisioning mode
 *   - Physical button hold (5s) → factory reset at any time during boot
 */

#include <Arduino.h>
#include "config.h"
#include "nvs_config.h"
#include "led_status.h"
#include "ble_provisioning.h"
#include "wifi_manager.h"
#include "mqtt_client.h"

// ========================
// State Machine
// ========================
enum class DeviceState {
  BOOT,
  PROVISIONING,     // BLE advertising, waiting for config
  WIFI_CONNECTING,
  MQTT_CONNECTING,
  NORMAL,           // Fully connected, operational
  RECOVERY          // WiFi/MQTT failed, re-entering provisioning
};

static DeviceState currentState = DeviceState::BOOT;
static int wifiFailCount = 0;
static bool provisioningInProgress = false;

// ========================
// Provisioning Callback
// ========================
void onProvisioningData(
  const char* wifiSsid, const char* wifiPass,
  const char* backendUrl, const char* deviceId,
  const char* mqttHost, uint16_t mqttPort,
  const char* mqttUser, const char* mqttPass
) {
  Serial.println("[Main] Provisioning data received!");
  provisioningInProgress = true;

  // Store to NVS
  NvsConfig::store(wifiSsid, wifiPass, backendUrl, deviceId, mqttHost, mqttPort, mqttUser, mqttPass);

  // Attempt WiFi connection
  BleProvisioning::sendStatus("WIFI_CONNECTING");
  LedStatus::wifiConnecting();

  if (WifiManager::connect(wifiSsid, wifiPass)) {
    BleProvisioning::sendStatus("WIFI_CONNECTED");
    
    // Attempt MQTT connection
    BleProvisioning::sendStatus("MQTT_CONNECTING");
    LedStatus::mqttConnecting();

    String clientId = "pp-" + WifiManager::getMacSuffix();
    if (MqttClient::connect(mqttHost, mqttPort, mqttUser, mqttPass, clientId.c_str())) {
      BleProvisioning::sendStatus("MQTT_CONNECTED");

      // Publish provisioning acknowledgment
      String mac = WifiManager::getMacAddress();
      mac.replace(":", "");
      MqttClient::publishProvisioningAck(mac.c_str());
      MqttClient::publishStatus(mac.c_str(), true);

      BleProvisioning::sendStatus("PROVISIONED");
      
      // Wait a moment for status to be sent, then stop BLE
      delay(2000);
      BleProvisioning::stop();
      
      currentState = DeviceState::NORMAL;
      LedStatus::normalOperation();
      Serial.println("[Main] Provisioning complete! Entering normal mode.");
    } else {
      BleProvisioning::sendStatus("MQTT_FAILED");
      LedStatus::errorMode();
      Serial.println("[Main] MQTT connection failed");
      provisioningInProgress = false;
    }
  } else {
    BleProvisioning::sendStatus("WIFI_FAILED");
    LedStatus::errorMode();
    Serial.println("[Main] WiFi connection failed");
    provisioningInProgress = false;
  }
}

// ========================
// Check Reset Button
// ========================
bool checkResetButton() {
  pinMode(RESET_BUTTON_PIN, INPUT_PULLUP);
  
  if (digitalRead(RESET_BUTTON_PIN) == LOW) {
    Serial.println("[Main] Reset button pressed, hold for 5 seconds to factory reset...");
    unsigned long pressStart = millis();
    
    while (digitalRead(RESET_BUTTON_PIN) == LOW) {
      if (millis() - pressStart >= RESET_HOLD_TIME_MS) {
        Serial.println("[Main] Factory reset triggered!");
        NvsConfig::factoryReset();
        return true;
      }
      delay(100);
    }
    Serial.println("[Main] Button released before reset threshold");
  }
  return false;
}

// ========================
// Enter Provisioning Mode
// ========================
void enterProvisioningMode() {
  currentState = DeviceState::PROVISIONING;
  LedStatus::provisioningMode();

  // Build device name: PP-Setup-XXXX
  String macSuffix = WifiManager::getMacSuffix();
  String deviceName = String(BLE_DEVICE_PREFIX) + macSuffix;

  Serial.printf("[Main] Entering provisioning mode as '%s'\n", deviceName.c_str());
  BleProvisioning::start(deviceName.c_str(), onProvisioningData);
}

// ========================
// Connect with stored config
// ========================
void connectWithStoredConfig() {
  // WiFi
  currentState = DeviceState::WIFI_CONNECTING;
  LedStatus::wifiConnecting();

  String ssid = NvsConfig::getWifiSsid();
  String pass = NvsConfig::getWifiPass();

  if (!WifiManager::connect(ssid.c_str(), pass.c_str())) {
    wifiFailCount++;
    Serial.printf("[Main] WiFi failed (%d/%d)\n", wifiFailCount, WIFI_MAX_RETRIES);
    
    if (wifiFailCount >= WIFI_MAX_RETRIES) {
      Serial.println("[Main] Max WiFi retries reached, entering recovery mode");
      currentState = DeviceState::RECOVERY;
      enterProvisioningMode();
      return;
    }
    
    LedStatus::errorMode();
    delay(5000);
    connectWithStoredConfig(); // Retry recursively
    return;
  }

  wifiFailCount = 0;

  // MQTT
  currentState = DeviceState::MQTT_CONNECTING;
  LedStatus::mqttConnecting();

  String host = NvsConfig::getMqttHost();
  uint16_t port = NvsConfig::getMqttPort();
  String user = NvsConfig::getMqttUser();
  String mqttPass = NvsConfig::getMqttPass();
  String clientId = "pp-" + WifiManager::getMacSuffix();

  if (MqttClient::connect(host.c_str(), port, user.c_str(), mqttPass.c_str(), clientId.c_str())) {
    currentState = DeviceState::NORMAL;
    LedStatus::normalOperation();

    // Publish online status
    String mac = WifiManager::getMacAddress();
    mac.replace(":", "");
    MqttClient::publishStatus(mac.c_str(), true);

    Serial.println("[Main] Normal operation mode active");
  } else {
    Serial.println("[Main] MQTT connection failed, entering recovery mode");
    currentState = DeviceState::RECOVERY;
    enterProvisioningMode();
  }
}

// ========================
// Arduino Setup
// ========================
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n========================================");
  Serial.println("  PowerPulse ESP32 — Provisioning FW");
  Serial.println("========================================");

  LedStatus::init();
  NvsConfig::init();

  // Check for factory reset
  if (checkResetButton()) {
    Serial.println("[Main] Config cleared, restarting...");
    delay(1000);
    ESP.restart();
  }

  // Decide boot path
  if (NvsConfig::isProvisioned()) {
    Serial.println("[Main] Device is provisioned, connecting...");
    connectWithStoredConfig();
  } else {
    Serial.println("[Main] Device not provisioned, starting BLE...");
    enterProvisioningMode();
  }
}

// ========================
// Arduino Loop
// ========================
void loop() {
  LedStatus::update();

  // Check if user is holding the BOOT button to perform a factory reset
  if (checkResetButton()) {
    Serial.println("[Main] Config cleared by button, restarting...");
    delay(1000);
    ESP.restart();
  }

  switch (currentState) {
    case DeviceState::PROVISIONING:
      // BLE server handles everything via callbacks
      // Just keep LED updating
      break;

    case DeviceState::NORMAL:
      MqttClient::loop();
      
      // Check WiFi health
      if (!WifiManager::isConnected()) {
        Serial.println("[Main] WiFi lost! Attempting reconnect...");
        currentState = DeviceState::WIFI_CONNECTING;
        connectWithStoredConfig();
      }
      break;

    case DeviceState::RECOVERY:
      // In provisioning mode due to failure
      break;

    default:
      break;
  }

  delay(10); // Small delay to prevent watchdog issues
}
