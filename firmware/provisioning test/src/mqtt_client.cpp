#include "mqtt_client.h"
#include "config.h"
#include <WiFi.h>
#include <PubSubClient.h>

static WiFiClient espClient;
static PubSubClient mqttClient(espClient);

bool MqttClient::connect(const char* host, uint16_t port, const char* username, const char* password, const char* clientId) {
  Serial.printf("[MQTT] Connecting to %s:%d...\n", host, port);
  
  mqttClient.setServer(host, port);
  
  int retries = 0;
  while (!mqttClient.connected() && retries < MQTT_MAX_RETRIES) {
    if (mqttClient.connect(clientId, username, password)) {
      Serial.println("[MQTT] Connected!");
      return true;
    }
    
    Serial.printf("[MQTT] Connection failed (rc=%d), retrying in %dms...\n", 
                  mqttClient.state(), MQTT_RECONNECT_DELAY_MS);
    delay(MQTT_RECONNECT_DELAY_MS);
    retries++;
  }

  Serial.println("[MQTT] Connection failed after max retries");
  return false;
}

bool MqttClient::isConnected() {
  return mqttClient.connected();
}

bool MqttClient::publish(const char* topic, const char* payload) {
  if (!mqttClient.connected()) {
    Serial.println("[MQTT] Not connected, cannot publish");
    return false;
  }
  bool result = mqttClient.publish(topic, payload);
  if (result) {
    Serial.printf("[MQTT] Published to %s\n", topic);
  }
  return result;
}

void MqttClient::loop() {
  if (mqttClient.connected()) {
    mqttClient.loop();
  }
}

void MqttClient::disconnect() {
  mqttClient.disconnect();
  Serial.println("[MQTT] Disconnected");
}

bool MqttClient::publishStatus(const char* macAddress, bool online) {
  char topic[64];
  snprintf(topic, sizeof(topic), "bems/%s/status", macAddress);
  const char* payload = online ? "{\"status\":\"online\"}" : "{\"status\":\"offline\"}";
  return publish(topic, payload);
}

bool MqttClient::publishProvisioningAck(const char* macAddress) {
  char topic[64];
  snprintf(topic, sizeof(topic), "bems/%s/provisioning/ack", macAddress);
  return publish(topic, "{\"status\":\"provisioned\"}");
}
