
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

void setup()
{
  Serial.begin(9600);

  // Initialize OLED
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

  // Extended delay for ZMPT101B + ADC to fully settle
  delay(3000);

  // ✅ Updated calibration: 234.26 × (230 / 50) = 1077.6
 //

  //emon1.voltage(35, 1077.6, 1.7);
emon1.voltage(33, 57.52, 1.7);


  // Current: pin, calibratison
  emon1.current(34, 111.1);

  // Warmup screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.println("  ...");
  display.println("  Please wait");
  display.display();

  // Warmup: run 5 dummy cycles so ADC midpoint stabilizes
  for (int i = 0; i < 5; i++) {
    emon1.calcVI(40, 2000);
    delay(500);
  }
}

void loop()
{
  // Dummy run to flush stale ADC readings
  emon1.calcVI(40, 2000);

  // Actual measurement
  emon1.calcVI(40, 2000);

  // Read values
  float realPower     = emon1.realPower;
  float apparentPower = emon1.apparentPower;
  float powerFactor   = emon1.powerFactor;
  float supplyVoltage = emon1.Vrms;
  float Irms          = emon1.Irms;
if (supplyVoltage < 80) {
  supplyVoltage = 0;
  Irms          = 0;
  realPower     = 0;
  apparentPower = 0;
  powerFactor   = 0;
}
  // Serial Monitor
  Serial.print("Voltage: ");
  Serial.print(supplyVoltage);
  Serial.println(" V");

  Serial.print("Current: ");
  Serial.print(Irms);
  Serial.println(" A");

  Serial.print("Real Power: ");
  Serial.print(realPower);
  Serial.println(" W");

  Serial.print("Apparent Power: ");
  Serial.print(apparentPower);
  Serial.println(" VA");

  Serial.print("Power Factor: ");
  Serial.println(powerFactor);

  Serial.println("-------------------");

  // OLED Display
  display.clearDisplay();
  display.setTextSize(1);

  display.setCursor(0, 0);
  display.print("Voltage: ");
  display.print(supplyVoltage, 1);
  display.println(" V");

  display.setCursor(0, 16);
  display.print("Current: ");
  display.print(Irms, 2);
  display.println(" A");

  display.setCursor(0, 32);
  display.print("Power:   ");
  display.print(realPower, 1);
  display.println(" W");


  display.display();

  delay(1000);
}
