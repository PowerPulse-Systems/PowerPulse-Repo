#include "mqtt_client.h"
#include "config.h"
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

static WiFiClientSecure espClient;
static PubSubClient mqttClient(espClient);

bool MqttClient::connect(const char* host, uint16_t port, const char* username, const char* password, const char* clientId) {
  Serial.printf("[MQTT] Initializing connection to Broker at %s:%d...\n", host, port);
  Serial.printf("[MQTT] Using Client ID: %s, Username length: %d\n", clientId, strlen(username));
  
  // HiveMQ Cloud on port 8883 requires SSL/TLS. We skip cert validation here.
  espClient.setInsecure();
  
  mqttClient.setServer(host, port);
  
  int retries = 0;
  while (!mqttClient.connected() && retries < MQTT_MAX_RETRIES) {
    Serial.printf("[MQTT] Connection attempt %d/%d...\n", retries + 1, MQTT_MAX_RETRIES);
    Serial.printf("[MQTT] Config -> Host: %s:%d | ClientID: %s | User: %s | Pass: %s\n", host, port, clientId, username, password);
    if (mqttClient.connect(clientId, username, password)) {
      Serial.println("[MQTT] Successfully connected to broker!");
      return true;
    }
    
    int state = mqttClient.state();
    Serial.printf("[MQTT] Connection failed (rc=%d). ", state);
    
    // Provide some context for the error code
    switch(state) {
      case MQTT_CONNECTION_TIMEOUT: Serial.print("Timeout. "); break;
      case MQTT_CONNECTION_LOST: Serial.print("Connection lost. "); break;
      case MQTT_CONNECT_FAILED: Serial.print("Connect failed. "); break;
      case MQTT_DISCONNECTED: Serial.print("Disconnected. "); break;
      case MQTT_CONNECT_BAD_PROTOCOL: Serial.print("Bad protocol. "); break;
      case MQTT_CONNECT_BAD_CLIENT_ID: Serial.print("Bad Client ID. "); break;
      case MQTT_CONNECT_UNAVAILABLE: Serial.print("Unavailable. "); break;
      case MQTT_CONNECT_BAD_CREDENTIALS: Serial.print("Bad credentials. "); break;
      case MQTT_CONNECT_UNAUTHORIZED: Serial.print("Unauthorized. "); break;
    }
    
    Serial.printf("Retrying in %dms...\n", MQTT_RECONNECT_DELAY_MS);
    delay(MQTT_RECONNECT_DELAY_MS);
    retries++;
  }

  Serial.println("[MQTT] Connection completely failed after max retries.");
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
