#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "EmonLib.h"

// OLED display size
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// Create OLED object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Create EnergyMonitor object
EnergyMonitor emon1;

// =====================================================
// CALIBRATION VALUES — Adjust these to match your setup
// =====================================================
#define VOLTAGE_CAL     57.52   // Adjust if voltage reads wrong
#define VOLTAGE_PHASE   1.7     // Phase shift for ZMPT101B
#define CURRENT_CAL     3.51    // ✅ Fixed: was 111.1 (overcounting ~31x)
#define VOLTAGE_PIN     33
#define CURRENT_PIN     34
#define VOLTAGE_MIN     80.0    // Below this = no load / noise floor

void setup()
{
  Serial.begin(9600);

  // Initialize OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    while (1);
  }

  // Splash screen
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(10, 10);
  display.println("ENERGY");
  display.setCursor(10, 35);
  display.println("MONITOR");
  display.display();

  // Extended delay for ZMPT101B + ADC to fully settle
  delay(3000);

  // Initialize voltage and current sensors
  emon1.voltage(VOLTAGE_PIN, VOLTAGE_CAL, VOLTAGE_PHASE);
  emon1.current(CURRENT_PIN, CURRENT_CAL);

  // Warmup screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(20, 20);
  display.println("Warming up...");
  display.setCursor(20, 35);
  display.println("Please wait");
  display.display();

  // Warmup: run dummy cycles so ADC midpoint stabilizes
  for (int i = 0; i < 5; i++) {
    emon1.calcVI(40, 2000);
    delay(500);
  }

  Serial.println("=== Energy Monitor Started ===");
  Serial.println("If current reads wrong, adjust CURRENT_CAL:");
  Serial.println("  new_cal = current_cal x (real / displayed)");
  Serial.println("==============================");
}

void loop()
{
  // Dummy run to flush stale ADC readings
  emon1.calcVI(40, 2000);

  // Actual measurement
  emon1.calcVI(40, 2000);

  // Read raw values
  float realPower     = emon1.realPower;
  float apparentPower = emon1.apparentPower;
  float powerFactor   = emon1.powerFactor;
  float supplyVoltage = emon1.Vrms;
  float Irms          = emon1.Irms;

  // Noise floor: if voltage too low, zero everything out
  if (supplyVoltage < VOLTAGE_MIN) {
    supplyVoltage = 0.0;
    Irms          = 0.0;
    realPower     = 0.0;
    apparentPower = 0.0;
    powerFactor   = 0.0;
  }

  // Clamp negative values (can happen with EmonLib on low loads)
  if (realPower     < 0) realPower     = 0;
  if (apparentPower < 0) apparentPower = 0;
  if (Irms          < 0) Irms          = 0;
  if (powerFactor   < 0) powerFactor   = 0;
  if (powerFactor   > 1) powerFactor   = 1;

  // ── Serial Monitor Output ──────────────────────────
  Serial.println("-------------------");
  Serial.print("Voltage:        ");
  Serial.print(supplyVoltage, 1);
  Serial.println(" V");

  Serial.print("Current:        ");
  Serial.print(Irms, 3);
  Serial.println(" A");

  Serial.print("Real Power:     ");
  Serial.print(realPower, 1);
  Serial.println(" W");

  Serial.print("Apparent Power: ");
  Serial.print(apparentPower, 1);
  Serial.println(" VA");

  Serial.print("Power Factor:   ");
  Serial.println(powerFactor, 2);
  Serial.println("-------------------");

  // ── OLED Display ──────────────────────────────────
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  // Row 1 — Voltage
  display.setCursor(0, 0);
  display.print("Volt : ");
  display.print(supplyVoltage, 1);
  display.print(" V");

  // Row 2 — Current
  display.setCursor(0, 13);
  display.print("Curr : ");
  display.print(Irms, 3);
  display.print(" A");

  // Row 3 — Real Power
  display.setCursor(0, 26);
  display.print("Pwr  : ");
  display.print(realPower, 1);
  display.print(" W");

  // Row 4 — Apparent Power
  display.setCursor(0, 39);
  display.print("App  : ");
  display.print(apparentPower, 1);
  display.print(" VA");

  // Row 5 — Power Factor
  display.setCursor(0, 52);
  display.print("PF   : ");
  display.print(powerFactor, 2);

  display.display();

  delay(1000);
}
