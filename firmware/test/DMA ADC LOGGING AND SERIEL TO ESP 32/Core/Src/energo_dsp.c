#include "energo_dsp.h"

// Global processing state
uint32_t adc_dma_buf[ADC_DMA_BUF_SIZE];
float v_proc[NUM_PHASES][DSP_WINDOW_SAMPLES];
float i_proc[NUM_PHASES][DSP_WINDOW_SAMPLES];

volatile uint16_t dma_block_count = 0;
volatile uint8_t dsp_ready = 0;
volatile uint8_t startup_warmup_count = 0;

EnergySystem energy_sys = {0};

extern ADC_HandleTypeDef hadc1;
extern ADC_HandleTypeDef hadc2;
extern TIM_HandleTypeDef htim6;

// IIR filter alpha for DC offset removal (very slow response)
#define DC_ALPHA 0.999f

void Energo_Init(void) {
    memset((void*)v_proc, 0, sizeof(v_proc));
    memset((void*)i_proc, 0, sizeof(i_proc));
    memset(&energy_sys, 0, sizeof(energy_sys));

    // Calibrate ADCs
    HAL_ADCEx_Calibration_Start(&hadc1, ADC_SINGLE_ENDED);
    HAL_ADCEx_Calibration_Start(&hadc2, ADC_SINGLE_ENDED);

    // Start Slave ADC
    HAL_ADC_Start(&hadc2);

    // Start Master ADC in MultiMode DMA
    HAL_ADCEx_MultiModeStart_DMA(&hadc1, adc_dma_buf, ADC_DMA_BUF_SIZE);

    // Start the timer to trigger ADC conversions
    HAL_TIM_Base_Start(&htim6);
}

void Energo_ProcessDMA(uint32_t* src, uint16_t offset) {
    // Process 64 samples per phase (192 total words)
    for (uint16_t sample = 0; sample < SAMPLES_PER_CYCLE; sample++) {
        for (uint8_t phase = 0; phase < NUM_PHASES; phase++) {
            uint32_t word = *src++;
            
            // Extract ADC1 (Voltage) and ADC2 (Current) from the 32-bit word
            // Lower 16 bits = Master (ADC1), Upper 16 bits = Slave (ADC2)
            uint16_t raw_v = word & 0xFFFF;
            uint16_t raw_i = (word >> 16) & 0xFFFF;
            
            // Store raw ADC counts as floats (convert to engineering units later)
            v_proc[phase][offset + sample] = (float)raw_v;
            i_proc[phase][offset + sample] = (float)raw_i;
        }
    }
    
    dma_block_count++;
    
    if (dma_block_count >= DSP_WINDOW_CYCLES) {
        dma_block_count = 0;
        dsp_ready = 1;
    }
}

void calculate_phase_metrics(float* v_buf, float* i_buf, PhaseMetrics* pd, uint16_t N) {
    float sum_v2 = 0.0f;
    float sum_i2 = 0.0f;
    float sum_p = 0.0f;
    float sample_mean_v = 0.0f;
    float sample_mean_i = 0.0f;
    
    // First pass: calculate mean of the current window to update the slow DC offset tracker
    for (uint16_t k = 0; k < N; k++) {
        sample_mean_v += v_buf[k];
        sample_mean_i += i_buf[k];
    }
    sample_mean_v /= N;
    sample_mean_i /= N;
    
    // Update DC offsets (IIR filter)
    pd->v_offset = (DC_ALPHA * pd->v_offset) + ((1.0f - DC_ALPHA) * sample_mean_v);
    pd->i_offset = (DC_ALPHA * pd->i_offset) + ((1.0f - DC_ALPHA) * sample_mean_i);
    
    // Second pass: remove DC offset (in ADC counts) and convert to real-world units
    for (uint16_t k = 0; k < N; k++) {
        float v = (v_buf[k] - pd->v_offset) * V_GAIN;
        float i = (i_buf[k] - pd->i_offset) * I_GAIN;
        
        float p = v * i;
        
        sum_v2 += v * v;
        sum_i2 += i * i;
        sum_p += p;
    }
    
    pd->vrms = sqrtf(sum_v2 / N);
    pd->irms = sqrtf(sum_i2 / N);
    pd->active_power = sum_p / N;
    
    pd->apparent_power = pd->vrms * pd->irms;
    
    if (pd->apparent_power > 0.0f) {
        pd->power_factor = pd->active_power / pd->apparent_power;
        // Clamp to physically valid range
        if (pd->power_factor > 1.0f) pd->power_factor = 1.0f;
        if (pd->power_factor < -1.0f) pd->power_factor = -1.0f;
    } else {
        pd->power_factor = 0.0f;
    }
    
    // Apply noise threshold
    if (pd->irms < I_NOISE_THRESHOLD) {
        pd->irms = 0.0f;
        pd->active_power = 0.0f;
        pd->apparent_power = 0.0f;
        pd->power_factor = 0.0f;
    }
    
    // Accumulate Energy
    // N samples * sample period gives the window duration in seconds
    // Divide by 3600 to convert Watt-seconds (Joules) to Watt-hours
    float window_duration_s = N * SAMPLE_PERIOD_S;
    pd->energy_wh += (pd->active_power * window_duration_s) / 3600.0f;
    
    // Update running average power
    pd->energy_sample_count++;
    float total_time_h = (pd->energy_sample_count * window_duration_s) / 3600.0f;
    if (total_time_h > 0.0f) {
        pd->average_power = pd->energy_wh / total_time_h;
    }
}
