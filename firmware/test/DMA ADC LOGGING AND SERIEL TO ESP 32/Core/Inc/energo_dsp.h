#ifndef ENERGO_DSP_H
#define ENERGO_DSP_H

#include "main.h"

// External references for DSP variables
extern uint32_t adc_dma_buf[ADC_DMA_BUF_SIZE];
extern float v_proc[NUM_PHASES][DSP_WINDOW_SAMPLES];
extern float i_proc[NUM_PHASES][DSP_WINDOW_SAMPLES];

extern volatile uint16_t dma_block_count;
extern volatile uint8_t dsp_ready;
extern volatile uint8_t startup_warmup_count;

extern EnergySystem energy_sys;

#endif // ENERGO_DSP_H
