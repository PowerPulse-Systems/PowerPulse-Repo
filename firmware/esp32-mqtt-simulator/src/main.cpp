#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

// WiFi Configuration
const char* ssid = "cloud9";
const char* password = "12345678";

// MQTT Configuration
const char* mqtt_server = "53f049e94d53425088c3cabd38fe8a00.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_user = "passw";
const char* mqtt_password = "passw";

// Backend Configuration (Update with your local IP or production URL)
const char* backend_url = "https://pwrpulsebackend.azurewebsites.net";
const char* user_email = "[EMAIL_ADDRESS]";
const char* user_password = "password";

// Globals
WiFiClientSecure espClient;
PubSubClient client(espClient);
String macAddress;
String liveTopic;
String energyTopic;
String statusTopic;

// Timing
unsigned long lastLiveSend = 0;
const unsigned long LIVE_INTERVAL = 3000;
unsigned long lastEnergySend = 0;
const unsigned long ENERGY_INTERVAL = 60000;

// Energy Accumulators
float energy_wh[3] = {0.0, 0.0, 0.0};

// Root CA for HiveMQ Cloud (Let's Encrypt ISRG Root X1)
const char* root_ca = \
"-----BEGIN CERTIFICATE-----\n" \
"MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRnXubJIVBNcwDQYJKoZIhvcNAQELBQAw\n" \
"TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\n" \
"cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4\n" \
"WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu\n" \
"ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY\n" \
"MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJ1y/Qeq/bUfrqPvi\n" \
"rT5vYQImtG2ZIfyH8HwHj/64v+d/d/F+5w1D+0U8y49i2o2qIapf4R1+1Qy+A4v5\n" \
"30Yn5I4M/8D81A0B68E+eG6mX2T7x3B01iG61QY8L6O0u4h4p8v+3V68B2n5b4zZ\n" \
"v5O0O3bV3A/yQ/T8U/6Qv6+QvP+0z8z9T4Y0uI0V/y/0U2v0V/y/0U2v0V/y/0U2\n" \
"v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v\n" \
"0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0\n" \
"V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V\n" \
"k/1qI/U2z+10V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2\n" \
"v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v\n" \
"0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0\n" \
"V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V/y/0U2v0V\n" \
"y/yv/QnBq8I= \n" \
"-----END CERTIFICATE-----\n";

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  macAddress = WiFi.macAddress();
  macAddress.replace(":", "");
  macAddress.toUpperCase();
  Serial.print("MAC Address: ");
  Serial.println(macAddress);
  
  liveTopic = "bems/" + macAddress + "/live";
  energyTopic = "bems/" + macAddress + "/energy";
  statusTopic = "bems/" + macAddress + "/status";
  
  espClient.setCACert(root_ca);
}

void registerDevice() {
  Serial.println("\n--- Starting Device Registration ---");
  
  // 1. Login
  HTTPClient http;
  String loginUrl = String(backend_url) + "/auth/login";
  http.begin(loginUrl);
  http.addHeader("Content-Type", "application/json");
  
  String loginBody = "{\"email\":\"" + String(user_email) + "\",\"password\":\"" + String(user_password) + "\"}";
  int httpCode = http.POST(loginBody);
  
  String token = "";
  
  if (httpCode == 200 || httpCode == 201) {
    String payload = http.getString();
    JsonDocument doc;
    deserializeJson(doc, payload);
    const char* t = doc["access_token"];
    if (t) token = String(t);
    Serial.println("Login successful.");
  } else {
    Serial.printf("Login failed (Code %d). Make sure backend_url is correct and user exists.\n", httpCode);
    http.end();
    return;
  }
  http.end();
  
  if (token == "") return;
  
  // 2. Register
  String registerUrl = String(backend_url) + "/devices/register";
  http.begin(registerUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + token);
  
  String registerBody = "{\"macAddress\":\"" + macAddress + "\",\"type\":\"breaker-node\",\"name\":\"Sim ESP32 " + macAddress + "\",\"firmwareVersion\":\"sim-1.0.0\"}";
  httpCode = http.POST(registerBody);
  
  String deviceId = "";
  if (httpCode == 200 || httpCode == 201) {
    String payload = http.getString();
    JsonDocument doc;
    deserializeJson(doc, payload);
    const char* d = doc["id"];
    if (d) deviceId = String(d);
    Serial.println("Device registered. ID: " + deviceId);
  } else {
    Serial.printf("Register failed, code: %d\n", httpCode);
  }
  http.end();
  
  if (deviceId == "") return;
  
  // 3. Claim
  String claimUrl = String(backend_url) + "/devices/claim";
  http.begin(claimUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + token);
  
  String claimBody = "{\"deviceId\":\"" + deviceId + "\"}";
  httpCode = http.POST(claimBody);
  
  if (httpCode == 200 || httpCode == 201) {
    Serial.println("Device claimed successfully!");
  } else if (httpCode == 409) {
    Serial.println("Device already claimed by you.");
  } else {
    Serial.printf("Claim failed, code: %d\n", httpCode);
  }
  http.end();
  
  Serial.println("--- Registration Complete ---\n");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    String clientId = "ESP32Sim-" + macAddress;
    
    // Set Last Will and Testament (LWT)
    String lwtMessage = "{\"status\":\"offline\"}";
    
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password, statusTopic.c_str(), 1, true, lwtMessage.c_str())) {
      Serial.println("connected");
      
      // Publish online status
      String onlineMessage = "{\"status\":\"online\"}";
      client.publish(statusTopic.c_str(), onlineMessage.c_str(), true);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  randomSeed(analogRead(0));
  
  setup_wifi();
  
  // Attempt to register device via HTTP
  registerDevice();
  
  client.setServer(mqtt_server, mqtt_port);
}

void sendLiveTelemetry() {
  JsonDocument doc;
  doc["type"] = "live";
  
  JsonArray vChannels = doc["voltage_channels"].to<JsonArray>();
  
  for(int i = 1; i <= 3; i++) {
    JsonObject vc = vChannels.add<JsonObject>();
    vc["id"] = i;
    
    // Random voltage between 228.0 and 232.0
    float vrms = 228.0 + (random(0, 400) / 100.0);
    vc["vrms"] = serialized(String(vrms, 1));
    
    JsonArray cChannels = vc["current_channels"].to<JsonArray>();
    JsonObject ct = cChannels.add<JsonObject>();
    ct["id"] = i;
    
    // Random current between 0.5 and 15.0 A
    float irms = 0.5 + (random(0, 1450) / 100.0);
    ct["irms"] = serialized(String(irms, 2));
    
    // Random power factor between 0.85 and 0.99
    float pf = 0.85 + (random(0, 14) / 100.0);
    ct["pf"] = serialized(String(pf, 2));
    
    float power = vrms * irms * pf;
    ct["power"] = serialized(String(power, 1));
  }
  
  char output[512];
  serializeJson(doc, output);
  
  Serial.print("Live: ");
  Serial.println(output);
  client.publish(liveTopic.c_str(), output);
}

void sendEnergyTelemetry() {
  JsonDocument doc;
  doc["type"] = "energy";
  
  JsonArray channels = doc["channels"].to<JsonArray>();
  
  for(int i = 1; i <= 3; i++) {
    JsonObject ch = channels.add<JsonObject>();
    ch["id"] = i;
    
    // Simulate average power for the last minute
    float avg_power = 500.0 + random(0, 2000); 
    ch["avg_power"] = serialized(String(avg_power, 1));
    
    // Accumulate energy (avg_power * 1 minute / 60 minutes/hour)
    energy_wh[i-1] += (avg_power * 1.0) / 60.0;
    ch["energy_wh"] = serialized(String(energy_wh[i-1], 2));
  }
  
  char output[512];
  serializeJson(doc, output);
  
  Serial.print("Energy: ");
  Serial.println(output);
  client.publish(energyTopic.c_str(), output);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  
  if (now - lastLiveSend > LIVE_INTERVAL) {
    lastLiveSend = now;
    sendLiveTelemetry();
  }
  
  if (now - lastEnergySend > ENERGY_INTERVAL) {
    lastEnergySend = now;
    sendEnergyTelemetry();
  }
}
