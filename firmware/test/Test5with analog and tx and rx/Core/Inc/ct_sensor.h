#ifndef CT_SENSOR_H
#define CT_SENSOR_H

#include "main.h"

typedef struct {
  float amps_per_volt;
  float cal_factor;
  float noise_variance;
  float vref;
  uint16_t adc_max;
  uint16_t num_samples;
  float mains_voltage;
} CT_Config_t;

typedef struct {
  float i_rms;
  float v_rms_sensor;
  float power_apparent;
  uint16_t samples_taken;
} CT_Result_t;

CT_Config_t CT_GetDefaultConfig(float vref);
void CT_CalibrateBias(ADC_HandleTypeDef *hadc, const CT_Config_t *config);
void CT_CalibrateZero(ADC_HandleTypeDef *hadc, CT_Config_t *config);
CT_Result_t CT_ReadRMS(ADC_HandleTypeDef *hadc, const CT_Config_t *config);
void CT_SendResult(UART_HandleTypeDef *huart, const CT_Result_t *result);

#endif
