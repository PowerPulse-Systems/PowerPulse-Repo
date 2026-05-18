export type WidgetType = 'card' | 'graph' | 'alerts';
export type WidgetMetric = 'energy_usage' | 'current_load' | 'power' | 'voltage';
export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

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
