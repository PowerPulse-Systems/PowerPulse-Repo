#include "ble_provisioning.h"
#include "config.h"
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <ArduinoJson.h>
#include <WiFi.h>

static BLEServer* pServer = nullptr;
static BLECharacteristic* pWriteChar = nullptr;
static BLECharacteristic* pStatusChar = nullptr;
static BLECharacteristic* pInfoChar = nullptr;
static bool clientConnected = false;
static ProvisioningCallback onProvisioningReceived = nullptr;

// Global command flags — read by main.cpp loop()
volatile bool commitRequested = false;
volatile bool rollbackRequested = false;

// ========================
// BLE Server Callbacks
// ========================
class ServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) override {
    clientConnected = true;
    Serial.println("[BLE] Client connected");
  }

  void onDisconnect(BLEServer* pServer) override {
    clientConnected = false;
    Serial.println("[BLE] Client disconnected");
    // Restart advertising so another client can connect
    pServer->startAdvertising();
  }
};

// ========================
// Provisioning Write Callback
// ========================
class ProvisionWriteCallback : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* pCharacteristic) override {
    std::string rxValue = pCharacteristic->getValue();
    String value = rxValue.c_str();
    value.trim();
    
    if (value.length() == 0) {
      Serial.println("[BLE] Empty write received");
      return;
    }

    // ---- Check for plain-text commands first ----
    if (value == "COMMIT") {
      Serial.println("[BLE] COMMIT command received from app");
      commitRequested = true;
      return;
    }
    
    if (value == "ROLLBACK") {
      Serial.println("[BLE] ROLLBACK command received from app");
      rollbackRequested = true;
      return;
    }

    // ---- Otherwise, treat as JSON provisioning payload ----
    Serial.printf("[BLE] Received provisioning payload (%d bytes):\n", value.length());

    // Parse JSON payload
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, value);

    if (error) {
      Serial.printf("[BLE] JSON parse error: %s (payload: %s)\n", error.c_str(), value.c_str());
      BleProvisioning::sendStatus("ERROR:Invalid JSON");
      return;
    }

    Serial.println("[BLE] JSON parsed successfully");

    // Extract fields
    const char* wifiSsid   = doc["wifi_ssid"]     | "";
    const char* wifiPass   = doc["wifi_password"]  | "";
    const char* backendUrl = doc["backend_url"]    | "";
    const char* deviceId   = doc["device_id"]      | "";
    const char* mqttHost   = doc["mqtt_host"]      | "";
    uint16_t    mqttPort   = doc["mqtt_port"]      | 1883;
    const char* mqttUser   = doc["mqtt_username"]   | "";
    const char* mqttPass   = doc["mqtt_password"]   | "";

    Serial.printf("[BLE] Extracted Config:\n");
    Serial.printf("  - SSID: %s\n", wifiSsid);
    Serial.printf("  - Backend URL: %s\n", backendUrl);
    Serial.printf("  - Device ID: %s\n", deviceId);
    Serial.printf("  - MQTT Host: %s:%d\n", mqttHost, mqttPort);
    Serial.printf("  - MQTT User: %s\n", mqttUser);
    Serial.printf("  - MQTT Pass: %s\n", mqttPass);

    // Validate required fields
    if (strlen(wifiSsid) == 0 || strlen(backendUrl) == 0 || strlen(mqttHost) == 0) {
      BleProvisioning::sendStatus("ERROR:Missing required fields");
      return;
    }

    BleProvisioning::sendStatus("RECEIVED");

    // Invoke the callback (stores data in RAM, does NOT save to NVS)
    if (onProvisioningReceived) {
      onProvisioningReceived(wifiSsid, wifiPass, backendUrl, deviceId, mqttHost, mqttPort, mqttUser, mqttPass);
    }
  }
};

// ========================
// Public API
// ========================

void BleProvisioning::start(const char* deviceName, ProvisioningCallback callback) {
  onProvisioningReceived = callback;

  Serial.printf("[BLE] Starting provisioning server as '%s'\n", deviceName);

  BLEDevice::init(deviceName);
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  // Create the provisioning service
  BLEService* pService = pServer->createService(PROVISION_SERVICE_UUID);

  // Write characteristic — receives provisioning JSON
  pWriteChar = pService->createCharacteristic(
    PROVISION_WRITE_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  pWriteChar->setCallbacks(new ProvisionWriteCallback());

  // Status characteristic — sends status updates via notify
  pStatusChar = pService->createCharacteristic(
    PROVISION_STATUS_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  pStatusChar->addDescriptor(new BLE2902());

  // Info characteristic — device info (MAC, firmware version)
  pInfoChar = pService->createCharacteristic(
    PROVISION_INFO_UUID,
    BLECharacteristic::PROPERTY_READ
  );
  
  // Set device info JSON
  JsonDocument infoDoc;
  infoDoc["mac"] = WiFi.macAddress();
  infoDoc["firmware"] = "1.0.0";
  infoDoc["type"] = "breaker-node";
  String infoStr;
  serializeJson(infoDoc, infoStr);
  pInfoChar->setValue(infoStr.c_str());

  // Start service and advertising
  pService->start();

  BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(PROVISION_SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("[BLE] Provisioning server started, advertising...");
}

void BleProvisioning::stop() {
  if (pServer) {
    BLEDevice::deinit(false);
    Serial.println("[BLE] Server stopped");
  }
}

void BleProvisioning::sendStatus(const char* status) {
  if (pStatusChar) {
    pStatusChar->setValue(status);
    if (clientConnected) {
      pStatusChar->notify();
    }
    Serial.printf("[BLE] Status → %s\n", status);
  }
}

bool BleProvisioning::isClientConnected() {
  return clientConnected;
}
