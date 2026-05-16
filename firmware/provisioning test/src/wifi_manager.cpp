#include "wifi_manager.h"
#include "config.h"
#include <WiFi.h>

bool WifiManager::connect(const char* ssid, const char* password) {
  Serial.printf("[WiFi] Connecting to '%s'...\n", ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED) {
    if (millis() - startTime > WIFI_CONNECT_TIMEOUT_MS) {
      Serial.println("[WiFi] Connection timed out");
      WiFi.disconnect();
      return false;
    }
    delay(500);
    Serial.print(".");
  }

  Serial.printf("\n[WiFi] Connected! IP: %s\n", WiFi.localIP().toString().c_str());
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
