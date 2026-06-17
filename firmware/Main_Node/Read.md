# PowerPulse - Building Energy Management System

## Overview

PowerPulse is a Building Energy Management System (BEMS) designed for real-time monitoring, analysis, and optimization of electrical energy consumption in residential, commercial, and industrial buildings.

The system provides:

* Breaker-level energy monitoring
* Real-time voltage and current measurement
* Energy consumption analytics
* Remote device monitoring
* Load control and automation
* Fault detection and alert generation
* Cloud-based dashboards and reporting

---

## Project Goals

The primary objectives are:

* Measure electrical energy consumption accurately
* Monitor building energy usage in real time
* Identify energy waste and abnormal behavior
* Enable intelligent energy-saving automation
* Provide actionable insights to facility managers
* Support future scalability for commercial deployment

---

## Initial ADC-Based Architecture

The original prototype architecture used:

* ESP32
* ADS1115 #1 for voltage measurement
* ADS1115 #2 for current measurement
* Current Transformer (CT Clamp)
* ZMPT101B Voltage Transformer
* OLED Display
* MQTT Communication

### Measurement Method

The system sampled:

* Instantaneous voltage
* Instantaneous current

Then calculated:

* RMS Voltage
* RMS Current
* Real Power
* Apparent Power
* Energy Consumption

Using numerical integration:

Energy = ∫ V(t) × I(t) dt

---

## Limitations of ADS1115 for Energy Metering

Although ADS1115 is significantly more accurate than the ESP32 internal ADC, several limitations make it less suitable for research-grade and commercial-grade energy metering.

### 1. Low Sampling Rate

ADS1115 maximum conversion rate:

860 samples/second

For a 50 Hz mains signal:

* Only ~17 samples per AC cycle

This is sufficient for basic RMS calculations but limits:

* Harmonic analysis
* Power quality analysis
* Distorted waveform measurement

---

### 2. Non-Simultaneous Sampling

Even when using two ADS1115 devices:

* One ADC measures voltage
* One ADC measures current

The converters are not synchronized internally.

Potential issues:

* Timing skew
* Phase error
* Power factor error
* Energy calculation error

---

### 3. Delta-Sigma Filter Delay

ADS1115 uses a delta-sigma architecture.

This introduces:

* Digital filtering latency
* Group delay
* Phase shift

These effects can impact:

* Real power calculations
* Reactive power calculations
* Phase-angle measurements

---

### 4. Harmonic Measurement Limitations

Modern building loads often contain:

* LED drivers
* Variable Frequency Drives (VFDs)
* UPS systems
* Computer power supplies
* Switch Mode Power Supplies (SMPS)

These loads generate significant harmonic content.

ADS1115 does not provide sufficient sampling bandwidth for accurate harmonic analysis.

---

### 5. Research and Commercial Reliability Concerns

For publishable research and future commercial deployment:

Required characteristics include:

* Synchronized sampling
* Stable phase measurement
* High-resolution waveform acquisition
* Dedicated metering DSP functionality

ADS1115 was not specifically designed for energy metering applications.

---

## Why ESP32 Internal ADC Was Rejected

The ESP32 internal ADC showed several issues:

* WiFi-induced noise
* Non-linear response
* Temperature drift
* Reference voltage instability
* Reduced repeatability

These limitations reduced long-term measurement reliability.

---

## Selected Solution: ATM90E32

The project architecture is moving toward the ATM90E32 energy metering IC.

### Advantages

* Designed specifically for energy metering
* Three-phase measurement support
* Dedicated DSP engine
* Hardware RMS calculation
* Hardware active power calculation
* Hardware reactive power calculation
* Hardware apparent power calculation
* Hardware power factor calculation
* Hardware phase-angle calculation
* Energy accumulation registers
* SPI communication
* Industrial metering architecture

---

## Why ATM90E32 Is More Reliable

ATM90E32 internally performs:

* Simultaneous voltage and current acquisition
* Digital signal processing
* Energy integration
* Phase compensation
* Calibration correction

This greatly reduces:

* Sampling errors
* Synchronization errors
* Power-factor errors
* Long-term energy accumulation errors

Compared to a general-purpose ADC approach.

---

## Future Architecture

Hardware:

* ESP32
* ATM90E32
* CT Current Sensors
* Isolated Voltage Measurement Circuits
* OLED Display
* MQTT Communication Module

Software:

* ESP32 Firmware
* MQTT Broker
* NestJS Backend
* PostgreSQL Database
* Next.js Dashboard
* Provisioning Application

---

## Research Focus

The project aims to investigate:

* Low-cost building energy monitoring
* Real-time energy analytics
* Breaker-level energy visibility
* Fault detection techniques
* Load classification
* Automated energy-saving strategies
* Scalable IoT energy management architecture

---

## Long-Term Vision

Transform energy monitoring from simple data collection into intelligent building management by providing:

* Actionable insights
* Automated control
* Predictive maintenance
* Energy optimization recommendations
* Scalable commercial deployment
