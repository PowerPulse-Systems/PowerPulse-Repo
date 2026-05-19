/**
 * PowerPulse ESP32 Provisioning Firmware
 * 
 * Boot logic:
 *   1. Check reset button (GPIO 0) — if held 5s, factory reset
 *   2. Check NVS for stored provisioning config
 *   3. If provisioned → connect WiFi → connect MQTT → normal operation
 *   4. If not provisioned → start BLE server, wait for provisioning
 * 
 * Provisioning flow (two-phase commit):
 *   Phase 1: Receive credentials via BLE → test WiFi → test MQTT → report to app
 *   Phase 2: Wait for COMMIT (save to NVS) or ROLLBACK (discard and restart BLE)
 * 
 * Recovery:
 *   - If WiFi fails 5 times consecutively → re-enter BLE provisioning mode
 *   - Physical button hold (5s) → factory reset at any time
 */

#include <Arduino.h>
#include "soc/soc.h"             // Required for brownout disabling
#include "soc/rtc_cntl_reg.h"    // Required for brownout disabling
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
  PROVISIONING,       // BLE advertising, waiting for config
  WIFI_CONNECTING,
  MQTT_CONNECTING,
  AWAITING_COMMIT,    // WiFi+MQTT connected, waiting for app to send COMMIT or ROLLBACK
  NORMAL,             // Fully connected, operational
  RECOVERY            // WiFi/MQTT failed, re-entering provisioning
};

static DeviceState currentState = DeviceState::BOOT;
static int wifiFailCount = 0;
static bool provisioningInProgress = false;

// Telemetry timing
static unsigned long lastTelemetryTime = 0;
const unsigned long TELEMETRY_INTERVAL_MS = 60000; // 1 minute

// ========================
// Provisioning data (held in RAM until COMMIT)
// ========================
static String provSsid, provPass, provBackendUrl, provDeviceId, provMqttHost, provMqttUser, provMqttPass;
static uint16_t provMqttPort;
static bool startProvisioningProcess = false;

// These flags are set by BLE callbacks in ble_provisioning.cpp
extern volatile bool commitRequested;
extern volatile bool rollbackRequested;

// ========================
// Provisioning Callback (BLE → RAM only)
// ========================
void onProvisioningData(
  const char* wifiSsid, const char* wifiPass,
  const char* backendUrl, const char* deviceId,
  const char* mqttHost, uint16_t mqttPort,
  const char* mqttUser, const char* mqttPass
) {
  Serial.println("[Main] Provisioning data received from BLE callback!");
  provisioningInProgress = true;

  // Store data in RAM only — NOT to NVS yet
  provSsid = wifiSsid;
  provPass = wifiPass;
  provBackendUrl = backendUrl;
  provDeviceId = deviceId;
  provMqttHost = mqttHost;
  provMqttPort = mqttPort;
  provMqttUser = mqttUser;
  provMqttPass = mqttPass;

  // Send acknowledgment and set flag for loop() to process
  BleProvisioning::sendStatus("RECEIVED");
  startProvisioningProcess = true;
}

// ========================
// Discard temp credentials and return to BLE provisioning
// ========================
void rollbackProvisioning() {
  Serial.println("[Main] ROLLBACK — discarding temporary credentials");
  
  // Disconnect WiFi and MQTT if connected
  MqttClient::disconnect();
  WifiManager::disconnect();
  
  // Clear RAM data
  provSsid = "";
  provPass = "";
  provBackendUrl = "";
  provDeviceId = "";
  provMqttHost = "";
  provMqttPort = 0;
  provMqttUser = "";
  provMqttPass = "";
  
  provisioningInProgress = false;
  startProvisioningProcess = false;
  commitRequested = false;
  rollbackRequested = false;
  
  // Notify app
  BleProvisioning::sendStatus("ROLLBACK_OK");
  
  // Return to provisioning mode (BLE is still running)
  currentState = DeviceState::PROVISIONING;
  LedStatus::provisioningMode();
  Serial.println("[Main] Ready for new provisioning attempt");
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
// Connect with stored config (after NVS save, on reboot)
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
  // Disable the brownout detector to prevent resets on weak USB power lines
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 
  
  Serial.begin(115200);
  randomSeed(analogRead(0)); // Seed random number generator
  delay(1000);
  Serial.println("\n========================================");
  Serial.println("  PowerPulse ESP32 — Provisioning FW");
  Serial.println("  Two-Phase Commit Architecture");
  Serial.println("========================================");
  Serial.println("[Main] Brownout detector disabled for dev stability.");

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
      // Phase 1: Test connectivity with received credentials
      if (startProvisioningProcess) {
        startProvisioningProcess = false;
        
        // Do NOT store to NVS yet — just test the connections

        // Step 1: Test WiFi
        BleProvisioning::sendStatus("WIFI_CONNECTING");
        LedStatus::wifiConnecting();

        bool wifiConnected = false;
        for (int i = 0; i < WIFI_MAX_RETRIES; i++) {
          if (WifiManager::connect(provSsid.c_str(), provPass.c_str())) {
            wifiConnected = true;
            break;
          }
          Serial.printf("[Main] WiFi test attempt %d/%d failed\n", i + 1, WIFI_MAX_RETRIES);
          if (i < WIFI_MAX_RETRIES - 1) {
            delay(2000);
          }
        }

        if (wifiConnected) {
          BleProvisioning::sendStatus("WIFI_CONNECTED");
          Serial.println("[Main] WiFi test passed");
          
          // Step 2: Test MQTT
          BleProvisioning::sendStatus("MQTT_CONNECTING");
          LedStatus::mqttConnecting();

          String clientId = "pp-" + WifiManager::getMacSuffix();
          if (MqttClient::connect(provMqttHost.c_str(), provMqttPort, provMqttUser.c_str(), provMqttPass.c_str(), clientId.c_str())) {
            BleProvisioning::sendStatus("MQTT_CONNECTED");
            Serial.println("[Main] MQTT test passed");
            
            // All tests passed — enter AWAITING_COMMIT state
            currentState = DeviceState::AWAITING_COMMIT;
            Serial.println("[Main] WiFi + MQTT connected. Awaiting COMMIT or ROLLBACK from app...");
          } else {
            // MQTT failed — rollback everything
            Serial.println("[Main] MQTT test FAILED");
            BleProvisioning::sendStatus("MQTT_FAILED");
            rollbackProvisioning();
          }
        } else {
          // WiFi failed — rollback
          Serial.println("[Main] WiFi test FAILED");
          BleProvisioning::sendStatus("WIFI_FAILED");
          rollbackProvisioning();
        }
      }
      break;

    case DeviceState::AWAITING_COMMIT:
      // Phase 2: Wait for app to confirm or deny
      if (commitRequested) {
        commitRequested = false;
          Serial.println("[Main] COMMIT received - saving credentials to NVS permanently");
          BleProvisioning::sendStatus("COMMIT_START");
          
          // Save to NVS now
          Serial.println("[Main] Calling NVS Store...");
          NvsConfig::store(
            provSsid.c_str(), provPass.c_str(),
            provBackendUrl.c_str(), provDeviceId.c_str(),
            provMqttHost.c_str(), provMqttPort,
            provMqttUser.c_str(), provMqttPass.c_str()
          );
          Serial.println("[Main] NVS Store OK. Sending PROVISIONED to BLE...");

          BleProvisioning::sendStatus("PROVISIONED");
  
          // Publish provisioning acknowledgment via MQTT
          Serial.println("[Main] Publishing MQTT Acks...");
          String mac = WifiManager::getMacAddress();
          mac.replace(":", "");
          MqttClient::publishProvisioningAck(mac.c_str());
          MqttClient::publishStatus(mac.c_str(), true);
  
          Serial.println("[Main] Provisioning complete! Device is now permanently configured.");
          
          // Wait for the status notification to be sent, then stop BLE
          delay(3000);
        provisioningInProgress = false;
      }
      
      if (rollbackRequested) {
        rollbackRequested = false;
        Serial.println("[Main] ROLLBACK received — backend rejected, discarding config");
        rollbackProvisioning();
      }
      break;

    case DeviceState::NORMAL:
      MqttClient::loop();
      
      // Publish random energy every minute
      if (millis() - lastTelemetryTime >= TELEMETRY_INTERVAL_MS) {
        lastTelemetryTime = millis();
          
          String mac = WifiManager::getMacAddress();
          mac.replace(":", "");
          
          // Generate a JSON array payload for exactly 3 mock channels
          char payload[512];
          snprintf(payload, sizeof(payload), 
            "{\"channels\":["
              "{\"id\":1, \"energy_wh\":%.1f, \"avg_power_w\":%.1f},"
              "{\"id\":2, \"energy_wh\":%.1f, \"avg_power_w\":%.1f},"
              "{\"id\":3, \"energy_wh\":%.1f, \"avg_power_w\":%.1f}"
            "]}", 
            random(500, 1500) / 10.0, random(10, 100) / 1.0,
            random(50, 800) / 10.0, random(5, 50) / 1.0,
            random(10, 500) / 10.0, random(1, 30) / 1.0
          );
            
          Serial.printf("\n[Main] ------ MINUTE TICK ------\n");
          Serial.printf("[Main] Generating & Sending telemetry for MAC: %s\n", mac.c_str());
          Serial.printf("[Main] JSON Payload: %s\n", payload);
          
          bool success = MqttClient::publishTelemetry(mac.c_str(), payload);
          Serial.println("[Main] Telemetry data successfully handed off to MQTT Broker!");
        } else {
          Serial.println("[Main] Failed to send telemetry data to MQTT Broker.");
        }
        Serial.println("[Main] --------------------------\n");
      }
      
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
