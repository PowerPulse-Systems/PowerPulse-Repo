#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_ADS1X15.h>

// ================= OLED =================
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ================= ADS1115 =================
Adafruit_ADS1115 ads;

// ================= CURRENT CALIBRATION =================
// ================= CURRENT CALIBRATION =================

// CT Type 1 (I1 & I2)
const float ICAL_A0 = 0.000585f;
const float ICAL_A1 = 0.000585f;

// CT Type 2 (I3 & I4)
const float ICAL_A2 = 0.00340f;
const float ICAL_A3 = 0.00340f;

// ================= SETTINGS =================
const float I_NOISE = 0.05f;

// Reduced samples for MUCH faster refresh
const int SAMPLES = 20;

// OLED refresh interval (ms)
const int DISPLAY_INTERVAL = 100;

// ================= RESULT STRUCT =================
struct CurrentResult {
  float Irms;
};

// ================= CURRENT RMS =================
CurrentResult measureCurrent(uint8_t chan, float iCal) {

  float meanI = 0.0f;
  float sumI2 = 0.0f;

  // Fast priming
  for (int n = 0; n < 10; n++) {
    float ri = ads.readADC_SingleEnded(chan);
    meanI += (ri - meanI) / (n + 1);
  }

  // Main RMS loop
  for (int n = 0; n < SAMPLES; n++) {

    float ri = (float)ads.readADC_SingleEnded(chan);

    // Fast DC tracking
    meanI += (ri - meanI) * 0.05f;

    float i = ri - meanI;

    sumI2 += i * i;
  }

  float Irms = sqrtf(sumI2 / SAMPLES) * iCal;

  if (Irms < I_NOISE) {
    Irms = 0;
  }

  return { Irms };
}

// ================= SETUP =================
void setup() {

  Serial.begin(115200);

  // FAST I2C
  Wire.begin();
  Wire.setClock(800000);

  // OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {

    Serial.println("OLED Failed");

    while (1);
  }

  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);

  display.setCursor(10, 20);
  display.println("Initializing...");

  display.display();

  // ADS1115
  if (!ads.begin()) {

    Serial.println("ADS1115 Failed");

    display.clearDisplay();
    display.setCursor(0, 20);
    display.println("ADS1115 FAILED!");
    display.display();

    while (1);
  }

  // ±4.096V range
  ads.setGain(GAIN_ONE);

  // FASTEST ADC RATE
  ads.setDataRate(RATE_ADS1115_860SPS);

  Serial.println("System Ready");
}

// ================= LOOP =================
void loop() {

  // Measure currents
  CurrentResult ch0 = measureCurrent(0, ICAL_A0);
  CurrentResult ch1 = measureCurrent(1, ICAL_A1);
  CurrentResult ch2 = measureCurrent(2, ICAL_A2);
  CurrentResult ch3 = measureCurrent(3, ICAL_A3);

  // ================= SERIAL =================
  Serial.print("I1: ");
  Serial.print(ch0.Irms, 2);
  Serial.print(" A   ");

  Serial.print("I2: ");
  Serial.print(ch1.Irms, 2);
  Serial.print(" A   ");

  Serial.print("I3: ");
  Serial.print(ch2.Irms, 2);
  Serial.print(" A   ");

  Serial.print("I4: ");
  Serial.print(ch3.Irms, 2);
  Serial.println(" A");

  // ================= OLED =================
  static unsigned long lastDisplay = 0;

  if (millis() - lastDisplay >= DISPLAY_INTERVAL) {

    lastDisplay = millis();

    display.clearDisplay();

    display.setTextSize(1);

    // LEFT SIDE
    display.setCursor(0, 0);
    display.print("I1:");
    display.print(ch0.Irms, 2);
    display.print("A");

    display.setCursor(0, 16);
    display.print("I2:");
    display.print(ch1.Irms, 2);
    display.print("A");

    // RIGHT SIDE
    display.setCursor(64, 0);
    display.print("I3:");
    display.print(ch2.Irms, 2);
    display.print("A");

    display.setCursor(64, 16);
    display.print("I4:");
    display.print(ch3.Irms, 2);
    display.print("A");

    display.display();
  }
}
