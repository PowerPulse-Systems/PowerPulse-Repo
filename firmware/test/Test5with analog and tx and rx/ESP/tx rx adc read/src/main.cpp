#include <Arduino.h>

#define RXD2 16
#define TXD2 17

void setup() {
  Serial.begin(115200);
  Serial2.begin(115200, SERIAL_8N1, RXD2, TXD2);

  // Flush any stale bytes left in the UART buffer from a previous connection
  while (Serial2.available()) {
    Serial2.read();
  }

  Serial.println("ESP32 ready — listening for ADC data...");
  Serial.println("Supported formats: AVG12 (12-bit averaged) and OVS14 (14-bit oversampled)");
  Serial.println("---------------------------------------------------");
}

/**
 * Parses a tagged packet line from the STM32.
 * Expected formats:
 *   "AVG12: <raw> | V: <voltage>"
 *   "OVS14: <raw> | V: <voltage>"
 *
 * Each line is self-contained — no session state needed.
 * Unknown/corrupt lines are silently discarded.
 */
void loop() {
  if (Serial2.available() > 0) {

    // Read one complete newline-terminated packet
    String line = Serial2.readStringUntil('\n');
    line.trim();

    // --- Method 1: 12-bit Averaged ---
    if (line.startsWith("AVG12:")) {

      // Find the raw value and voltage from "AVG12: <raw> | V: <voltage>"
      int pipeIdx = line.indexOf('|');
      if (pipeIdx > 0) {
        String rawStr  = line.substring(7, pipeIdx);   // after "AVG12: "
        rawStr.trim();

        int vIdx = line.indexOf("V:", pipeIdx);
        String voltStr = (vIdx > 0) ? line.substring(vIdx + 2) : "";
        voltStr.trim();

        int rawVal = rawStr.toInt();
        float voltage = voltStr.toFloat();

        Serial.print("[AVG 12-bit]  Raw: ");
        Serial.print(rawVal);
        Serial.print("  |  Voltage: ");
        Serial.print(voltage, 4);
        Serial.println(" V");
      }
    }

    // --- Method 2: 14-bit Oversampled ---
    else if (line.startsWith("OVS14:")) {

      int pipeIdx = line.indexOf('|');
      if (pipeIdx > 0) {
        String rawStr  = line.substring(7, pipeIdx);   // after "OVS14: "
        rawStr.trim();

        int vIdx = line.indexOf("V:", pipeIdx);
        String voltStr = (vIdx > 0) ? line.substring(vIdx + 2) : "";
        voltStr.trim();

        int rawVal = rawStr.toInt();
        float voltage = voltStr.toFloat();

        Serial.print("[OVS 14-bit]  Raw: ");
        Serial.print(rawVal);
        Serial.print("  |  Voltage: ");
        Serial.print(voltage, 4);
        Serial.println(" V");
      }
    }

    // --- Legacy format: "ANALOG: <raw>" (backward compatible) ---
    else if (line.startsWith("ANALOG:")) {
      String value_str = line.substring(8);
      value_str.trim();
      int sensor_value = value_str.toInt();

      if (sensor_value >= 0 && sensor_value <= 4095) {
        float voltage = (sensor_value / 4095.0) * 3.3;
        Serial.print("[LEGACY]  Raw: ");
        Serial.print(sensor_value);
        Serial.print("  |  Voltage: ");
        Serial.print(voltage, 3);
        Serial.println(" V");
      }
    }

    // Unknown lines are silently ignored (handles garbage after reconnect)
  }
}