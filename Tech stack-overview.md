# Building Energy Management System – Repository Overview

## 1. Project Goal

This project is an IoT-based Building Energy Management System designed to:

- Monitor energy usage at breaker level
- Detect occupancy and environmental conditions
- Automate control of devices (e.g., AC, lights)
- Provide actionable insights to reduce energy waste

---

## 2. Repository Structure (Monorepo)

```
project-root/
│
├── firmware/
│   ├── breaker-node/        # Energy monitoring node (CT sensors, voltage sensing)
│   ├── switch-node/         # Relay/IR control nodes (lights, AC)
│   ├── sensor-node/         # Door/window, occupancy sensors
│   └── common/              # Shared libraries and utilities
│
├── backend/                 # API + event processing system
│
├── frontend/                # React web dashboard
│
├── docs/                    # Documentation, diagrams, reports
│
├── hardware/                # Schematics, PCB designs, BOM
│
└── README.md               # Project overview
```

---

## 3. System Architecture Map

```
[Sensor Nodes] ---->
                    \
                     ---> [MQTT Broker] ---> [Backend Server]
                    /
[Control Nodes] --->

[Backend Server] ---> [Database Layer]
       |
       ---> [WebSocket API] ---> [Frontend Dashboard]
```

---

## 4. Firmware Layer

### Technologies:

- C++ (Arduino framework)
- ESP32 / microcontrollers

### Responsibilities:

- Read sensor data (current, voltage, motion, door state)
- Send data via MQTT
- Receive control commands
- Operate in low-power mode (deep sleep for sensor nodes)

### Why:

- Efficient for embedded systems
- Direct hardware control
- Large ecosystem and library support

---

## 5. Backend Layer

### Technologies:

- Node.js (runtime)
- NestJS (structured backend framework)
- MQTT (device communication)

### Responsibilities:

- Receive and process device data
- Apply automation rules
- Handle user authentication
- Send control commands to devices
- Provide APIs for frontend

### Why:

- Event-driven architecture suits IoT systems
- Handles real-time data efficiently
- Scalable and modular design

---

## 6. Database Layer

### Technologies:

- PostgreSQL (relational database)
- InfluxDB (time-series database)

### Responsibilities:

- PostgreSQL:

  - Users, authentication
  - Device metadata
  - Configuration and rules

- InfluxDB:

  - Energy readings
  - Time-based sensor data

### Why:

- Separation of structured vs time-series data
- Optimized performance for high-frequency data

---

## 7. Communication Layer

### Technology:

- MQTT protocol

### Responsibilities:

- Publish/Subscribe communication between devices and backend

### Why:

- Lightweight
- Low power consumption
- Ideal for unreliable networks
- Scales to many devices

---

## 8. Frontend Layer

### Technologies:

- React
- WebSockets

### Responsibilities:

- Display real-time energy data
- Provide dashboards and analytics
- Allow user control of devices
- Show alerts and notifications

### Why:

- Component-based UI
- Real-time updates via WebSockets
- Large ecosystem for charts and UI

---

## 9. Hosting Strategy

### Frontend:

- GitHub Pages

### Backend:

- Cloud platform (e.g., Render)

### Why:

- Free and easy deployment for prototyping
- Suitable for student-scale project

---

## 10. Key Features Enabled by This Architecture

- Real-time monitoring of energy usage
- Automatic control (e.g., AC OFF when room empty)
- Fault detection and alerts
- Energy usage insights and optimization

---

## 11. Design Principles

- Modular architecture (each layer independent)
- Event-driven processing
- Low-power edge devices
- Scalable communication via MQTT

---

## 12. Future Improvements

- Machine learning for energy prediction
- Advanced rule engine
- Mobile application
- Edge AI processing

---

## Summary

This repository is structured as a unified system combining embedded firmware, backend processing, and frontend visualization to create an intelligent, scalable building energy management solution.

