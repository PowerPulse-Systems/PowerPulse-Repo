import React, { useState, useEffect } from 'react';
import { Widget, WidgetMetric, WidgetSize, WidgetType, isLiveMetric } from '../../types/dashboard';
import { X } from 'lucide-react';
import { devicesApi } from '../../services/api';

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
  const [timePreset, setTimePreset] = useState('24h');

  // Multi-Device & Channel Checkbox States
  const [devices, setDevices] = useState<any[]>([]); // All user claimed devices
  const [activeDeviceId, setActiveDeviceId] = useState<string>(''); // Currently focused device ID on the left
  const [selectedBreakerIds, setSelectedBreakerIds] = useState<string[]>([]); // Globally selected channel IDs

  useEffect(() => {
    if (isOpen) {
      // 1. Fetch user devices
      devicesApi.getMyDevices()
        .then(res => {
          setDevices(res.data);
          
          if (initialWidget) {
            setTitle(initialWidget.title);
            setMetric(initialWidget.metric);
            setType(initialWidget.type);
            setSize(initialWidget.size);
            setTimePreset(initialWidget.timePreset || '24h');
            setSelectedBreakerIds(initialWidget.breakers || []);
            
            // Set focused device to first device with selected breakers or first available
            if (res.data.length > 0) {
              const savedBreaker = initialWidget.breakers?.[0];
              const matchingDevice = res.data.find((d: any) => 
                d.breakers?.some((b: any) => b.id === savedBreaker)
              );
              setActiveDeviceId(matchingDevice ? matchingDevice.id : res.data[0].id);
            }
          } else {
            setTitle('');
            setMetric('energy_usage');
            setType('card');
            setSize('small');
            setTimePreset('24h');
            
            if (res.data.length > 0) {
              setActiveDeviceId(res.data[0].id);
              // Default to selecting all channels for all devices
              const allBreakerIds = res.data.flatMap((d: any) => d.breakers?.map((b: any) => b.id) || []);
              setSelectedBreakerIds(allBreakerIds);
            } else {
              setSelectedBreakerIds([]);
            }
          }
        })
        .catch(err => {
          console.error("Error loading user devices in config modal:", err);
        });
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
      breakers: selectedBreakerIds,
      aggregation: initialWidget?.aggregation || 'sum',
      position: initialWidget?.position || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {initialWidget ? 'Edit Widget' : 'Add Widget'}
          </h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Widget Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Master Building Load"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Configure Monitored Devices & Channels
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-950/20">
              
              {/* Left Panel: Devices Checklist */}
              <div className="space-y-2 md:border-r border-slate-200 dark:border-slate-800 md:pr-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">1. Monitored Devices</span>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {devices.map(device => {
                    const deviceBreakerIds = device.breakers?.map((b: any) => b.id) || [];
                    const checkedCount = device.breakers?.filter((b: any) => selectedBreakerIds.includes(b.id)).length || 0;
                    const isFullyChecked = checkedCount === device.breakers?.length && device.breakers?.length > 0;
                    const isPartiallyChecked = checkedCount > 0 && checkedCount < device.breakers?.length;
                    
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
                                const toAdd = deviceBreakerIds.filter((id: string) => !selectedBreakerIds.includes(id));
                                setSelectedBreakerIds([...selectedBreakerIds, ...toAdd]);
                              } else {
                                setSelectedBreakerIds(selectedBreakerIds.filter(id => !deviceBreakerIds.includes(id)));
                              }
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {device.name || `Device (${device.macAddress})`}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {checkedCount} of {device.breakers?.length || 0} channels active
                            </span>
                          </div>
                        </label>
                        <span className="text-slate-400 text-xs">➔</span>
                      </div>
                    );
                  })}
                  {devices.length === 0 && (
                    <span className="text-xs text-slate-500 italic block p-2">
                      No active devices found. Please register devices first.
                    </span>
                  )}
                </div>
              </div>

              {/* Right Panel: Focused Device's Channels Selector */}
              <div className="space-y-2 md:pl-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  2. Channels for: {devices.find(d => d.id === activeDeviceId)?.name || "Selected Device"}
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto p-1">
                  {(() => {
                    const activeDevice = devices.find(d => d.id === activeDeviceId);
                    if (!activeDevice) return <span className="text-xs text-slate-500 italic">Select a device from the left...</span>;
                    if (!activeDevice.breakers || activeDevice.breakers.length === 0) {
                      return <span className="text-xs text-slate-500 italic">No channels discovered on this device.</span>;
                    }
                    
                    return activeDevice.breakers.map((breaker: any) => {
                      const isChecked = selectedBreakerIds.includes(breaker.id);
                      return (
                        <label key={breaker.id} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
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
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800 dark:text-slate-200">{breaker.label || `Channel ${breaker.channelIndex}`}</span>
                            <span className="text-[9px] text-slate-400">Index: {breaker.channelIndex}</span>
                          </div>
                        </label>
                      );
                    });
                  })()}
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Measurement Type
                {isLiveMetric(metric) && (
                  <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                )}
                {!isLiveMetric(metric) && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    HISTORICAL
                  </span>
                )}
              </label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as WidgetMetric)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="energy_usage">Energy Usage (Wh)</option>
                <option value="power">Power (W)</option>
                <option value="current_load">Current (A)</option>
                <option value="voltage">Voltage (V)</option>
                <option value="power_factor">Power Factor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as WidgetSize)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small (1/3 Grid)</option>
                <option value="medium">Medium (2/3 Grid)</option>
                <option value="large">Large (Full Grid)</option>
              </select>
            </div>

            {!isLiveMetric(metric) ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time Range Preset</label>
                <select
                  value={timePreset}
                  onChange={(e) => setTimePreset(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">Last 24 Hours (24h)</option>
                  <option value="7d">Last 7 Days (7d)</option>
                  <option value="30d">Last 30 Days (30d)</option>
                  <option value="1y">Last 1 Year (1y)</option>
                </select>
              </div>
            ) : (
              <div className="flex items-end pb-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                  Real-time data — updates every ~3 seconds via WebSocket
                </span>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedBreakerIds.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-55 disabled:cursor-not-allowed"
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
