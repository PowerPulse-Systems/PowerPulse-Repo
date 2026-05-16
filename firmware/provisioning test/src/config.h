#pragma once

// ========================
// Pin Definitions
// ========================
#define STATUS_LED_PIN     2     // Built-in LED (GPIO 2)
#define RESET_BUTTON_PIN   0     // BOOT button (GPIO 0)

// ========================
// BLE Configuration
// ========================
#define BLE_DEVICE_PREFIX      "PP-Setup-"
#define PROVISION_SERVICE_UUID "12345678-1234-1234-1234-123456789abc"
#define PROVISION_WRITE_UUID   "12345678-1234-1234-1234-123456789abd"
#define PROVISION_STATUS_UUID  "12345678-1234-1234-1234-123456789abe"
#define PROVISION_INFO_UUID    "12345678-1234-1234-1234-123456789abf"

// ========================
// WiFi Configuration
// ========================
#define WIFI_CONNECT_TIMEOUT_MS  15000   // 15 seconds timeout
#define WIFI_MAX_RETRIES         5       // Max retries before re-entering provisioning

// ========================
// MQTT Configuration
// ========================
#define MQTT_RECONNECT_DELAY_MS  5000    // 5 seconds between reconnects
#define MQTT_MAX_RETRIES         5

// ========================
// NVS Namespace
// ========================
#define NVS_NAMESPACE "pp_config"

// ========================
// Reset Button
// ========================
#define RESET_HOLD_TIME_MS  5000  // Hold 5 seconds to factory reset
