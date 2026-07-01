/**
 * @file    ct_sensor.h
 * @brief   CT (Current Transformer) sensor RMS measurement module.
 *
 *          Calculates true RMS current from a CT sensor connected to an ADC pin.
 *          The CT output is assumed to be biased to VREF/2 (1.65V for 3.3V systems)
 *          so the ADC can read the full AC waveform.
 *
 *  Typical hardware setup:
 *  ┌──────────┐        ┌──────────┐
 *  │  CT      │        │  STM32   │
 *  │ Sensor   ├──┬─────┤ PA0/ADC1 │
 *  │ (secondary)│ │     │          │
 *  └──────────┘ [Rb]   │          │
 *               │      │          │
 *     Bias ─────┼──────┤          │
 *     (VREF/2)  │      └──────────┘
 *              GND
 *
 *  Where Rb = burden resistor (e.g. 33Ω for SCT-013-000)
 *  Bias = VREF/2 via two equal resistors (e.g. 2x 10kΩ) + filter cap
 *
 *  Common CT sensors:
 *  ┌───────────────┬──────────┬──────────┬──────────────────────────┐
 *  │ Model         │ Ratio    │ Output   │ Config Mode              │
 *  ├───────────────┼──────────┼──────────┼──────────────────────────┤
 *  │ SCT-013-000   │ 100A:50mA│ Current  │ Ratio+Burden (default)   │
 *  │ SCT-013-030   │ 30A:1V   │ Voltage  │ Direct Map (30 A/V)      │
 *  │ SCT-013-050   │ 50A:1V   │ Voltage  │ Direct Map (50 A/V)      │
 *  │ Custom        │ ?A:?V    │ Voltage  │ Direct Map (your A/V)    │
 *  └───────────────┴──────────┴──────────┴──────────────────────────┘
 */

#ifndef CT_SENSOR_H
#define CT_SENSOR_H

#include "main.h"

/* ================================================================
 *  Configuration structure — set once, pass to every call
 * ================================================================ */
typedef struct
{
  /* --- Mapping mode selector --- */
  uint8_t use_direct_map;  // 0 = use ratio+burden (current-output CTs)
                           // 1 = use amps_per_volt direct map (voltage-output CTs)

  /* --- Direct mapping (voltage-output CTs like SCT-013-030) --- */
  float amps_per_volt;     // Linear scale factor: Amps = V_rms × amps_per_volt
                           // e.g. 30.0 for "1V RMS = 30A" sensor

  /* --- Ratio + Burden (current-output CTs like SCT-013-000) --- */
  float ct_ratio;          // Turns ratio: primary/secondary (e.g. 2000.0 for 100A:50mA)
  float burden_ohms;       // Burden resistor in ohms (e.g. 33.0)

  /* --- Common parameters --- */
  float cal_factor;        // Extra calibration multiplier (default 1.0, tweak with a clamp meter)
  float vref;              // ADC reference voltage (e.g. 3.3)
  uint16_t adc_max;        // ADC max count (4095 for 12-bit, 16383 for 14-bit)
  uint16_t num_samples;    // Number of samples per RMS window (e.g. 1000)
                           // At ~40µs/sample, 1000 samples ≈ 40ms ≈ 2 cycles @ 50Hz

  /* --- Mains voltage (optional, for power calculation) --- */
  float mains_voltage;     // RMS mains voltage (e.g. 230.0 or 120.0), 0 to skip power calc

} CT_Config_t;

/* ================================================================
 *  Result structure — filled by CT_ReadRMS()
 * ================================================================ */
typedef struct
{
  float    i_rms;          // RMS current in Amps
  float    v_rms_sensor;   // RMS voltage at the ADC pin (before CT conversion)
  float    power_apparent; // Apparent power in Watts (i_rms × mains_voltage), 0 if not configured
  uint16_t samples_taken;  // Actual number of valid samples taken

} CT_Result_t;

/* ================================================================
 *  API functions
 * ================================================================ */

/**
 * @brief   Returns a CT_Config_t for current-output CTs (ratio + burden method).
 *          Pre-filled for SCT-013-000 (100A:50mA) with a 33Ω burden resistor.
 * @param   vref  ADC reference voltage (e.g. 3.3f)
 */
CT_Config_t CT_GetDefaultConfig(float vref);

/**
 * @brief   Returns a CT_Config_t for voltage-output CTs (direct mapping).
 *          Pre-filled for your sensor: 1V RMS = 30A.
 *
 *          Example usage:
 *            CT_Config_t cfg = CT_GetDirectMapConfig(3.3f, 30.0f);
 *            // 1V RMS = 30A, so amps_per_volt = 30.0
 *
 * @param   vref            ADC reference voltage (e.g. 3.3f)
 * @param   amps_per_volt   How many amps correspond to 1V RMS (e.g. 30.0f)
 */
CT_Config_t CT_GetDirectMapConfig(float vref, float amps_per_volt);

/**
 * @brief   Measures the DC bias voltage (should be called once at startup
 *          with NO current flowing through the CT, or just after power-on).
 *          Stores the result internally for use by CT_ReadRMS().
 * @param   hadc    Pointer to ADC handle
 * @param   config  Pointer to CT configuration
 * @note    Takes 256 quick samples and averages them.
 *          Call this AFTER HAL_ADCEx_Calibration_Start().
 */
void CT_CalibrateBias(ADC_HandleTypeDef *hadc, const CT_Config_t *config);

/**
 * @brief   Performs a true RMS current measurement over one sampling window.
 *
 *          Algorithm (single-pass, no array storage):
 *          1. For each of N samples:
 *             - Read ADC
 *             - Convert to voltage
 *             - Subtract DC bias (measured or VREF/2)
 *             - Square and accumulate
 *          2. RMS_voltage = sqrt(sum_of_squares / N)
 *          3. I_rms = (RMS_voltage / burden_ohms) × CT_ratio × cal_factor
 *
 * @param   hadc    Pointer to ADC handle
 * @param   config  Pointer to CT configuration
 * @retval  CT_Result_t with RMS current, sensor voltage, and apparent power
 */
CT_Result_t CT_ReadRMS(ADC_HandleTypeDef *hadc, const CT_Config_t *config);

/**
 * @brief   Sends the CT result over UART as a tagged ASCII packet.
 *          Format: "CT_RMS: <amps> A | P: <watts> W\r\n"
 * @param   huart   Pointer to UART handle
 * @param   result  Pointer to CT result
 */
void CT_SendResult(UART_HandleTypeDef *huart, const CT_Result_t *result);

/**
 * @brief   General-purpose linear map function (like Arduino's map(), but for floats).
 *          Maps a value from one range to another.
 *
 *          Example: CT_MapFloat(2048, 0, 4095, 0.0, 3.3) → 1.65
 *          Example: CT_MapFloat(0.5, 0.0, 1.0, 0.0, 30.0) → 15.0
 *
 * @param   x         Input value
 * @param   in_min    Input range minimum
 * @param   in_max    Input range maximum
 * @param   out_min   Output range minimum
 * @param   out_max   Output range maximum
 * @retval  Mapped float value
 */
float CT_MapFloat(float x, float in_min, float in_max, float out_min, float out_max);

#endif /* CT_SENSOR_H */
