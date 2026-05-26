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
#define WIFI_MAX_RETRIES         3       // Max retries before re-entering provisioning

// ========================
// MQTT Configuration
// ========================
#define MQTT_RECONNECT_DELAY_MS  1000    // 1 second between reconnects
#define MQTT_MAX_RETRIES         3

// ========================
// Telemetry Intervals
// ========================
#define LIVE_INTERVAL_MS         3000    // Fast live telemetry (3 seconds)
#define ENERGY_INTERVAL_MS       60000   // Energy accumulation (60 seconds)

// ========================
// Channel Configuration (hardcoded for now)
// ========================
#define NUM_VOLTAGE_CHANNELS     3       // Number of voltage inputs
#define NUM_CURRENT_CHANNELS     7       // Total CT channels across all voltage inputs
// Mapping: voltage 1 -> CT 1,2,3 | voltage 2 -> CT 4,5 | voltage 3 -> CT 6,7

// ========================
// NVS Namespace
// ========================
#define NVS_NAMESPACE "pp_config"

// ========================
// Reset Button
// ========================
#define RESET_HOLD_TIME_MS  5000  // Hold 5 seconds to factory reset
