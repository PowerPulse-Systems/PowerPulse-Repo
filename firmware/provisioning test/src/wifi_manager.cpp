#include "wifi_manager.h"
#include "config.h"
#include <WiFi.h>

bool WifiManager::connect(const char* ssid, const char* password) {
  Serial.printf("[WiFi] Attempting to connect to SSID: '%s'\n", ssid);
  
  // Debug output length for password (avoid printing password)
  Serial.printf("[WiFi] Password length: %d\n", strlen(password));

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED) {
    if (millis() - startTime > WIFI_CONNECT_TIMEOUT_MS) {
      Serial.printf("\n[WiFi] Connection timed out after %d ms. Current status: %d\n", WIFI_CONNECT_TIMEOUT_MS, WiFi.status());
      WiFi.disconnect();
      return false;
    }
    delay(500);
    Serial.print(".");
  }

  Serial.printf("\n[WiFi] Successfully connected to %s!\n", ssid);
  Serial.printf("[WiFi] Assigned IP Address: %s\n", WiFi.localIP().toString().c_str());
  Serial.printf("[WiFi] Signal Strength (RSSI): %d dBm\n", WiFi.RSSI());
  Serial.printf("[WiFi] MAC Address: %s\n", WiFi.macAddress().c_str());
  return true;
}

bool WifiManager::isConnected() {
  return WiFi.status() == WL_CONNECTED;
}

void WifiManager::disconnect() {
  WiFi.disconnect();
  Serial.println("[WiFi] Disconnected");
}

String WifiManager::getLocalIP() {
  return WiFi.localIP().toString();
}

String WifiManager::getMacAddress() {
  return WiFi.macAddress();
}

String WifiManager::getMacSuffix() {
  String mac = WiFi.macAddress();
  // Remove colons and take last 4 characters
  mac.replace(":", "");
  return mac.substring(mac.length() - 4);
}
