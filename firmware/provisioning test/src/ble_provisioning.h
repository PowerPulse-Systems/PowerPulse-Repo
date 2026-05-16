#pragma once
#include <Arduino.h>

// Callback type for when provisioning data is received
typedef void (*ProvisioningCallback)(
  const char* wifiSsid,
  const char* wifiPass,
  const char* backendUrl,
  const char* deviceId,
  const char* mqttHost,
  uint16_t mqttPort,
  const char* mqttUser,
  const char* mqttPass
);

namespace BleProvisioning {
  // Initialize and start BLE provisioning server
  void start(const char* deviceName, ProvisioningCallback callback);

  // Stop BLE server (after provisioning complete)
  void stop();

  // Send status update back to the connected client
  void sendStatus(const char* status);

  // Check if a BLE client is connected
  bool isClientConnected();
}
