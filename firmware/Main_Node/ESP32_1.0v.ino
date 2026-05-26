#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "EmonLib.h"

// ==============================
// OLED SETTINGS
// ==============================
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// ==============================
// ENERGY MONITOR OBJECTS
// ==============================
EnergyMonitor emonV1;
EnergyMonitor emonV2;
EnergyMonitor emonV3;
EnergyMonitor emonCurrent;

void setup()
{
  Serial.begin(115200);

  // Faster I2C for OLED
  Wire.begin();
  Wire.setClock(400000);

  // OLED init
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 failed"));
    while (1);
  }

  // Startup screen
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(15, 20);
  display.println("TEST");
  display.display();

  delay(2000);

  // ==============================
  // VOLTAGE SENSORS
  // ==============================

  // V1 -> GPIO 33
  emonV1.voltage(32, 57.52, 1.7);

  // V2 -> GPIO 32 (calibrated)
  emonV2.voltage(34, 63.15, 1.7);

  // V3 -> GPIO 35 (calibrated)
  emonV3.voltage(35, 60.20, 1.7);

  // ==============================
  // CURRENT SENSOR
  // ==============================

  // Current sensor -> GPIO 34
  emonCurrent.current(34, 7.09);

  // Warmup cycles
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(10, 25);
  display.println("Please wait...");
  display.display();

  for (int i = 0; i < 3; i++) {
    emonV1.calcVI(20, 1000);
    emonV2.calcVI(20, 1000);
    emonV3.calcVI(20, 1000);
    delay(200);
  }
}

void loop()
{
  // ==============================
  // READ VOLTAGES
  // ==============================

  emonV1.calcVI(20, 1000);
  float voltage1 = emonV1.Vrms;

  emonV2.calcVI(20, 1000);
  float voltage2 = emonV2.Vrms;

  emonV3.calcVI(20, 1000);
  float voltage3 = emonV3.Vrms;

  // ==============================
  // READ CURRENT
  // ==============================

  double Irms = emonCurrent.calcIrms(800);

  // Ignore small noise currents
  if (Irms < 0.1) {
    Irms = 0;
  }

  // Ignore invalid voltage readings
  if (voltage1 < 80) voltage1 = 0;
  if (voltage2 < 80) voltage2 = 0;
  if (voltage3 < 80) voltage3 = 0;

  // ==============================
  // SERIAL MONITOR
  // ==============================

  Serial.print("V1(GPIO33): ");
  Serial.print(voltage1, 1);
  Serial.println(" V");

  Serial.print("V2(GPIO32): ");
  Serial.print(voltage2, 1);
  Serial.println(" V");

  Serial.print("V3(GPIO35): ");
  Serial.print(voltage3, 1);
  Serial.println(" V");

  Serial.print("Current(GPIO34): ");
  Serial.print(Irms, 2);
  Serial.println(" A");

  Serial.println("---------------------------");

  // ==============================
  // OLED DISPLAY
  // ==============================

  display.clearDisplay();

  display.setTextSize(1);

  display.setCursor(0, 0);
  display.print("V1:");
  display.print(voltage1, 1);
  display.print("V");

  display.setCursor(64, 0);
  display.print("V2:");
  display.print(voltage2, 1);
  display.print("V");

  display.setCursor(0, 20);
  display.print("V3:");
  display.print(voltage3, 1);
  display.print("V");

  display.setCursor(64, 20);
  display.print("I:");
  display.print(Irms, 2);
  display.print("A");

  display.display();

  // Faster refresh
  delay(200);
}
