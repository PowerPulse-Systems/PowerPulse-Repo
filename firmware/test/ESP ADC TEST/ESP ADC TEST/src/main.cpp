#include <Arduino.h>

const int analogPin = 33; // Define the GPIO pin connected to your voltage source

const int sampleCount = 33;            // Odd count works well with median-style filtering
const int samplesToTrimEachSide = 6;   // Removes the highest and lowest noisy samples
const float smoothingFactor = 0.12;    // Lower = steadier, higher = faster response
const float adcReferenceVoltage = 3.27;
const int adcMaxValue = 4095;

float smoothedAdcValue = 0.0;
bool filterInitialized = false;

int readStableAdc() {
  int samples[sampleCount];

  for (int i = 0; i < sampleCount; i++) {
    samples[i] = analogRead(analogPin);
    delayMicroseconds(250);
  }

  // Insertion sort is small and predictable for this short sample buffer.
  for (int i = 1; i < sampleCount; i++) {
    int value = samples[i];
    int j = i - 1;

    while (j >= 0 && samples[j] > value) {
      samples[j + 1] = samples[j];
      j--;
    }

    samples[j + 1] = value;
  }

  long sum = 0;
  int usedSamples = 0;

  for (int i = samplesToTrimEachSide; i < sampleCount - samplesToTrimEachSide; i++) {
    sum += samples[i];
    usedSamples++;
  }

  return sum / usedSamples;
}

void setup() {
  Serial.begin(115200);   // Initialize serial communication at 115200 baud
  analogReadResolution(12); // Set ADC resolution to 12 bits (0 - 4095)
  analogSetPinAttenuation(analogPin, ADC_11db); // Best range for readings up to about 3.3V
}

void loop() {
  int filteredAdcValue = readStableAdc();

  if (!filterInitialized) {
    smoothedAdcValue = filteredAdcValue;
    filterInitialized = true;
  } else {
    smoothedAdcValue += smoothingFactor * (filteredAdcValue - smoothedAdcValue);
  }

  float voltage = smoothedAdcValue * (adcReferenceVoltage / adcMaxValue);

  // Print the filtered value and voltage to the Serial Monitor
  Serial.print("Filtered ADC: ");
  Serial.print(filteredAdcValue);
  Serial.print("  |  Smoothed ADC: ");
  Serial.print(smoothedAdcValue, 1);
  Serial.print("  |  Voltage: ");
  Serial.print(voltage, 3); // Print with 3 decimal places
  Serial.println(" V");

  delay(100); // Wait 500 milliseconds before the next reading
}

