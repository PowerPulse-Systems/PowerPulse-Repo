#pragma once
#include <Arduino.h>

namespace WifiManager {
  // Attempt to connect to WiFi with stored credentials
  // Returns true if connected successfully
  bool connect(const char* ssid, const char* password);

  // Check if currently connected
  bool isConnected();

  // Disconnect from WiFi
  void disconnect();

  // Get local IP address as string
  String getLocalIP();

  // Get MAC address as string (XX:XX:XX:XX:XX:XX)
  String getMacAddress();

  // Get last 4 characters of MAC for BLE device name
  String getMacSuffix();
}
