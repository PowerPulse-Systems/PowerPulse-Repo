# Tech Stack and File Structure

## 1. Backend (Selected: Node.js + NestJS)

### 1.1 Core Stack
- Runtime: Node.js
- Framework: NestJS
- Messaging: MQTT (Mosquitto / EMQX)
- Database:
  - PostgreSQL (users, devices, configs)
  - InfluxDB (time-series energy data)
- Realtime: WebSockets (Socket.IO via NestJS gateways)
- Auth: JWT (access tokens)

---

### 1.2 Why This Stack
- Event-driven, fits IoT ingestion and automation
- Handles many concurrent connections efficiently
- Strong structure via NestJS (modules, services, DI)
- Works well with MQTT and WebSockets
- Good fit for free-tier hosting

---

### 1.3 Backend File Structure (NestJS)

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/            # login, JWT, guards
│   │   ├── users/           # user management
│   │   ├── devices/         # device registry
│   │   ├── energy/          # energy ingestion & queries
│   │   ├── automation/      # rules engine (AC, lights)
│   │   ├── mqtt/            # MQTT client, subscriptions
│   │   └── notifications/   # alerts, events
│   │
│   ├── common/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   └── utils/
│   │
│   ├── config/              # env configs
│   ├── database/            # DB providers (Postgres, Influx)
│   └── main.ts
│
├── test/
├── package.json
└── README.md
```

---

### 1.4 Alternatives Considered (and Why Avoided)

#### Spring Boot (Java)
- Strong and scalable
- Avoided due to:
  - higher memory usage
  - slower startup
  - less suitable for free hosting

#### FastAPI (Python)
- Good for AI/analytics
- Avoided due to:
  - weaker performance for heavy real-time IoT ingestion

#### Go (Golang)
- High performance and concurrency
- Avoided due to:
  - slower development speed
  - smaller ecosystem for rapid prototyping

#### Serverless (Vercel / Netlify)
- Easy deployment
- Avoided due to:
  - no persistent connections
  - unsuitable for MQTT and always-on backend

#### ThingsBoard / Node-RED
- Built-in IoT features
- Avoided due to:
  - limited flexibility
  - less control over custom logic

---

## 2. Frontend (Selected: React + Vite)

### 2.1 Core Stack
- Framework: React (Vite build tool)
- Routing: React Router
- Styling: Tailwind CSS
- Charts: Recharts / Chart.js
- API Client: Axios
- Realtime: WebSocket client (Socket.IO)

---

### 2.2 Why This Stack
- Static hosting compatible (GitHub Pages)
- Fast development and build times (Vite)
- Suitable for real-time dashboards
- Large ecosystem for charts and UI

---

### 2.3 Frontend File Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Devices/
│   │   ├── Analytics/
│   │   └── Login/
│   │
│   ├── components/
│   │   ├── charts/
│   │   ├── cards/
│   │   ├── controls/
│   │   └── layout/
│   │
│   ├── services/
│   │   ├── api.js           # REST API calls
│   │   └── socket.js        # WebSocket connection
│   │
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   └── App.jsx
│
├── public/
├── index.html
├── package.json
└── README.md
```

---

### 2.4 Alternatives Considered (and Why Avoided)

#### Next.js
- Fullstack React framework
- Avoided due to:
  - SSR not usable on GitHub Pages
  - unnecessary complexity (backend already separate)

#### Angular
- Complete framework
- Avoided due to:
  - heavier structure
  - slower development for small team

#### Vue
- Lightweight and flexible
- Avoided due to:
  - smaller ecosystem familiarity (if team is JS/React-based)

#### Plain HTML/JS
- Very simple
- Avoided due to:
  - not scalable for dashboards
  - poor maintainability

---

## 3. Summary

### Backend
- Node.js + NestJS → event-driven, scalable, IoT-friendly

### Frontend
- React + Vite → fast, simple, deployable on static hosting

### Overall Design Choice
- Prioritized:
  - real-time capability
  - simplicity
  - free hosting compatibility
  - modular architecture

This combination provides a balanced system suitable for both prototyping and scaling.

