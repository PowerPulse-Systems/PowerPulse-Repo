#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "EmonLib.h"

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

EnergyMonitor emon1; // Phase 1 (voltage + current)
EnergyMonitor emon2; // Phase 2 (current only)
EnergyMonitor emon3; // Phase 3 (current only)

void setup()
{
  Serial.begin(9600);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 failed"));
    while (1);
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 10);
  display.println(" TEST");
  display.display();
  delay(3000);

  // Voltage on pin 33 (Phase 1 only)
  emon1.voltage(33, 57.52, 1.7);

  // Current sensors
  emon1.current(34, 111.1); // Phase 1
  emon2.current(32, 111.1); // Phase 2
  emon3.current(35, 111.1); // Phase 3

  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.println("  ...");
  display.println("  Please wait");
  display.display();

  // Warmup cycles
  for (int i = 0; i < 5; i++) {
    emon1.calcVI(40, 2000);
    emon2.calcVI(40, 2000); // no voltage pin configured, only Irms will be valid
    emon3.calcVI(40, 2000);
    delay(500);
  }
}

void loop()
{
  // Flush stale readings
  emon1.calcVI(40, 2000);
  emon2.calcVI(40, 2000);
  emon3.calcVI(40, 2000);

  // Actual measurement
  emon1.calcVI(40, 2000);
  emon2.calcVI(40, 2000);
  emon3.calcVI(40, 2000);

  // Phase 1 (full)
  float supplyVoltage = emon1.Vrms;
  float Irms1         = emon1.Irms;
  float realPower1    = emon1.realPower;
  float apparentPower1= emon1.apparentPower;
  float powerFactor1  = emon1.powerFactor;

  // Phase 2 & 3 (current only)
  float Irms2 = emon2.Irms;
  float Irms3 = emon3.Irms;

  // Suppress noise when no voltage
  if (supplyVoltage < 80) {
    supplyVoltage = 0;
    Irms1 = 0; Irms2 = 0; Irms3 = 0;
    realPower1 = 0; apparentPower1 = 0; powerFactor1 = 0;
  }

  // Estimate power for P2 & P3 using Phase 1 voltage
  float realPower2 = supplyVoltage * Irms2;
  float realPower3 = supplyVoltage * Irms3;
  float totalPower = realPower1 + realPower2 + realPower3;

  // Serial output
  Serial.println("=== Phase 1 ===");
  Serial.print("Voltage: ");        Serial.print(supplyVoltage); Serial.println(" V");
  Serial.print("Current: ");        Serial.print(Irms1);         Serial.println(" A");
  Serial.print("Real Power: ");     Serial.print(realPower1);    Serial.println(" W");
  Serial.print("Apparent Power: "); Serial.print(apparentPower1);Serial.println(" VA");
  Serial.print("Power Factor: ");   Serial.println(powerFactor1);
  Serial.println("=== Phase 2 ===");
  Serial.print("Current: ");    Serial.print(Irms2);      Serial.println(" A");
  Serial.print("Est. Power: "); Serial.print(realPower2); Serial.println(" W");
  Serial.println("=== Phase 3 ===");
  Serial.print("Current: ");    Serial.print(Irms3);      Serial.println(" A");
  Serial.print("Est. Power: "); Serial.print(realPower3); Serial.println(" W");
  Serial.println("=== TOTAL ===");
  Serial.print("Total Power: "); Serial.print(totalPower); Serial.println(" W");
  Serial.println("-------------------");

  // OLED: alternate between 2 pages
  static bool showPage2 = false;

  display.clearDisplay();
  display.setTextSize(1);

  if (!showPage2) {
    // Page 1: Voltage + 3 currents + PF
    display.setCursor(0, 0);
    display.print("V:  "); display.print(supplyVoltage, 1); display.println(" V");
    display.setCursor(0, 12);
    display.print("I1: "); display.print(Irms1, 2); display.println(" A");
    display.setCursor(0, 24);
    display.print("I2: "); display.print(Irms2, 2); display.println(" A");
    display.setCursor(0, 36);
    display.print("I3: "); display.print(Irms3, 2); display.println(" A");
    display.setCursor(0, 50);
    display.print("PF: "); display.print(powerFactor1, 2);
  } else {
    // Page 2: Per-phase power + total
    display.setCursor(0, 0);
    display.print("P1: "); display.print(realPower1, 1); display.println(" W");
    display.setCursor(0, 16);
    display.print("P2: "); display.print(realPower2, 1); display.println(" W");
    display.setCursor(0, 32);
    display.print("P3: "); display.print(realPower3, 1); display.println(" W");
    display.setCursor(0, 48);
    display.print("TOT:"); display.print(totalPower, 1); display.println(" W");
  }

  display.display();
  showPage2 = !showPage2;

  delay(1000);
}
