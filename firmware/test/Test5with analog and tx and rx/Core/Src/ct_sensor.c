#include "ct_sensor.h"
#include <math.h>
#include <stdio.h>

CT_Config_t CT_GetDefaultConfig(float vref)
{
  CT_Config_t cfg;
  cfg.amps_per_volt    = 30.0f;
  cfg.cal_factor       = 1.0f;
  cfg.noise_variance   = 0.0f;
  cfg.vref             = vref;
  cfg.adc_max          = 4095;
  cfg.num_samples      = 1000;
  cfg.mains_voltage    = 230.0f;
  return cfg;
}

void CT_CalibrateBias(ADC_HandleTypeDef *hadc, const CT_Config_t *config)
{
  (void)hadc;
  (void)config;
}

static float compute_variance(ADC_HandleTypeDef *hadc, const CT_Config_t *config)
{
  float adc_to_volts = config->vref / (float)config->adc_max;
  float mean = 0.0f;
  float m2   = 0.0f;
  uint16_t count = 0;

  for (uint16_t i = 0; i < config->num_samples; i++)
  {
    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK)
    {
      uint16_t raw = (uint16_t)HAL_ADC_GetValue(hadc);
      float v = (float)raw * adc_to_volts;
      count++;
      float delta = v - mean;
      mean += delta / (float)count;
      m2   += delta * (v - mean);
    }
    HAL_ADC_Stop(hadc);
  }

  if (count > 1)
    return m2 / (float)(count);
  else
    return 0.0f;
}

void CT_CalibrateZero(ADC_HandleTypeDef *hadc, CT_Config_t *config)
{
  config->noise_variance = compute_variance(hadc, config);
}

CT_Result_t CT_ReadRMS(ADC_HandleTypeDef *hadc, const CT_Config_t *config)
{
  CT_Result_t result = {0};

  float total_variance = compute_variance(hadc, config);

  float signal_variance = total_variance - config->noise_variance;
  if (signal_variance < 0.0f) signal_variance = 0.0f;

  result.v_rms_sensor = sqrtf(signal_variance);

  result.i_rms = result.v_rms_sensor * config->amps_per_volt * config->cal_factor;
  if (result.i_rms < 0.0f) result.i_rms = 0.0f;

  if (config->mains_voltage > 0.0f)
    result.power_apparent = result.i_rms * config->mains_voltage;

  result.samples_taken = (uint16_t)(config->num_samples);

  return result;
}

void CT_SendResult(UART_HandleTypeDef *huart, const CT_Result_t *result)
{
  char buf[64];
  int len = snprintf(buf, sizeof(buf), "CT_RMS: %.3f A | P: %.1f W\r\n",
                     result->i_rms, result->power_apparent);
  if (len > 0)
    HAL_UART_Transmit(huart, (uint8_t *)buf, (uint16_t)len, 50);
}
