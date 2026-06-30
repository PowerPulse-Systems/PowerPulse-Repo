import React, { useEffect, useState, useMemo } from 'react';
import { Widget, isLiveMetric } from '../../../types/dashboard';
import api from '../../../services/api';
import { useLiveTelemetry } from '../../../hooks/useLiveTelemetry';
import { devicesApi } from '../../../services/api';
import { Activity, Zap, TrendingUp, Gauge } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface StatCardWidgetProps {
  widget: Widget;
  deviceId: string;
}

const StatCardWidget: React.FC<StatCardWidgetProps> = ({ widget, deviceId }) => {
  const [historicalData, setHistoricalData] = useState<{ value: number; unit: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceMacs, setDeviceMacs] = useState<string[]>([]);
  const [channelIds, setChannelIds] = useState<number[]>([]);

  const isLive = isLiveMetric(widget.metric);

  // Resolve breaker IDs → device MAC addresses and channel indices
  useEffect(() => {
    if (!isLive || !widget.breakers || widget.breakers.length === 0) return;

    devicesApi.getMyDevices().then(res => {
      const macs = new Set<string>();
      const chIds: number[] = [];

      for (const device of res.data) {
        for (const breaker of device.breakers || []) {
          if (widget.breakers.includes(breaker.id)) {
            macs.add(device.macAddress);
            chIds.push(breaker.channelIndex);
          }
        }
      }

      setDeviceMacs(Array.from(macs));
      setChannelIds(chIds);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [widget.breakers, isLive]);

  // Subscribe to live WebSocket data for the resolved MAC addresses
  const { getAggregatedValue, connected } = useLiveTelemetry(isLive ? deviceMacs : []);

  // Compute live value from WebSocket stream
  const liveValue = useMemo(() => {
    if (!isLive || deviceMacs.length === 0) return null;

    let metric: 'power' | 'voltage' | 'current' = 'power';
    let unit = 'W';

    if (widget.metric === 'voltage') {
      metric = 'voltage';
      unit = 'V';
    } else if (widget.metric === 'current_load') {
      metric = 'current';
      unit = 'A';
    } else if (widget.metric === 'power_factor') {
      metric = 'power_factor';
      unit = '';
    }

    const value = getAggregatedValue(channelIds, deviceMacs, metric);
    return { value, unit };
  }, [isLive, deviceMacs, channelIds, widget.metric, getAggregatedValue]);

  // Historical polling (only for energy_usage)
  useEffect(() => {
    if (isLive) return;

    const fetchValue = async () => {
      try {
        const res = await api.post('/widgets/value', {
          deviceId,
          metric: widget.metric,
          breakers: widget.breakers,
          aggregation: widget.aggregation,
          timePreset: widget.timePreset,
        });
        setHistoricalData(res.data);
      } catch (error) {
        console.error('Failed to fetch widget data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValue();
    // Relaxed polling for historical — data only updates every 60s
    const interval = setInterval(fetchValue, 60000);
    return () => clearInterval(interval);
  }, [widget, deviceId, isLive]);

  const data = isLive ? liveValue : historicalData;

  const getIcon = () => {
    switch (widget.metric) {
      case 'energy_usage': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'current_load': return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'power': return <Gauge className="w-5 h-5 text-violet-500" />;
      case 'voltage': return <TrendingUp className="w-5 h-5 text-amber-500" />;
      case 'power_factor': return <Activity className="w-5 h-5 text-teal-500" />;
      default: return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  const getFormattedValue = () => {
    if (loading || !data) return '---';
    if (widget.metric === 'power_factor') {
      return data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return data.value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };

  return (
    <div className={cn(
      "h-full w-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all",
      widget.size === 'small' ? 'p-4' : 'p-6'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
            {widget.title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {getFormattedValue()}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {data?.unit}
            </span>
          </div>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
          {getIcon()}
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
        {isLive ? (
          <span className="flex items-center gap-1.5">
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              connected ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
            )} />
            {connected ? 'Live' : 'Connecting...'}
          </span>
        ) : (
          widget.timePreset && (
            <span className="truncate">
              {widget.timePreset.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default StatCardWidget;
