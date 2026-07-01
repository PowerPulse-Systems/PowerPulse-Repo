/**
 * @file    ct_sensor.c
 * @brief   CT (Current Transformer) sensor RMS measurement implementation.
 *
 *          Uses a single-pass algorithm (no array allocation) inspired by
 *          the OpenEnergyMonitor EmonLib approach. Memory usage is constant
 *          regardless of sample count.
 */

#include "ct_sensor.h"
#include <math.h>
#include <stdio.h>

/* ================================================================
 *  Internal state — DC bias measured during calibration
 * ================================================================ */
static float s_dc_bias_volts   = 0.0f;   // Measured DC offset in volts
static uint8_t s_bias_calibrated = 0;     // 1 = calibrated, 0 = using VREF/2 default

/* ================================================================
 *  CT_GetDefaultConfig — ratio+burden mode for SCT-013-000
 * ================================================================ */
CT_Config_t CT_GetDefaultConfig(float vref)
{
  CT_Config_t cfg;

  cfg.use_direct_map = 0;    // Use ratio + burden mode
  cfg.amps_per_volt  = 0.0f; // Not used in this mode

  /* SCT-013-000: 100A primary → 50mA secondary → turns ratio = 100/0.05 = 2000 */
  cfg.ct_ratio     = 2000.0f;

  /* 33Ω burden gives 50mA × 33Ω = 1.65V peak at full scale (100A) */
  cfg.burden_ohms  = 33.0f;

  cfg.cal_factor   = 1.0f;       // Tweak with a clamp meter for accuracy
  cfg.vref         = vref;
  cfg.adc_max      = 4095;       // 12-bit ADC
  cfg.num_samples  = 1000;       // ~40ms at ~40µs/sample ≈ 2 cycles @ 50Hz
  cfg.mains_voltage = 230.0f;    // 230V for most countries, change to 120.0 for US

  return cfg;
}

/* ================================================================
 *  CT_GetDirectMapConfig — direct V→A mapping for voltage-output CTs
 *
 *  Your sensor: 1V RMS = 30A  →  amps_per_volt = 30.0
 *  SCT-013-030: 1V RMS = 30A  →  amps_per_volt = 30.0
 *  SCT-013-050: 1V RMS = 50A  →  amps_per_volt = 50.0
 * ================================================================ */
CT_Config_t CT_GetDirectMapConfig(float vref, float amps_per_volt)
{
  CT_Config_t cfg;

  cfg.use_direct_map = 1;              // Use direct mapping mode
  cfg.amps_per_volt  = amps_per_volt;  // e.g. 30.0 for "1V RMS = 30A"

  /* Ratio+burden fields not used, but set to safe defaults */
  cfg.ct_ratio     = 1.0f;
  cfg.burden_ohms  = 1.0f;

  cfg.cal_factor   = 1.0f;
  cfg.vref         = vref;
  cfg.adc_max      = 4095;
  cfg.num_samples  = 1000;
  cfg.mains_voltage = 230.0f;

  return cfg;
}

/* ================================================================
 *  CT_CalibrateBias — measure the DC offset with no load
 *
 *  Call this once at startup before entering the main loop.
 *  The CT should have NO current flowing through it.
 *  Takes 256 samples and averages to find the quiescent DC level.
 * ================================================================ */
void CT_CalibrateBias(ADC_HandleTypeDef *hadc, const CT_Config_t *config)
{
  uint32_t sum = 0;
  uint16_t count = 0;

  for (uint16_t i = 0; i < 256; i++)
  {
    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 1) == HAL_OK)
    {
      sum += HAL_ADC_GetValue(hadc);
      count++;
    }
    HAL_ADC_Stop(hadc);
  }

  if (count > 0)
  {
    float avg_raw = (float)sum / (float)count;
    s_dc_bias_volts = avg_raw * config->vref / (float)config->adc_max;
    s_bias_calibrated = 1;
  }
  else
  {
    /* Fallback to mid-rail */
    s_dc_bias_volts = config->vref / 2.0f;
    s_bias_calibrated = 0;
  }
}

/* ================================================================
 *  CT_ReadRMS — true RMS current measurement (single-pass)
 *
 *  Algorithm:
 *  ──────────────────────────────────────────────────
 *  For each sample i = 0..N-1:
 *    1. raw = ADC_GetValue()
 *    2. v_sample = raw × (VREF / ADC_MAX)
 *    3. v_ac = v_sample - dc_bias        ← remove DC offset
 *    4. sum_sq += v_ac × v_ac            ← accumulate squared AC
 *
 *  After all samples:
 *    5. v_rms = sqrt(sum_sq / N)         ← RMS of sensor voltage
 *    6. i_rms = (v_rms / R_burden) × CT_ratio × cal_factor
 *    7. P_apparent = i_rms × V_mains
 *  ──────────────────────────────────────────────────
 *
 *  This uses O(1) memory — no sample array needed.
 * ================================================================ */
CT_Result_t CT_ReadRMS(ADC_HandleTypeDef *hadc, const CT_Config_t *config)
{
  CT_Result_t result = {0};

  /* Use calibrated bias, or fall back to VREF/2 */
  float dc_bias = s_bias_calibrated ? s_dc_bias_volts : (config->vref / 2.0f);

  float adc_to_volts = config->vref / (float)config->adc_max;
  float sum_sq = 0.0f;
  uint16_t valid_count = 0;

  /* ---- Fast sampling loop ---- */
  for (uint16_t i = 0; i < config->num_samples; i++)
  {
    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK)
    {
      uint16_t raw = (uint16_t)HAL_ADC_GetValue(hadc);

      /* Convert to voltage and remove DC bias */
      float v_sample = (float)raw * adc_to_volts;
      float v_ac     = v_sample - dc_bias;

      /* Accumulate squared AC component */
      sum_sq += v_ac * v_ac;
      valid_count++;
    }
    HAL_ADC_Stop(hadc);
  }

  /* ---- Calculate RMS ---- */
  if (valid_count > 0)
  {
    /* RMS voltage at the sensor / burden resistor */
    result.v_rms_sensor = sqrtf(sum_sq / (float)valid_count);

    /* Convert sensor voltage to primary current */
    if (config->use_direct_map)
    {
      /* Direct mapping: I = V_rms × amps_per_volt × cal_factor */
      /* e.g. 1.0V × 30.0 = 30.0A */
      result.i_rms = result.v_rms_sensor * config->amps_per_volt * config->cal_factor;
    }
    else
    {
      /* Ratio + Burden: I = (V_rms / R_burden) × CT_ratio × cal_factor */
      result.i_rms = (result.v_rms_sensor / config->burden_ohms)
                     * config->ct_ratio
                     * config->cal_factor;
    }

    /* Apparent power (if mains voltage is configured) */
    if (config->mains_voltage > 0.0f)
    {
      result.power_apparent = result.i_rms * config->mains_voltage;
    }
  }

  result.samples_taken = valid_count;
  return result;
}

/* ================================================================
 *  CT_SendResult — UART tagged packet
 *  Format: "CT_RMS: 12.345 A | P: 2839.4 W\r\n"
 * ================================================================ */
void CT_SendResult(UART_HandleTypeDef *huart, const CT_Result_t *result)
{
  char buf[64];
  int len;

  if (result->power_apparent > 0.0f)
  {
    len = snprintf(buf, sizeof(buf), "CT_RMS: %.3f A | P: %.1f W\r\n",
                   result->i_rms, result->power_apparent);
  }
  else
  {
    len = snprintf(buf, sizeof(buf), "CT_RMS: %.3f A\r\n",
                   result->i_rms);
  }

  if (len > 0)
  {
    HAL_UART_Transmit(huart, (uint8_t *)buf, (uint16_t)len, 50);
  }
}

/* ================================================================
 *  CT_MapFloat — general-purpose linear interpolation
 *
 *  Works like Arduino's map() but with float precision.
 *  Maps x from [in_min, in_max] to [out_min, out_max].
 *
 *  Formula: out = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
 *
 *  Examples:
 *    CT_MapFloat(2048, 0, 4095, 0.0, 3.3)   → 1.65    (ADC raw → volts)
 *    CT_MapFloat(0.5,  0.0, 1.0, 0.0, 30.0) → 15.0    (V_rms → amps)
 *    CT_MapFloat(1.0,  0.0, 1.0, 0.0, 30.0) → 30.0    (1V = 30A)
 * ================================================================ */
float CT_MapFloat(float x, float in_min, float in_max, float out_min, float out_max)
{
  if ((in_max - in_min) == 0.0f)
  {
    return out_min;  // Avoid division by zero
  }
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
