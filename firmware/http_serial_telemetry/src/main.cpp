#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

// Hardcoded test configuration.
// Change these values for your WiFi and backend before uploading.
static const char* WIFI_SSID = "cloud9";
static const char* WIFI_PASSWORD = "12345678";
static const char* BACKEND_URL = "https://pwrpulsebackend.azurewebsites.net/devices/telemetry";
static const char* DEVICE_ID = "esp32-http-serial-1";

// ESP32 Serial2 pins. Connect the sending ESP TX to this ESP RX pin.
static const int SERIAL2_RX_PIN = 16;
static const int SERIAL2_TX_PIN = 17;
static const uint32_t SERIAL_BAUD = 9600;

static unsigned long lastMockSend = 0;

void connectWifi() {
  Serial.printf("[WiFi] Connecting to %s", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.printf("[WiFi] Connected. IP: %s\n", WiFi.localIP().toString().c_str());
}

bool parseReading(const String& line, float& current, float& voltage) {
  const int commaIndex = line.indexOf(',');
  if (commaIndex <= 0) {
    return false;
  }

  current = line.substring(0, commaIndex).toFloat();
  voltage = line.substring(commaIndex + 1).toFloat();
  return true;
}

void postReading(float current, float voltage) {
  if (WiFi.status() != WL_CONNECTED) {
    connectWifi();
  }

  HTTPClient http;
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");

  char body[160];
  snprintf(
    body,
    sizeof(body),
    "{\"deviceId\":\"%s\",\"current\":%.3f,\"voltage\":%.3f}",
    DEVICE_ID,
    current,
    voltage
  );

  Serial.printf("[HTTP] POST %s\n", body);
  const int statusCode = http.POST(body);
  const String response = http.getString();
  Serial.printf("[HTTP] Status: %d Response: %s\n", statusCode, response.c_str());

  http.end();
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(SERIAL_BAUD, SERIAL_8N1, SERIAL2_RX_PIN, SERIAL2_TX_PIN);
  delay(1000);

  Serial.println("\nPowerPulse simple HTTP serial telemetry");
  Serial.println("Expected Serial2 line format: current,voltage");
  Serial.println("Example from sender ESP: 1.25,229.8");

  connectWifi();
}

void loop() {
  if (Serial2.available()) {
    String line = Serial2.readStringUntil('\n');
    line.trim();

    float current = 0;
    float voltage = 0;
    if (parseReading(line, current, voltage)) {
      Serial.printf("[Serial2] current=%.3f A voltage=%.3f V\n", current, voltage);
      postReading(current, voltage);
    } else if (line.length() > 0) {
      Serial.printf("[Serial2] Invalid line: %s\n", line.c_str());
    }
  }

  // Mock fallback so you can test backend/frontend with only one ESP.
  if (millis() - lastMockSend > 10000) {
    lastMockSend = millis();
    const float mockCurrent = random(50, 250) / 100.0;
    const float mockVoltage = random(2200, 2410) / 10.0;
    postReading(mockCurrent, mockVoltage);
  }
}
