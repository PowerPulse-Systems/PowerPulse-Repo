#pragma once
#include <Arduino.h>

namespace MqttClient {
  // Connect to MQTT broker with stored credentials
  bool connect(const char* host, uint16_t port, const char* username, const char* password, const char* clientId);

  // Check if connected
  bool isConnected();

  // Publish a message
  bool publish(const char* topic, const char* payload);

  // Maintain connection (call in loop)
  void loop();

  // Disconnect
  void disconnect();

  // Publish device status (online/offline)
  bool publishStatus(const char* macAddress, bool online);

  // Publish provisioning acknowledgment
  bool publishProvisioningAck(const char* macAddress);

  // Publish energy telemetry array (legacy topic)
  bool publishTelemetry(const char* macAddress, const char* jsonPayload);

  // Publish live telemetry (fast, every 3s) → bems/<mac>/live
  bool publishLive(const char* macAddress, const char* jsonPayload);

  // Publish energy accumulation (every 60s) → bems/<mac>/energy
  bool publishEnergy(const char* macAddress, const char* jsonPayload);
}
