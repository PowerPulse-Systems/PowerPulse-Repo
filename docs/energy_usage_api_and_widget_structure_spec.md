# Specification: Energy Usage API & Dashboard Widget Restructuring

This document provides developer guidelines and implementation specifications for two core features of the PowerPulse Building Energy Management System (BEMS):
1. **Energy Usage Customizable Aggregation API** (Backend)
2. **Dashboard Widget Structural Restructuring** (Frontend & Backend)

---

## Part 1: Customizable Energy Usage API

### 1.1 Goal
Provide a secure REST API endpoint on the backend that calculates the total energy usage (`energyWh`) and other metrics (average power, peak power) for a specified user's device(s) or individual breaker channel(s) over a customizable time range (start/end dates or specific presets).

### 1.2 Database Query Strategy (Prisma ORM)
All telemetry readings are stored in the `EnergyReading` table, containing `energyWh` and `avgPowerW` logged on a minute-by-minute basis. To calculate the total energy over a long period:
1. We filter readings by `breakerId` (belonging to selected devices/channels).
2. We filter by time using the Unix timestamp fields `periodStart` and `periodEnd`.
3. We sum the cumulative energy (`energyWh`) using Prisma’s aggregate utility.

### 1.3 Backend Implementation Guide

#### A. Data Transfer Object (DTO) & Query Parameters
The backend endpoint should accept the following query parameters:
*   `breakerIds`: A string or array of breaker UUIDs to aggregate. If not supplied, aggregate across all breakers of the user's selected device.
*   `startDate`: ISO date string or Unix timestamp representing the starting period.
*   `endDate`: ISO date string or Unix timestamp representing the ending period.
*   `preset`: (Optional) Standard presets like `24h`, `7d`, `30d`, `1y` which automatically compute `startDate` and `endDate`.

#### B. NestJS Controller Code (`backend/src/energy/energy.controller.ts`)
Extend the existing controller to support custom range aggregation:

```typescript
import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('energy')
@UseGuards(JwtAuthGuard)
export class EnergyController {
  constructor(private energyService: EnergyService) {}

  /**
   * Get aggregated energy metrics over a customizable period.
   * GET /energy/aggregate?breakerIds=id1,id2&startDate=2026-05-01T00:00:00Z&endDate=2026-05-26T23:59:59Z
   */
  @Get('aggregate')
  async getAggregatedUsage(
    @Query('breakerIds') breakerIdsString?: string,
    @Query('startDate') startDateString?: string,
    @Query('endDate') endDateString?: string,
    @Query('preset') preset?: '24h' | '7d' | '30d' | '1y',
  ) {
    let startTimestamp: number;
    let endTimestamp: number = Math.floor(Date.now() / 1000);

    // 1. Calculate timeframe based on presets or custom dates
    if (preset) {
      const now = Math.floor(Date.now() / 1000);
      switch (preset) {
        case '24h':
          startTimestamp = now - 24 * 3600;
          break;
        case '7d':
          startTimestamp = now - 7 * 24 * 3600;
          break;
        case '30d':
          startTimestamp = now - 30 * 24 * 3600;
          break;
        case '1y':
          startTimestamp = now - 365 * 24 * 3600;
          break;
        default:
          throw new BadRequestException('Invalid time preset');
      }
    } else {
      if (!startDateString || !endDateString) {
        throw new BadRequestException('Either preset or both startDate and endDate must be specified');
      }
      startTimestamp = Math.floor(new Date(startDateString).getTime() / 1000);
      endTimestamp = Math.floor(new Date(endDateString).getTime() / 1000);
      
      if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
        throw new BadRequestException('Invalid date formats provided');
      }
    }

    // 2. Parse Breaker IDs
    const breakerIds = breakerIdsString ? breakerIdsString.split(',') : [];

    return this.energyService.getAggregatedEnergy(breakerIds, startTimestamp, endTimestamp);
  }
}
```

#### C. NestJS Service Code (`backend/src/energy/energy.service.ts`)
Extend the service to perform high-performance database query sum:

```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnergyService {
  constructor(private prisma: PrismaService) {}

  async getAggregatedEnergy(breakerIds: string[], startUnix: number, endUnix: number) {
    if (!breakerIds || breakerIds.length === 0) {
      throw new BadRequestException('At least one breakerId must be specified');
    }

    // 1. Fetch total sum of energy and peak power in a single db roundtrip
    const aggregation = await this.prisma.energyReading.aggregate({
      _sum: {
        energyWh: true,
      },
      _max: {
        peakPowerW: true,
      },
      _avg: {
        avgPowerW: true,
      },
      where: {
        breakerId: { in: breakerIds },
        periodStart: { gte: startUnix },
        periodEnd: { lte: endUnix },
      },
    });

    // 2. Optional: Retrieve time-series intervals for charting
    // We group readings hourly or daily depending on the length of the query
    const duration = endUnix - startUnix;
    let intervalSeconds = 3600; // default hourly
    if (duration > 30 * 24 * 3600) {
      intervalSeconds = 24 * 3600; // daily for > 30 days
    }

    // Perform a raw or formatted query for time-series grouping
    const timeSeries = await this.prisma.$queryRaw`
      SELECT 
        (FLOOR("periodStart" / ${intervalSeconds}) * ${intervalSeconds}) as "timestamp",
        SUM("energyWh") as "energy",
        AVG("avgPowerW") as "power"
      FROM "EnergyReading"
      WHERE "breakerId" = ANY(${breakerIds})
        AND "periodStart" >= ${startUnix}
        AND "periodEnd" <= ${endUnix}
      GROUP BY FLOOR("periodStart" / ${intervalSeconds})
      ORDER BY "timestamp" ASC
    `;

    return {
      totalEnergyWh: aggregation._sum.energyWh || 0,
      peakPowerW: aggregation._max.peakPowerW || 0,
      avgPowerW: aggregation._avg.avgPowerW || 0,
      periodStart: startUnix,
      periodEnd: endUnix,
      timeSeries,
    };
  }
}
```

---

## Part 2: Dashboard Widget Restructuring

### 2.1 Context
We are changing how users construct and configure custom Dashboard cards. 

Currently, adding a widget uses generic text fields and simple presets. We are updating it so that:
1. **Time ranges are properly standardized** to `24h`, `7d`, `30d`, and `1y`.
2. **Device selection is dynamic** (pulled directly from the user's claimed devices in their profile).
3. **Channel / Breaker selection is dynamic** (pulled from the channels that were auto-discovered or manually registered for the chosen device).

### 2.2 Backend Schema & Calculation Updates

#### A. Database Schema (`backend/prisma/schema.prisma`)
The `Widget` model already has space for storing config:
*   `timePreset`: Needs to be updated to support the validated options: `"24h" | "7d" | "30d" | "1y"`.
*   `breakers`: An array of Breaker UUIDs (`String[]`) to calculate the aggregation.

#### B. Widgets Aggregation Service (`backend/src/widgets/widgets.service.ts`)
Refactor the value parser to reflect the new time ranges and time calculation logic:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WidgetsService {
  constructor(private prisma: PrismaService) {}

  async getWidgetValue(widgetConfig: any) {
    const { deviceId, metric, breakers, timePreset } = widgetConfig;

    const where: any = {
      breaker: {
        deviceId: deviceId,
      }
    };

    if (breakers && breakers.length > 0) {
      where.breakerId = { in: breakers };
    }

    // Set dynamic Unix timestamps matching the new presets
    if (timePreset) {
      const now = Math.floor(Date.now() / 1000);
      let sinceUnix = now;

      switch (timePreset) {
        case '24h':
          sinceUnix = now - 24 * 3600;
          break;
        case '7d':
          sinceUnix = now - 7 * 24 * 3600;
          break;
        case '30d':
          sinceUnix = now - 30 * 24 * 3600;
          break;
        case '1y':
          sinceUnix = now - 365 * 24 * 3600;
          break;
      }
      where.periodStart = { gte: sinceUnix };
    }

    // Execute query based on metric type
    if (metric === 'energy_usage') {
      const result = await this.prisma.energyReading.aggregate({
        _sum: { energyWh: true },
        where,
      });
      return { value: result._sum.energyWh || 0, unit: 'Wh' };
    } 
    
    if (metric === 'current_load' || metric === 'power') {
      const latestLogs = await this.prisma.energyReading.findMany({
        where,
        orderBy: { periodEnd: 'desc' },
        take: breakers?.length || 1,
      });

      const totalPower = latestLogs.reduce((sum, log) => sum + log.avgPowerW, 0);
      return { value: totalPower || 0, unit: 'W' };
    }

    return { value: 0, unit: '' };
  }
}
```

---

### 2.3 Frontend Specification (`WidgetConfigModal.tsx`)

To support complex building layouts (e.g., aggregate power across different floors or target specific rooms on multiple devices simultaneously), we will implement a **Multi-Device Checkbox Panel** and an **Active Channel Selector Panel** inside the configuration modal.

#### UX Layout:
*   **Device Sidebar (Left/Top)**: A checklist of all devices. Users can check/uncheck whole devices. Clicking a device sets it as the "active" device to view its channels.
*   **Channel Selector (Right/Bottom)**: Shows the channels/breakers for the *currently focused* device. Users can check/uncheck individual channels. Selected channels are accumulated globally.

```
+-------------------------------------------------------------+
| Widget Name: [ Master Building Load                       ] |
|                                                             |
| 1. Select Devices                  2. Select Active Channels|
| +-------------------------------+  +----------------------+ |
| | [x] Ground Floor (PP-01)  (>) |  | [x] Channel 1 (AC)   | |
| | [x] First Floor (PP-02)       |  | [x] Channel 2 (Plug) | |
| | [ ] Server Room (PP-03)       |  | [ ] Channel 3 (Lights)| |
| +-------------------------------+  +----------------------+ |
|                                                             |
| Measurement Type: [ Energy Usage ]    Card Size: [ Medium ] |
| Time Range: [ Last 7 Days ]                                 |
+-------------------------------------------------------------+
```

#### A. Required State Variables
```tsx
const [devices, setDevices] = useState<any[]>([]); // User's devices fetched from API (includes nested breakers)
const [activeDeviceId, setActiveDeviceId] = useState<string>(''); // Device currently active/focused in the sidebar
const [selectedBreakerIds, setSelectedBreakerIds] = useState<string[]>([]); // Global list of selected breaker/channel UUIDs
```

#### B. Fetching Dynamic Data on Open
```tsx
useEffect(() => {
  if (isOpen) {
    // Fetch all devices owned by the user
    devicesApi.getMyDevices()
      .then(res => {
        setDevices(res.data);
        
        if (initialWidget) {
          // Pre-populate editing widget data
          setSelectedBreakerIds(initialWidget.breakers || []);
          if (res.data.length > 0) {
            // Set focused device to the first device in the saved selection or first available
            const savedBreaker = initialWidget.breakers?.[0];
            const matchingDevice = res.data.find((d: any) => 
              d.breakers.some((b: any) => b.id === savedBreaker)
            );
            setActiveDeviceId(matchingDevice ? matchingDevice.id : res.data[0].id);
          }
        } else if (res.data.length > 0) {
          // Default to focusing the first device
          setActiveDeviceId(res.data[0].id);
          // Default to selecting all channels for all devices
          const allBreakerIds = res.data.flatMap((d: any) => d.breakers.map((b: any) => b.id));
          setSelectedBreakerIds(allBreakerIds);
        }
      })
      .catch(err => console.error("Error loading user devices", err));
  }
}, [isOpen, initialWidget]);
```

#### C. Render Form Component Structure

##### 1. Title Form Field
```tsx
<div>
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Widget Name</label>
  <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
    placeholder="e.g. Master Building Load"
  />
</div>
```

##### 2. Interactive Multi-Device & Channel Checkbox Panel
This dual-panel selection allows clean aggregation of channels across multiple devices:

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
    Configure Monitored Devices & Channels
  </label>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-900/50">
    
    {/* Left Panel: Devices Checklist */}
    <div className="space-y-2 border-r border-slate-200 dark:border-slate-800 pr-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">1. Monitored Devices</span>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {devices.map(device => {
          const deviceBreakerIds = device.breakers.map((b: any) => b.id);
          const checkedCount = device.breakers.filter((b: any) => selectedBreakerIds.includes(b.id)).length;
          const isFullyChecked = checkedCount === device.breakers.length && device.breakers.length > 0;
          const isPartiallyChecked = checkedCount > 0 && checkedCount < device.breakers.length;
          
          return (
            <div 
              key={device.id}
              onClick={() => setActiveDeviceId(device.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                activeDeviceId === device.id 
                  ? 'bg-blue-500/10 border border-blue-500/20' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              <label className="flex items-center gap-2 cursor-pointer flex-1" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  ref={el => {
                    if (el) el.indeterminate = isPartiallyChecked;
                  }}
                  checked={isFullyChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Add all device breakers
                      const toAdd = deviceBreakerIds.filter((id: string) => !selectedBreakerIds.includes(id));
                      setSelectedBreakerIds([...selectedBreakerIds, ...toAdd]);
                    } else {
                      // Remove all device breakers
                      setSelectedBreakerIds(selectedBreakerIds.filter(id => !deviceBreakerIds.includes(id)));
                    }
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-850 dark:text-slate-200">
                    {device.name || `Device (${device.macAddress})`}
                  </span>
                  <span className="text-xs text-slate-400">
                    {checkedCount} of {device.breakers.length} channels active
                  </span>
                </div>
              </label>
              <span className="text-slate-400 text-xs">➔</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Right Panel: Active Device's Channels Selector */}
    <div className="space-y-2 pl-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        2. Channels for: {devices.find(d => d.id === activeDeviceId)?.name || "Selected Device"}
      </span>
      <div className="space-y-2 max-h-48 overflow-y-auto p-1">
        {(() => {
          const activeDevice = devices.find(d => d.id === activeDeviceId);
          if (!activeDevice) return <span className="text-xs text-slate-500 italic">Select a device from the left...</span>;
          if (activeDevice.breakers.length === 0) return <span className="text-xs text-slate-500 italic">No channels discovered on this device.</span>;
          
          return activeDevice.breakers.map((breaker: any) => {
            const isChecked = selectedBreakerIds.includes(breaker.id);
            return (
              <label key={breaker.id} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    if (isChecked) {
                      setSelectedBreakerIds(selectedBreakerIds.filter(id => id !== breaker.id));
                    } else {
                      setSelectedBreakerIds([...selectedBreakerIds, breaker.id]);
                    }
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{breaker.label || `Channel ${breaker.channelIndex}`}</span>
                  <span className="text-[10px] text-slate-450">Index: {breaker.channelIndex}</span>
                </div>
              </label>
            );
          });
        })()}
      </div>
    </div>

  </div>
</div>
```

##### 3. Measurement Type & Card Size
```tsx
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Measurement Type</label>
    <select
      value={metric}
      onChange={(e) => setMetric(e.target.value as WidgetMetric)}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
    >
      <option value="energy_usage">Energy Usage (Wh)</option>
      <option value="current_load">Current Load / Power (W)</option>
      <option value="voltage">Voltage (V)</option>
    </select>
  </div>
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Size</label>
    <select
      value={size}
      onChange={(e) => setSize(e.target.value as WidgetSize)}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
    >
      <option value="small">Small (1/3 Grid)</option>
      <option value="medium">Medium (2/3 Grid)</option>
      <option value="large">Large (Full Grid)</option>
    </select>
  </div>
</div>
```

##### 4. Time Range Selection Dropdown (Standardized)
```tsx
<div>
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time Range</label>
  <select
    value={timePreset}
    onChange={(e) => setTimePreset(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
  >
    <option value="24h">Last 24 Hours (24h)</option>
    <option value="7d">Last 7 Days (7d)</option>
    <option value="30d">Last 30 Days (30d)</option>
    <option value="1y">Last 1 Year (1y)</option>
  </select>
</div>
```

##### 5. Form Submit Handling
When submitting the form, ensure that the selected breaker IDs array is packaged into the saved widget payload:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSave({
    ...initialWidget,
    title,
    metric,
    type,
    size,
    timePreset,
    breakers: selectedBreakerIds, // Global multi-breaker checklist configuration
    aggregation: 'sum', // Standardize aggregation calculations
    position: initialWidget?.position || 0,
  });
  onClose();
};
```

## Part 3: Reliable Device Online/Offline Status (Watchdog)

### 3.1 The Problem
Currently, the frontend shows devices as **ONLINE** indefinitely, even if they are physically unplugged or disconnected. This happens because:
1. **No Silent Disconnect Handling**: If a device loses power or Wi-Fi abruptly, it cannot publish its offline message to the MQTT `status` topic.
2. **Missing Ingestion Updates**: Regular minute-by-minute telemetry messages (`bems/<macAddress>/telemetry`) process database logs but **fail to update** the device's `lastSeen` timestamp or mark it as online.

### 3.2 Solution Architecture
To fix this, we will implement an **active watchdog mechanism** combining ingestion refreshes with a background cleanup interval:

```
+------------------+     Regular Telemetry     +--------------------------------+
|  ESP32 Hardware  | ------------------------> | Update lastSeen & online=true  |
+------------------+                           +--------------------------------+
                                                               |
                                                       (Every 60 seconds)
                                                               v
+------------------+                           +--------------------------------+
| Frontend Display | <------------------------ | Watchdog Cron: Sets stale      |
| "OFFLINE"        |                           | devices (lastSeen > 3m) offline|
+------------------+                           +--------------------------------+
```

---

### 3.3 Backend Implementation Steps

#### Step 1: Update Telemetry Ingestion (`backend/src/telemetry/telemetry.service.ts`)
Modify the `processDeviceTelemetry` method so that every successfully processed telemetry packet automatically updates the device's connection status and `lastSeen` timestamp:

```typescript
// Inside telemetry.service.ts -> processDeviceTelemetry()
// After checking if device exists and saving the energy readings...

await this.prisma.device.update({
  where: { id: device.id },
  data: {
    onlineStatus: true,
    lastSeen: new Date(), // Always update lastSeen on active data ingestion
  }
});
```

#### Step 2: Implement Active Watchdog Checker (`backend/src/devices/devices.service.ts`)
Add a background interval service that runs every 60 seconds to scan for stale devices (where the last check-in was more than 3 minutes ago) and marks them offline:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DevicesService.name);
  private heartbeatInterval: NodeJS.Timeout;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.logger.log('🚀 Initializing Device Watchdog Checker...');
    
    // Run watchdog scan every 60 seconds
    this.heartbeatInterval = setInterval(async () => {
      await this.scanAndCleanStaleDevices();
    }, 60000);
  }

  onModuleDestroy() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  /**
   * Scans the database for devices currently marked ONLINE that have not checked in
   * via telemetry or status in the last 3 minutes (180 seconds), setting them OFFLINE.
   */
  async scanAndCleanStaleDevices() {
    try {
      const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

      // Perform bulk database update
      const result = await this.prisma.device.updateMany({
        where: {
          onlineStatus: true,
          OR: [
            { lastSeen: { lt: threeMinutesAgo } },
            { lastSeen: null }
          ]
        },
        data: {
          onlineStatus: false
        }
      });

      if (result.count > 0) {
        this.logger.log(`⚠️ Watchdog: Marked ${result.count} stale devices as OFFLINE`);
      }
    } catch (err) {
      this.logger.error(`Error executing watchdog cleanup scan: ${(err as Error).message}`);
    }
  }
  
  // ... rest of the existing service methods
}
```

---

### 3.4 Summary of Fix Benefits
1. **No Lost Events Risk**: Even if the hardware fails to send a clean "offline" MQTT message when unplugged, the backend corrects the status automatically within 3 minutes.
2. **Reduced DB Load**: Telemetry ingestion now keeps status fresh, and the watchdog runs lightweight bulk queries to update status only when changes occur.
3. **Accurate Frontend Display**: The frontend Dashboard and Topbar will accurately reflect when a device has went offline.

---

## Part 4: Dual-Stream Telemetry Architecture

### 4.1 Overview

The system uses **two separate MQTT data streams** to serve different needs:

| Stream | MQTT Topic | Frequency | Stored? | Transport to Frontend |
|--------|-----------|-----------|---------|----------------------|
| **Live** | `bems/<mac>/live` | Every 3s | ❌ In-memory only | WebSocket (Socket.IO) |
| **Energy** | `bems/<mac>/energy` | Every 60s | ✅ PostgreSQL | REST API polling |

Both streams use a **voltage-grouped** payload where current transformer (CT) channels are nested under their associated voltage phase.

### 4.2 Data Flow

```
ESP32                    NestJS Backend                          React Frontend
┌──────────┐            ┌──────────────────────────┐            ┌──────────────────┐
│ Live 3s  │───MQTT────►│ MqttService              │            │                  │
│ Timer    │  /live     │  ↓ TelemetryService      │            │ useLiveTelemetry │
│          │            │    .processLiveData()    │            │   hook           │
│          │            │    → In-memory Map       │            │                  │
│          │            │    → LiveTelemetryGateway │───WS─────►│ StatCardWidget   │
│          │            │      .broadcastLiveData() │  live:data │  (power/V/A)    │
│          │            │                          │            │                  │
│ Energy   │───MQTT────►│ MqttService              │            │                  │
│ 60s      │  /energy   │  ↓ TelemetryService      │            │ StatCardWidget   │
│ Timer    │            │    .processEnergyData()  │            │  (energy_usage)  │
│          │            │    → PostgreSQL           │◄──REST────│  polls /widgets/ │
└──────────┘            └──────────────────────────┘            └──────────────────┘
```

### 4.3 MQTT Payload Schemas

#### Stream 1: Live Packet (`bems/<mac>/live`)

Sent every 3 seconds. Contains instantaneous RMS readings grouped by voltage phase.

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
    },
    {
      "id": 2,
      "v": 231.0,
      "ct": [
        { "id": 4, "i": 0.50, "p": 115.5 },
        { "id": 5, "i": 1.00, "p": 231.0 }
      ]
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `voltage_channels[].id` | int | Voltage input index (1-based) |
| `voltage_channels[].v` | float | Voltage RMS (Volts) |
| `ct[].id` | int | Global CT channel ID (1-based, unique across device) |
| `ct[].i` | float | Current RMS (Amps) |
| `ct[].p` | float | Active power (Watts) |

> **Note**: Short field names (`v`, `i`, `p`, `ct`) minimize MQTT payload size for 3s intervals.

#### Stream 2: Energy Packet (`bems/<mac>/energy`)

Sent every 60 seconds. Contains accumulated energy readings for the period.

```json
{
  "ts_start": 1748280000,
  "ts_end": 1748280060,
  "voltage_channels": [
    {
      "id": 1,
      "ct": [
        { "id": 1, "energy_wh": 4.61, "avg_power_w": 276.6 },
        { "id": 2, "energy_wh": 3.07, "avg_power_w": 184.4 }
      ]
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `ts_start` | int | Unix timestamp — start of measurement period |
| `ts_end` | int | Unix timestamp — end of measurement period |
| `ct[].energy_wh` | float | Total energy in period (Wh) |
| `ct[].avg_power_w` | float | Average power during period (W) |

### 4.4 Backend Processing

#### MqttService Topic Routing (`backend/src/mqtt/mqtt.service.ts`)

The MQTT service subscribes to three topic patterns:
- `bems/+/live` → `TelemetryService.processLiveData(mac, payload)` 
- `bems/+/energy` → `TelemetryService.processEnergyData(mac, payload)`
- `bems/+/telemetry` → Legacy handler (backward compatibility)

#### TelemetryService Dual Processing (`backend/src/telemetry/telemetry.service.ts`)

**`processLiveData(mac, payload)`**:
1. Parse voltage-grouped payload into flat channel readings
2. Store latest snapshot in `Map<string, DeviceLiveSnapshot>` (in-memory)
3. Broadcast to WebSocket room `device:<mac>` via `LiveTelemetryGateway`
4. Refresh device `lastSeen` / `onlineStatus`

**`processEnergyData(mac, payload)`**:
1. Parse voltage-grouped payload, flatten to individual channel records
2. Auto-discover new channels (create `Breaker` records if not found)
3. Write `EnergyReading` records to PostgreSQL
4. Refresh device `lastSeen` / `onlineStatus`

#### WebSocket Gateway (`backend/src/telemetry/live-telemetry.gateway.ts`)

Uses NestJS `@WebSocketGateway()` with Socket.IO:
- **Authentication**: JWT token validated from `client.handshake.auth.token`
- **Room Management**: Clients auto-join rooms `device:<macAddress>` for all their owned devices
- **Broadcasting**: `broadcastLiveData(mac, data)` emits `live:data` event to room members
- **Security**: Only the device owner receives live data for their devices

### 4.5 Frontend Integration

#### SocketProvider (`frontend/src/context/SocketProvider.tsx`)

A React Context that creates a single Socket.IO connection per authenticated session:
- Connects with JWT from `localStorage`
- Provides `useSocket()` hook returning `{ socket, connected }`
- Wrapped around the entire app in `App.tsx`

#### useLiveTelemetry Hook (`frontend/src/hooks/useLiveTelemetry.ts`)

Subscribes to live data for specific device MAC addresses:
- Emits `subscribe` event with MAC list
- Listens for `live:data` events
- Returns `Map<mac, LivePayload>` and `getAggregatedValue()` helper

#### Widget Data Source Routing

Widgets automatically route to the correct data source based on metric:

| Metric | Data Source | Time Range? |
|--------|-------------|-------------|
| `power` | Live WebSocket | No (instantaneous) |
| `voltage` | Live WebSocket | No (instantaneous) |
| `current_load` | Live WebSocket | No (instantaneous) |
| `energy_usage` | REST API (DB) | Yes (24h/7d/30d/1y) |

The `WidgetConfigModal` conditionally hides the Time Range selector when a live metric is selected.

### 4.6 Firmware Timer Architecture

The ESP32 firmware runs two independent timers in the `NORMAL` state:

```cpp
// In loop() → case DeviceState::NORMAL:

// Timer 1: Live telemetry every 3 seconds
if (millis() - lastLiveTime >= LIVE_INTERVAL_MS) {
    // Build and publish voltage-grouped V/I/P payload
    MqttClient::publishLive(mac, livePayload);
}

// Timer 2: Energy accumulation every 60 seconds  
if (millis() - lastTelemetryTime >= ENERGY_INTERVAL_MS) {
    // Build and publish voltage-grouped energy_wh/avg_power_w payload
    MqttClient::publishEnergy(mac, energyPayload);
}
```

Configuration constants in `config.h`:
```cpp
#define LIVE_INTERVAL_MS         3000    // 3 seconds
#define ENERGY_INTERVAL_MS       60000   // 60 seconds
#define NUM_VOLTAGE_CHANNELS     3
#define NUM_CURRENT_CHANNELS     7
```

### 4.7 Dynamic Channel Discovery

When the backend receives an energy packet with a channel ID that doesn't have a corresponding `Breaker` record, it automatically creates one. This supports adding new CT sensors to a device without backend configuration — the firmware simply starts sending data for the new channel, and the backend auto-discovers it.

Missing historical data for newly added channels is treated as 0 in all aggregations.
