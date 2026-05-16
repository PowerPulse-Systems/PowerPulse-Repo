#pragma once
#include <Arduino.h>

namespace LedStatus {
  void init();
  void provisioningMode();   // Slow blink (1s interval)
  void wifiConnecting();     // Fast blink (200ms)
  void mqttConnecting();     // Double blink pattern
  void normalOperation();    // Solid ON
  void errorMode();          // Triple fast blink
  void off();
  void update();             // Call in loop() to drive non-blocking LED patterns
}
