export type WidgetType = 'card' | 'graph' | 'alerts';
export type WidgetMetric = 'energy_usage' | 'current_load' | 'power' | 'voltage' | 'power_factor';
export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

/** Metrics that use the live WebSocket stream (display-only, not stored) */
export const LIVE_METRICS: WidgetMetric[] = ['power', 'current_load', 'voltage', 'power_factor'];

/** Metrics that use historical REST API (stored in database) */
export const HISTORICAL_METRICS: WidgetMetric[] = ['energy_usage'];

/** Check if a metric uses the live WebSocket stream */
export function isLiveMetric(metric: WidgetMetric): boolean {
  return LIVE_METRICS.includes(metric);
}

export interface Widget {
  id?: string;
  dashboardId?: string;
  type: WidgetType;
  title: string;
  metric: WidgetMetric;
  breakers: string[];
  aggregation: string;
  timePreset?: string;
  customHours?: number;
  customStart?: string;
  customEnd?: string;
  size: WidgetSize;
  position: number;
  config?: any;
}

export interface Dashboard {
  id: string;
  deviceId: string;
  widgets: Widget[];
}

// ========================
// Live Telemetry Types
// ========================

export interface LiveChannelReading {
  id: number;
  i: number;   // Current RMS (A)
  p: number;   // Power (W)
  pf?: number; // Power Factor
}

export interface LiveVoltageChannel {
  id: number;
  v: number;   // Voltage RMS (V)
  ct: LiveChannelReading[];
}

export interface LivePayload {
  mac: string;
  voltage_channels: LiveVoltageChannel[];
  timestamp?: number;
}
