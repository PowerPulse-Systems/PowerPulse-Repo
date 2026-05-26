#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "EmonLib.h"

// OLED display size
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// OLED object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Energy monitor objects
EnergyMonitor emonV1;
EnergyMonitor emonV2;
EnergyMonitor emonV3;
EnergyMonitor emonCurrent;

void setup()
{
  Serial.begin(9600);

  // OLED init
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 failed"));
    while (1);
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 10);
  display.println("TEST");
  display.display();

  delay(3000);

  // -------------------------
  // Voltage sensors
  // -------------------------

  // Voltage sensor 1 on GPIO 33
  emonV1.voltage(33, 57.52, 1.7);

  // Voltage sensor 2 on GPIO 32
emonV2.voltage(32, 63.15, 1.7);
  // Voltage sensor 3 on GPIO 35
emonV3.voltage(35, 60.20, 1.7);
  // -------------------------
  // Current sensor
  // -------------------------

  // Current sensor on GPIO 34
emonCurrent.current(34, 7.09);
  // Warmup
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.println("Please wait...");
  display.display();

  for (int i = 0; i < 5; i++) {
    emonV1.calcVI(40, 2000);
    emonV2.calcVI(40, 2000);
    emonV3.calcVI(40, 2000);
    delay(500);
  }
}

void loop()
{
  // Read voltage channels
  emonV1.calcVI(40, 2000);
  float voltage1 = emonV1.Vrms;

  emonV2.calcVI(40, 2000);
  float voltage2 = emonV2.Vrms;

  emonV3.calcVI(40, 2000);
  float voltage3 = emonV3.Vrms;

  // Read current
  double Irms = emonCurrent.calcIrms(1480);
if (Irms < 0.1) {
  Irms = 0;
}
  // Noise filter
  if (voltage1 < 80) voltage1 = 0;
  if (voltage2 < 80) voltage2 = 0;
  if (voltage3 < 80) voltage3 = 0;

  // Serial Monitor
  Serial.print("Voltage1 GPIO33: ");
  Serial.print(voltage1);
  Serial.println(" V");

  Serial.print("Voltage2 GPIO32: ");
  Serial.print(voltage2);
  Serial.println(" V");

  Serial.print("Voltage3 GPIO35: ");
  Serial.print(voltage3);
  Serial.println(" V");

  Serial.print("Current GPIO34: ");
  Serial.print(Irms);
  Serial.println(" A");

  Serial.println("----------------------");

  // OLED Display
  display.clearDisplay();
  display.setTextSize(1);

  display.setCursor(0, 0);
  display.print("V1: ");
  display.print(voltage1, 1);
  display.println(" V");

  display.setCursor(0, 16);
  display.print("V2: ");
  display.print(voltage2, 1);
  display.println(" V");

  display.setCursor(0, 32);
  display.print("V3: ");
  display.print(voltage3, 1);
  display.println(" V");

  display.setCursor(0, 48);
  display.print("I : ");
  display.print(Irms, 2);
  display.println(" A");

  display.display();

  delay(1000);
}
