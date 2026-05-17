import React, { useState, useEffect } from 'react';
import { Widget, WidgetMetric, WidgetSize, WidgetType } from '../../types/dashboard';
import { X } from 'lucide-react';

interface WidgetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (widget: Widget) => void;
  initialWidget?: Widget;
}

const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialWidget,
}) => {
  const [title, setTitle] = useState('');
  const [metric, setMetric] = useState<WidgetMetric>('energy_usage');
  const [type, setType] = useState<WidgetType>('card');
  const [size, setSize] = useState<WidgetSize>('small');
  const [timePreset, setTimePreset] = useState('today');

  useEffect(() => {
    if (initialWidget) {
      setTitle(initialWidget.title);
      setMetric(initialWidget.metric);
      setType(initialWidget.type);
      setSize(initialWidget.size);
      setTimePreset(initialWidget.timePreset || 'today');
    } else {
      setTitle('');
      setMetric('energy_usage');
      setType('card');
      setSize('small');
      setTimePreset('today');
    }
  }, [initialWidget, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...initialWidget,
      title,
      metric,
      type,
      size,
      timePreset,
      breakers: initialWidget?.breakers || [],
      aggregation: initialWidget?.aggregation || 'sum',
      position: initialWidget?.position || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {initialWidget ? 'Edit Widget' : 'Add Widget'}
          </h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Total Energy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as WidgetMetric)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="energy_usage">Energy Usage (kWh)</option>
              <option value="current_load">Current Load (W)</option>
              <option value="voltage">Voltage (V)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as WidgetSize)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small (1/3 Width)</option>
                <option value="medium">Medium (2/3 Width)</option>
                <option value="large">Large (Full Width)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time Range</label>
              <select
                value={timePreset}
                onChange={(e) => setTimePreset(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="last_24_hours">Last 24 Hours</option>
                <option value="this_week">This Week</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              {initialWidget ? 'Update' : 'Add'} Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetConfigModal;
