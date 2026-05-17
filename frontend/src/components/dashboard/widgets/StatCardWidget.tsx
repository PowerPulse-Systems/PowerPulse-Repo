import React, { useEffect, useState } from 'react';
import { Widget } from '../../../types/dashboard';
import api from '../../../services/api';
import { Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface StatCardWidgetProps {
  widget: Widget;
  deviceId: string;
}

const StatCardWidget: React.FC<StatCardWidgetProps> = ({ widget, deviceId }) => {
  const [data, setData] = useState<{ value: number; unit: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const res = await api.post('/widgets/value', {
          deviceId,
          metric: widget.metric,
          breakers: widget.breakers,
          aggregation: widget.aggregation,
          timePreset: widget.timePreset,
        });
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch widget data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValue();
    const interval = setInterval(fetchValue, parseInt(import.meta.env.VITE_WIDGET_REFRESH_MS || '5000'));
    return () => clearInterval(interval);
  }, [widget, deviceId]);

  const getIcon = () => {
    switch (widget.metric) {
      case 'energy_usage': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'current_load': return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'voltage': return <TrendingUp className="w-5 h-5 text-amber-500" />;
      default: return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  const getFormattedValue = () => {
    if (loading || !data) return '---';
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
      
      {widget.timePreset && (
        <div className="mt-auto pt-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate">
            {widget.timePreset.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCardWidget;
