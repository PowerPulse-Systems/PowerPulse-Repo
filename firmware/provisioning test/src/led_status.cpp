#include "led_status.h"
#include "config.h"

enum class LedPattern {
  OFF,
  SLOW_BLINK,    // Provisioning mode
  FAST_BLINK,    // WiFi connecting
  DOUBLE_BLINK,  // MQTT connecting
  SOLID,         // Normal operation
  TRIPLE_BLINK   // Error
};

static LedPattern currentPattern = LedPattern::OFF;
static unsigned long lastToggle = 0;
static bool ledState = false;
static uint8_t blinkStep = 0;

void LedStatus::init() {
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, LOW);
}

void LedStatus::provisioningMode() { currentPattern = LedPattern::SLOW_BLINK; blinkStep = 0; }
void LedStatus::wifiConnecting()   { currentPattern = LedPattern::FAST_BLINK; blinkStep = 0; }
void LedStatus::mqttConnecting()   { currentPattern = LedPattern::DOUBLE_BLINK; blinkStep = 0; }
void LedStatus::normalOperation()  { currentPattern = LedPattern::SOLID; }
void LedStatus::errorMode()        { currentPattern = LedPattern::TRIPLE_BLINK; blinkStep = 0; }
void LedStatus::off()              { currentPattern = LedPattern::OFF; digitalWrite(STATUS_LED_PIN, LOW); }

void LedStatus::update() {
  unsigned long now = millis();

  switch (currentPattern) {
    case LedPattern::OFF:
      digitalWrite(STATUS_LED_PIN, LOW);
      break;

    case LedPattern::SOLID:
      digitalWrite(STATUS_LED_PIN, HIGH);
      break;

    case LedPattern::SLOW_BLINK:
      if (now - lastToggle >= 1000) {
        ledState = !ledState;
        digitalWrite(STATUS_LED_PIN, ledState);
        lastToggle = now;
      }
      break;

    case LedPattern::FAST_BLINK:
      if (now - lastToggle >= 200) {
        ledState = !ledState;
        digitalWrite(STATUS_LED_PIN, ledState);
        lastToggle = now;
      }
      break;

    case LedPattern::DOUBLE_BLINK:
      // Pattern: ON-OFF-ON-OFF----pause----
      if (now - lastToggle >= (blinkStep < 4 ? 150 : 600)) {
        ledState = !ledState;
        digitalWrite(STATUS_LED_PIN, ledState);
        lastToggle = now;
        blinkStep = (blinkStep + 1) % 6;
      }
      break;

    case LedPattern::TRIPLE_BLINK:
      // Pattern: ON-OFF-ON-OFF-ON-OFF----pause----
      if (now - lastToggle >= (blinkStep < 6 ? 100 : 500)) {
        ledState = !ledState;
        digitalWrite(STATUS_LED_PIN, ledState);
        lastToggle = now;
        blinkStep = (blinkStep + 1) % 8;
      }
      break;
  }
}
