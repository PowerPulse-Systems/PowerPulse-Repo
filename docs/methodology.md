# Methodology

## 1. Hardware Architecture
<!-- Content to be added -->

## 2. Firmware and Data Acquisition
<!-- Content to be added -->

## 3. Communication Protocols (MQTT Dual-Stream)

To ensure a highly scalable implementation for multi-circuit environments, the telemetry payloads utilize a hierarchical JSON structure that groups current transformers (CTs) under their respective voltage phases. This drastically reduces redundant data transmission by ensuring voltage measurements are sent only once per phase. 

For example, the live telemetry structure is formatted as follows:

```json
{
  "voltage_channels": [
    {
      "id": 1,
      "v": 230.5,
      "ct": [
        { "id": 1, "i": 1.20, "p": 276.6 },
        { "id": 2, "i": 0.80, "p": 184.4 },
        { "id": 3, "i": 2.10, "p": 484.1 }
      ]
    }
  ]
}
```

This specific structure allows the backend to efficiently map, route, and calculate power metrics for dozens of CTs without bloating the MQTT packet size, making the entire ecosystem robust and highly scalable. 

Similarly, to minimize database write operations and optimize storage, accumulated energy metrics (Watt-hours) and average power over a 60-second window are transmitted via a secondary stream. This payload shares the same hierarchical phase-grouping logic but includes precise start and end UNIX timestamps for accurate time-series analysis:

```json
{
  "ts_start": 1748280000,
  "ts_end": 1748280060,
  "voltage_channels": [
    {
      "id": 1,
      "ct": [
        { "id": 1, "energy_wh": 4.61, "avg_power_w": 276.6 }
      ]
    }
  ]
}
```


## 4. Cloud Infrastructure and Backend Processing
<!-- Content to be added -->

## 5. Web Dashboard and Visualization
<!-- Content to be added -->

## 6. Device Provisioning (Flutter Mobile App)

To securely integrate new hardware into the ecosystem, a dedicated mobile application developed in Flutter is utilized for device provisioning. The app connects to unprovisioned ESP32 devices via Bluetooth Low Energy (BLE) to transmit local Wi-Fi credentials, MQTT broker details, and backend routing endpoints. It handles a robust two-phase commit process, verifying network and MQTT connectivity before permanently committing the credentials to the device's Non-Volatile Storage (NVS).
