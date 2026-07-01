/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.h
  * @brief          : Header for main.c file.
  *                   This file contains the common defines of the application.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2026 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __MAIN_H
#define __MAIN_H

#ifdef __cplusplus
extern "C" {
#endif

/* Includes ------------------------------------------------------------------*/
#include "stm32g4xx_hal.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <stdint.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
/* USER CODE END Includes */

/* Exported types ------------------------------------------------------------*/
/* USER CODE BEGIN ET */
typedef struct {
    float vrms;
    float irms;
    float active_power;
    float apparent_power;
    float power_factor;
    float energy_wh;
    float average_power;

    // Internal processing
    float v_offset;
    float i_offset;
    uint32_t energy_sample_count;
} PhaseMetrics;

typedef struct {
    PhaseMetrics phase[3];
} EnergySystem;
/* USER CODE END ET */

/* Exported constants --------------------------------------------------------*/
/* USER CODE BEGIN EC */
#define NUM_PHASES              3
#define SAMPLES_PER_CYCLE       64
#define DSP_WINDOW_CYCLES       10
#define DSP_WINDOW_SAMPLES      640     // SAMPLES_PER_CYCLE * DSP_WINDOW_CYCLES
#define ADC_DMA_BUF_SIZE        384     // 3 channels * 64 samples * 2 halves
#define ADC_HALF_BUF_SIZE       192

#define SAMPLE_RATE_HZ          3200.0f
#define SAMPLE_PERIOD_S         (1.0f / SAMPLE_RATE_HZ)

#define UART_TX_BUF_SIZE        768
#define STX_CHAR                0x02
#define ETX_CHAR                0x03

#define LIVE_INTERVAL_MS        3000
#define ENERGY_INTERVAL_MS      60000

// ── Calibration Constants (adjust per hardware) ──────────────────
// V_GAIN converts 1 ADC count of AC deviation into real-world Volts.
//   Formula: V_GAIN = (Vref / 4096) * sensor_ratio
//   Example with ZMPT101B (230V range, 1.65V mid-scale):
//     (3.3 / 4096) * (230.0 / 1.65) ≈ 0.1124
#define V_GAIN                  0.1124f

// I_GAIN converts 1 ADC count of AC deviation into real-world Amps.
//   Example with SCT-013-020 (20A range, 1.0V peak):
//     (3.3 / 4096) * (20.0 / 1.0) ≈ 0.01611
#define I_GAIN                  0.01611f

// ── Noise / Threshold ────────────────────────────────────────────
// Minimum RMS current (Amps) below which power & PF are zeroed
#define I_NOISE_THRESHOLD       0.02f

// ── Startup ──────────────────────────────────────────────────────
// Number of DSP windows to discard at startup for DC offset settling
#define STARTUP_SKIP_WINDOWS    3
/* USER CODE END EC */

/* Exported macro ------------------------------------------------------------*/
/* USER CODE BEGIN EM */

/* USER CODE END EM */

/* Exported functions prototypes ---------------------------------------------*/
void Error_Handler(void);

/* USER CODE BEGIN EFP */
void Energo_Init(void);
void Energo_ProcessDMA(uint32_t* src, uint16_t offset);
void calculate_phase_metrics(float* v_buf, float* i_buf, PhaseMetrics* pd, uint16_t N);
void Energo_SendLiveTelemetry(void);
void Energo_SendEnergySummary(void);
/* USER CODE END EFP */

/* Private defines -----------------------------------------------------------*/

/* USER CODE BEGIN Private defines */

/* USER CODE END Private defines */

#ifdef __cplusplus
}
#endif

#endif /* __MAIN_H */
