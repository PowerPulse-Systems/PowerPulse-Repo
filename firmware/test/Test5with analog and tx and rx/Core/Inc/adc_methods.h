/**
 * @file    adc_methods.h
 * @brief   Two ADC reading methods for comparison:
 *          1) Software Averaging  (12-bit, 0-4095)
 *          2) Oversampling + Decimation (14-bit, 0-16383)
 *
 *          Switch between them in main.c with:
 *            #define ADC_METHOD_AVERAGED
 *          or
 *            #define ADC_METHOD_OVERSAMPLED
 */

#ifndef ADC_METHODS_H
#define ADC_METHODS_H

#include "main.h"

/* ---------- Result structure (same for both methods) ---------- */
typedef struct
{
  uint16_t raw;        // Raw count (12-bit or 14-bit depending on method)
  float    voltage;    // Converted voltage in volts
  uint8_t  bits;       // Resolution: 12 or 14
} ADC_Result_t;

/* ---------- Method 1: Software Averaging (12-bit) ---------- */

/**
 * @brief   Takes 16 samples and averages them for a noise-reduced 12-bit result.
 * @param   hadc    Pointer to ADC handle (e.g. &hadc1)
 * @param   vref    Reference voltage in volts (e.g. 3.3f)
 * @retval  ADC_Result_t with .raw = 0-4095, .voltage = 0-vref, .bits = 12
 */
ADC_Result_t ADC_ReadAveraged(ADC_HandleTypeDef *hadc, float vref);

/* ---------- Method 2: Oversampling + Decimation (14-bit) ---------- */

/**
 * @brief   Takes 16 samples (4^2), sums, and right-shifts by 2 for 14-bit resolution.
 *          This is the standard oversampling-by-decimation technique (Atmel AVR121 / ST AN2668).
 * @param   hadc    Pointer to ADC handle (e.g. &hadc1)
 * @param   vref    Reference voltage in volts (e.g. 3.3f)
 * @retval  ADC_Result_t with .raw = 0-16383, .voltage = 0-vref, .bits = 14
 */
ADC_Result_t ADC_ReadOversampled(ADC_HandleTypeDef *hadc, float vref);

/* ---------- UART helper ---------- */

/**
 * @brief   Formats the ADC result into a tagged ASCII line and sends it via UART.
 *          Averaged  -> "AVG12: <raw> | V: <voltage>\r\n"
 *          Oversampled -> "OVS14: <raw> | V: <voltage>\r\n"
 * @param   huart   Pointer to UART handle (e.g. &huart1)
 * @param   result  ADC result to send
 */
void ADC_SendResult(UART_HandleTypeDef *huart, const ADC_Result_t *result);

#endif /* ADC_METHODS_H */
