#pragma once
#include <Arduino.h>

// NVS configuration storage functions
namespace NvsConfig {
  // Initialize NVS
  void init();

  // Check if device has been provisioned
  bool isProvisioned();

  // Store provisioning data
  bool store(
    const char* wifiSsid,
    const char* wifiPass,
    const char* backendUrl,
    const char* deviceId,
    const char* mqttHost,
    uint16_t mqttPort,
    const char* mqttUser,
    const char* mqttPass
  );

  // Read stored values
  String getWifiSsid();
  String getWifiPass();
  String getBackendUrl();
  String getDeviceId();
  String getMqttHost();
  uint16_t getMqttPort();
  String getMqttUser();
  String getMqttPass();

  // Factory reset — clear all stored data
  void factoryReset();
}
