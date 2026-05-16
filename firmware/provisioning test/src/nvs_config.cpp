#include "nvs_config.h"
#include "config.h"
#include <Preferences.h>

static Preferences prefs;

void NvsConfig::init() {
  prefs.begin(NVS_NAMESPACE, false);
  Serial.println("[NVS] Initialized");
}

bool NvsConfig::isProvisioned() {
  return prefs.getUChar("provisioned", 0) == 1;
}

bool NvsConfig::store(
  const char* wifiSsid,
  const char* wifiPass,
  const char* backendUrl,
  const char* deviceId,
  const char* mqttHost,
  uint16_t mqttPort,
  const char* mqttUser,
  const char* mqttPass
) {
  prefs.putString("wifi_ssid", wifiSsid);
  prefs.putString("wifi_pass", wifiPass);
  prefs.putString("backend_url", backendUrl);
  prefs.putString("device_id", deviceId);
  prefs.putString("mqtt_host", mqttHost);
  prefs.putUShort("mqtt_port", mqttPort);
  prefs.putString("mqtt_user", mqttUser);
  prefs.putString("mqtt_pass", mqttPass);
  prefs.putUChar("provisioned", 1);

  Serial.println("[NVS] Configuration stored successfully");
  return true;
}

String NvsConfig::getWifiSsid()   { return prefs.getString("wifi_ssid", ""); }
String NvsConfig::getWifiPass()   { return prefs.getString("wifi_pass", ""); }
String NvsConfig::getBackendUrl() { return prefs.getString("backend_url", ""); }
String NvsConfig::getDeviceId()   { return prefs.getString("device_id", ""); }
String NvsConfig::getMqttHost()   { return prefs.getString("mqtt_host", ""); }
uint16_t NvsConfig::getMqttPort() { return prefs.getUShort("mqtt_port", 1883); }
String NvsConfig::getMqttUser()   { return prefs.getString("mqtt_user", ""); }
String NvsConfig::getMqttPass()   { return prefs.getString("mqtt_pass", ""); }

void NvsConfig::factoryReset() {
  prefs.clear();
  Serial.println("[NVS] Factory reset — all config cleared");
}
