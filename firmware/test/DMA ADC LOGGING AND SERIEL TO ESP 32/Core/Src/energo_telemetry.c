#include "energo_telemetry.h"

// External DSP variables
extern EnergySystem energy_sys;

static uint8_t uart_tx_buf[UART_TX_BUF_SIZE];
static volatile uint8_t uart_busy = 0;

void Energo_SendLiveTelemetry(void) {
    if (uart_busy) {
        return; // Skip if still transmitting
    }

    char json_payload[UART_TX_BUF_SIZE - 2]; // reserve 2 bytes for STX and ETX
    
    // Format JSON matching the user's requested schema
    int len = snprintf(json_payload, sizeof(json_payload),
        "{\"type\":\"live\",\"voltage_channels\":["
            "{\"id\":1,\"vrms\":%.1f,\"current_channels\":[{\"id\":1,\"irms\":%.2f,\"power\":%.1f,\"pf\":%.2f}]},"
            "{\"id\":2,\"vrms\":%.1f,\"current_channels\":[{\"id\":2,\"irms\":%.2f,\"power\":%.1f,\"pf\":%.2f}]},"
            "{\"id\":3,\"vrms\":%.1f,\"current_channels\":[{\"id\":3,\"irms\":%.2f,\"power\":%.1f,\"pf\":%.2f}]}"
        "]}",
        energy_sys.phase[0].vrms, energy_sys.phase[0].irms, energy_sys.phase[0].active_power, energy_sys.phase[0].power_factor,
        energy_sys.phase[1].vrms, energy_sys.phase[1].irms, energy_sys.phase[1].active_power, energy_sys.phase[1].power_factor,
        energy_sys.phase[2].vrms, energy_sys.phase[2].irms, energy_sys.phase[2].active_power, energy_sys.phase[2].power_factor
    );

    if (len > 0 && len < (int)sizeof(json_payload)) {
        // Frame the payload
        uart_tx_buf[0] = STX_CHAR;
        memcpy(&uart_tx_buf[1], json_payload, len);
        uart_tx_buf[len + 1] = ETX_CHAR;
        
        uart_busy = 1;
        HAL_UART_Transmit_IT(&huart1, uart_tx_buf, len + 2);
    }
}

void Energo_SendEnergySummary(void) {
    if (uart_busy) {
        return; // Skip if still transmitting
    }

    char json_payload[UART_TX_BUF_SIZE - 2];
    
    int len = snprintf(json_payload, sizeof(json_payload),
        "{\"type\":\"energy\",\"channels\":["
            "{\"id\":1,\"energy_wh\":%.2f,\"avg_power\":%.1f},"
            "{\"id\":2,\"energy_wh\":%.2f,\"avg_power\":%.1f},"
            "{\"id\":3,\"energy_wh\":%.2f,\"avg_power\":%.1f}"
        "]}",
        energy_sys.phase[0].energy_wh, energy_sys.phase[0].average_power,
        energy_sys.phase[1].energy_wh, energy_sys.phase[1].average_power,
        energy_sys.phase[2].energy_wh, energy_sys.phase[2].average_power
    );

    if (len > 0 && len < (int)sizeof(json_payload)) {
        // Frame the payload
        uart_tx_buf[0] = STX_CHAR;
        memcpy(&uart_tx_buf[1], json_payload, len);
        uart_tx_buf[len + 1] = ETX_CHAR;
        
        uart_busy = 1;
        HAL_UART_Transmit_IT(&huart1, uart_tx_buf, len + 2);
    }
}

void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart) {
    if (huart->Instance == USART1) {
        uart_busy = 0;
    }
}
