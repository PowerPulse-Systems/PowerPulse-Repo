#include <Arduino.h>
#include <unity.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// --- WiFi Credentials ---
const char* ssid = "cloud9";
const char* password = "12345678";

// --- MQTT Credentials ---
const char* mqtt_server = "53f049e94d53425088c3cabd38fe8a00.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;                     // Port 8883 requires TLS/SSL
const char* mqtt_user = "device";   // Replace with your HiveMQ username
const char* mqtt_pass = "Userdevicepass1";      // Provided password

WiFiClientSecure secureClient;
PubSubClient mqttClient(secureClient);

void connectToWiFi() {
    Serial.print("Connecting to WiFi");
    WiFi.begin(ssid, password);
    
    // Wait for connection with a timeout
    int retries = 0;
    while (WiFi.status() != WL_CONNECTED && retries < 20) {
        delay(500);
        Serial.print(".");
        retries++;
    }
    Serial.println();
    
    TEST_ASSERT_EQUAL_MESSAGE(WL_CONNECTED, WiFi.status(), "Failed to connect to WiFi");
}

void test_mqtt_connection(void) {
    // HiveMQ Cloud requires TLS. `setInsecure()` skips certificate validation 
    // entirely which is great and easy for testing.
    secureClient.setInsecure(); 
    
    mqttClient.setServer(mqtt_server, mqtt_port);
    
    Serial.println("Attempting to connect to MQTT broker...");
    
    String clientId = "ESP32-TestClient-" + String(random(0xffff), HEX);
    
    bool connected = mqttClient.connect(clientId.c_str(), mqtt_user, mqtt_pass);
    
    if (!connected) {
        Serial.printf("MQTT Connection failed, state code: %d\n", mqttClient.state());
    } else {
        Serial.println("MQTT Connection successful!");
    }
    
    TEST_ASSERT_TRUE_MESSAGE(connected, "MQTT Connection failed - check console for state code");
    
    // Clean up
    if (connected) {
        mqttClient.disconnect();
    }
}

void setup() {
    delay(2000); // 2 secs to allow terminal to connect
    Serial.begin(115200);
    
    UNITY_BEGIN();
    
    connectToWiFi();
    if (WiFi.status() == WL_CONNECTED) {
        RUN_TEST(test_mqtt_connection);
    }
    
    UNITY_END();
}

void loop() {
    // Tests are complete once setup() finishes
    delay(100);
}