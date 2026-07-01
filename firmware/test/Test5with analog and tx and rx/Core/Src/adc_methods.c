/**
 * @file    adc_methods.c
 * @brief   Two ADC reading methods for comparison.
 */

#include "adc_methods.h"
#include <stdio.h>

/* ================================================================
 *  Method 1 — Software Averaging (12-bit)
 *  Takes 16 readings and divides by 16. Reduces random noise by ~4x
 *  but cannot increase resolution beyond the hardware 12 bits.
 * ================================================================ */
ADC_Result_t ADC_ReadAveraged(ADC_HandleTypeDef *hadc, float vref)
{
  ADC_Result_t result;
  uint32_t sum = 0;
  uint8_t  valid_samples = 0;

  for (uint8_t i = 0; i < 16; i++)
  {
    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK)
    {
      sum += HAL_ADC_GetValue(hadc);
      valid_samples++;
    }
    HAL_ADC_Stop(hadc);
  }

  if (valid_samples > 0)
  {
    result.raw = (uint16_t)(sum / valid_samples);
  }
  else
  {
    result.raw = 0;
  }

  result.voltage = (float)result.raw * vref / 4095.0f;
  result.bits    = 12;

  return result;
}

/* ================================================================
 *  Method 2 — Oversampling + Decimation (14-bit)
 *  Takes 4^n = 16 samples (n=2 extra bits), sums them, then
 *  right-shifts by n=2. This extends resolution from 12 to 14 bits
 *  (0–16383 range), giving ~4x finer voltage steps (~0.2 mV vs ~0.8 mV).
 *
 *  Requirement: the input signal must have at least 1 LSB of noise
 *  for oversampling to work. Most real-world analog signals do.
 * ================================================================ */
ADC_Result_t ADC_ReadOversampled(ADC_HandleTypeDef *hadc, float vref)
{
  ADC_Result_t result;
  uint32_t sum = 0;

  for (uint8_t i = 0; i < 16; i++)
  {
    HAL_ADC_Start(hadc);
    if (HAL_ADC_PollForConversion(hadc, 10) == HAL_OK)
    {
      sum += HAL_ADC_GetValue(hadc);
    }
    HAL_ADC_Stop(hadc);
  }

  /* Decimation: right-shift by 2 (divide by 4) to get 14-bit result */
  result.raw     = (uint16_t)(sum >> 2);
  result.voltage = (float)result.raw * vref / 16383.0f;
  result.bits    = 14;

  return result;
}

/* ================================================================
 *  UART helper — sends a self-describing tagged ASCII packet
 *  Format:
 *    Averaged:    "AVG12: 2048 | V: 1.6500\r\n"
 *    Oversampled: "OVS14: 8192 | V: 1.6502\r\n"
 * ================================================================ */
void ADC_SendResult(UART_HandleTypeDef *huart, const ADC_Result_t *result)
{
  char buf[48];
  int len;

  if (result->bits == 14)
  {
    len = snprintf(buf, sizeof(buf), "OVS14: %u | V: %.4f\r\n",
                   (unsigned int)result->raw, result->voltage);
  }
  else
  {
    len = snprintf(buf, sizeof(buf), "AVG12: %u | V: %.4f\r\n",
                   (unsigned int)result->raw, result->voltage);
  }

  if (len > 0)
  {
    HAL_UART_Transmit(huart, (uint8_t *)buf, (uint16_t)len, 50);
  }
}
