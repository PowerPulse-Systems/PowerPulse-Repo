# Building Energy Management System (BEMS)
# NestJS Backend Architecture Guide

---

# 1. Backend Goal

The backend is responsible for:

- Receiving telemetry from ESP32 devices
- Managing devices and users
- Running automation logic
- Storing energy data
- Sending alerts
- Providing APIs for the frontend dashboard
- Sending commands to switch/control nodes

The backend should be:

- Modular
- Scalable
- Real-time capable
- Device-agnostic
- Easy to maintain

---

# 2. Recommended Backend Architecture

```text
ESP32 Nodes
    ↓
MQTT Broker (EMQX/HiveMQ/Mosquitto)
    ↓
NestJS Backend
    ├── Auth Module
    ├── Devices Module
    ├── MQTT Module
    ├── Energy Module
    ├── Automation Module
    ├── Alerts Module
    ├── Analytics Module
    ├── WebSocket Gateway
    └── Database Layer
    ↓
PostgreSQL / TimescaleDB
    ↓
Frontend Dashboard
```

---

# 3. Recommended Technology Stack

| Component | Technology |
|---|---|
| Backend Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL |
| Time-Series Data | TimescaleDB |
| ORM | Prisma |
| MQTT Client | mqtt.js |
| Authentication | JWT |
| Realtime | WebSocket |
| Validation | class-validator |
| Environment Config | @nestjs/config |
| Deployment | Render / Railway / Local Machine |

---

# 4. Recommended Project Structure

```text
src/
│
├── main.ts
├── app.module.ts
│
├── config/
│   ├── env.config.ts
│   └── mqtt.config.ts
│
├── common/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   ├── pipes/
│   └── utils/
│
├── database/
│   ├── prisma.service.ts
│   ├── prisma.module.ts
│   └── migrations/
│
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── users/
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── devices/
│   ├── dto/
│   ├── entities/
│   ├── devices.controller.ts
│   ├── devices.service.ts
│   └── devices.module.ts
│
├── mqtt/
│   ├── mqtt.service.ts
│   ├── mqtt.module.ts
│   ├── mqtt.handlers.ts
│   └── topic-parser.ts
│
├── telemetry/
│   ├── dto/
│   ├── telemetry.service.ts
│   ├── telemetry.controller.ts
│   └── telemetry.module.ts
│
├── energy/
│   ├── dto/
│   ├── energy.service.ts
│   ├── energy.controller.ts
│   └── energy.module.ts
│
├── automation/
│   ├── rules/
│   ├── automation.engine.ts
│   ├── automation.service.ts
│   └── automation.module.ts
│
├── alerts/
│   ├── alerts.service.ts
│   ├── alerts.controller.ts
│   └── alerts.module.ts
│
├── analytics/
│   ├── analytics.service.ts
│   ├── analytics.controller.ts
│   └── analytics.module.ts
│
├── websocket/
│   ├── websocket.gateway.ts
│   └── websocket.module.ts
│
└── health/
    ├── health.controller.ts
    └── health.module.ts
```

---

# 5. Purpose of Each Module

## Auth Module

Handles:

- Login
- JWT generation
- Access control
- Role management

Roles:

- Admin
- Facility Manager
- Technician
- Viewer

---

## Devices Module

Handles:

- Device registration
- Device metadata
- Device status
- Firmware version tracking
- Online/offline state

Device types:

- Main board
- Sensor node
- Switch node

---

## MQTT Module

Handles:

- MQTT connection
- Topic subscriptions
- Parsing incoming messages
- Publishing commands to devices

Example topics:

```text
bems/building1/node3/current
bems/building1/node5/status
bems/building1/switch2/cmd
```

---

## Telemetry Module

Handles:

- Incoming summarized energy reports
- Validation
- Buffering
- Storage
- Event processing

ESP32 devices should NOT continuously send raw current samples.

Instead:

- Sample locally
- Calculate power and energy locally
- Send periodic summarized reports

Recommended telemetry payload:

```json
{
  "period_start": 1715400000,
  "period_end": 1715400060,
  "energy_wh": 14.2,
  "avg_power_w": 852,
  "peak_power_w": 1100
}
```

Important realtime events should still be sent immediately.

Example event payload:

```json
{
  "event": "OVERCURRENT",
  "value": 18.2,
  "timestamp": 1715400005
}
```

## Energy Module

Handles:

- kWh calculations
- Energy summaries
- Daily usage
- Peak load detection
- Breaker usage statistics

---

## Automation Module

Handles automation rules.

Example rules:

- Turn off AC when window open
- Alert when overload detected
- Turn off lighting after inactivity

Structure:

```text
IF condition
    THEN action
```

---

## Alerts Module

Handles:

- Notifications
- Overcurrent alerts
- Device offline alerts
- Anomaly alerts

Future expansion:

- Email notifications
- Mobile notifications
- Telegram/WhatsApp alerts

---

## Analytics Module

Handles:

- Trends
- Predictions
- Efficiency metrics
- Top energy consumers
- Idle load analysis

---

## WebSocket Module

Handles realtime communication.

Frontend receives:

- Live telemetry
- Alerts
- Device state updates
- Automation events

without page refresh.

---

# 6. Recommended Database Structure

## Users Table

```text
users
- id
- name
- email
- password_hash
- role
- created_at
```

---

## Buildings Table

```text
buildings
- id
- name
- address
```

---

## Panels Table

```text
panels
- id
- building_id
- name
```

---

## Devices Table

```text
devices
- id
- mac_address
- type
- firmware_version
- online_status
- last_seen
```

---

## Breakers Table

```text
breakers
- id
- panel_id
- device_id
- label
- phase
```

---

## Energy Readings Table

```text
energy_readings
- id
- breaker_id
- period_start
- period_end
- energy_wh
- avg_power_w
- peak_power_w
- created_at
```

---

## Alerts Table

```text
alerts
- id
- severity
- message
- acknowledged
- created_at
```

---

## Automation Rules Table

```text
automation_rules
- id
- condition
- action
- enabled
```

---

# 7. Backend Data Flow

```text
ESP32
   ↓
MQTT Broker
   ↓
MQTT Module
   ↓
Telemetry Validation
   ↓
Database Storage
   ↓
Automation Engine
   ↓
Alerts / Commands
   ↓
WebSocket Events
   ↓
Frontend Dashboard
```

---

# 8. Recommended API Structure

## Authentication

```text
POST /auth/login
POST /auth/register
GET  /auth/profile
```

---

## Devices

```text
GET    /devices
GET    /devices/:id
POST   /devices
PATCH  /devices/:id
DELETE /devices/:id
```

---

## Telemetry

```text
GET /telemetry/live
GET /telemetry/history
```

---

## Energy

```text
GET /energy/daily
GET /energy/monthly
GET /energy/top-consumers
```

---

## Alerts

```text
GET /alerts
PATCH /alerts/:id/acknowledge
```

---

# 9. MQTT Message Design

## Telemetry Topic

```text
bems/building1/breaker5/current
```

Payload:

```json
{
  "period_start": 1715400000,
  "period_end": 1715400060,
  "energy_wh": 14.2,
  "avg_power_w": 852,
  "peak_power_w": 1100
}
```json
{
  "current": 4.3,
  "power": 850,
  "voltage": 230,
  "timestamp": 1710000000
}
```

---

## Command Topic

```text
bems/building1/switchnode2/cmd
```

Payload:

```json
{
  "relay": 1,
  "state": "OFF"
}
```

---

# 10. Recommended Development Order

## Phase 1

Setup:

- NestJS project
- PostgreSQL
- Prisma ORM
- Basic API

---

## Phase 2

Implement:

- Authentication
- User management
- Device management

---

## Phase 3

Implement MQTT:

- Connect to broker
- Subscribe to telemetry
- Publish commands

---

## Phase 4

Implement:

- Telemetry storage
- Energy calculations
- WebSocket realtime updates

---

## Phase 5

Implement:

- Automation engine
- Alerts system
- Analytics

---

# 11. Recommended NestJS Commands

## Create Project

```bash
nest new bems-backend
```

---

## Install Core Packages

```bash
npm install @nestjs/config
npm install @nestjs/jwt passport passport-jwt
npm install class-validator class-transformer
npm install prisma @prisma/client
npm install mqtt
npm install @nestjs/websockets socket.io
```

---

## Generate Modules

```bash
nest g module auth
nest g module devices
nest g module mqtt
nest g module telemetry
nest g module energy
nest g module automation
nest g module alerts
nest g module analytics
```

---

# 12. Recommended Environment Variables

```env
PORT=3000

DATABASE_URL=postgresql://user:password@localhost:5432/bems

JWT_SECRET=supersecret

MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=user
MQTT_PASSWORD=password
```

---

# 13. Recommended Deployment Structure

For development, keep the setup simple.

You do NOT need Docker during early development.

Recommended local setup:

```text
Your Laptop/PC
 ├── NestJS Backend
 ├── PostgreSQL
 └── MQTT Broker
```

Recommended cloud setup later:

```text
Render / Railway
 ├── NestJS Backend
 ├── PostgreSQL
 └── MQTT Broker (Cloud or Self-Hosted)
```

You can add Docker later only if:

- Multiple developers work together
- Deployment becomes complicated
- You want reproducible environments
- You move to production-scale deployment

For now, focus on:

- Fast development
- Easy debugging
- Understanding backend architecture

---

# 14. Important Design Principles

## Do NOT store raw waveform samples

ESP32 should:

- Sample locally
- Calculate RMS/power locally
- Accumulate energy usage over time
- Send summarized energy reports only

Recommended architecture:

```text
High-frequency sampling locally
           ↓
Local RMS/power calculations
           ↓
Energy accumulation over time window
           ↓
Periodic summarized MQTT packets
```

This reduces:

- Network traffic
- Database growth
- Backend load

while improving scalability

---

## Use event-driven architecture

Do NOT constantly poll devices.

Use:

- MQTT publish/subscribe
- WebSocket realtime updates

---

## Keep backend device-agnostic

Backend should support:

- New sensor types
- New node types
- Multiple buildings

without redesign.

---

# 15. MVP Backend Features

Minimum features for first working version:

- User login
- Device registration
- MQTT telemetry ingestion
- Energy data storage
- Live dashboard updates
- Basic alerts
- Simple automation rule

---

# 16. Advanced Features (Future)

- AI anomaly detection
- Predictive maintenance
- Energy efficiency scoring
- Appliance signature detection
- Multi-building support
- Role-based dashboards
- OTA firmware updates
- Mobile notifications

---

# 17. Final Architecture Recommendation

For your project, the best architecture is:

```text
ESP32 Nodes
   ↓
MQTT Broker
   ↓
NestJS Backend
   ↓
PostgreSQL + TimescaleDB
   ↓
React Frontend
```

This gives:

- Scalability
- Real-time communication
- Modular structure
- Clean separation of responsibilities
- Future expandability

