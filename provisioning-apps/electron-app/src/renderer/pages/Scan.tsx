import React, { useState, useEffect, useCallback } from 'react';

interface ScanProps {
  onDeviceSelect: (device: { id: string; name: string; mac: string; rssi: number }) => void;
}

interface Device {
  id: string;
  name: string;
  mac: string;
  rssi: number;
}

const Scan: React.FC<ScanProps> = ({ onDeviceSelect }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  const startScan = useCallback(async () => {
    setDevices([]);
    setScanning(true);

    if (window.electronAPI) {
      window.electronAPI.ble.onDeviceFound((device: Device) => {
        setDevices((prev) => {
          if (prev.find((d) => d.id === device.id)) return prev;
          return [...prev, device];
        });
      });
      await window.electronAPI.ble.startScan();
    } else {
      // Dev simulation
      setTimeout(() => setDevices([
        { id: 'dev-1', name: 'PP-Setup-A1B2', mac: 'AA:BB:CC:DD:A1:B2', rssi: -42 },
        { id: 'dev-2', name: 'PP-Setup-C3D4', mac: 'AA:BB:CC:DD:C3:D4', rssi: -58 },
      ]), 2000);
    }
  }, []);

  const stopScan = useCallback(async () => {
    setScanning(false);
    if (window.electronAPI) {
      await window.electronAPI.ble.stopScan();
      window.electronAPI.ble.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    startScan();
    return () => { stopScan(); };
  }, []);

  const handleConnect = async (device: Device) => {
    setConnecting(device.id);
    if (window.electronAPI) {
      await window.electronAPI.ble.stopScan();
      const result = await window.electronAPI.ble.connect(device.id);
      if (result.success) {
        onDeviceSelect(device);
      }
    } else {
      await new Promise((r) => setTimeout(r, 1500));
      onDeviceSelect(device);
    }
    setConnecting(null);
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return { bars: 4, color: 'text-emerald-400', label: 'Excellent' };
    if (rssi > -60) return { bars: 3, color: 'text-blue-400', label: 'Good' };
    if (rssi > -70) return { bars: 2, color: 'text-amber-400', label: 'Fair' };
    return { bars: 1, color: 'text-red-400', label: 'Weak' };
  };

  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Scanning for Devices</h2>
        <p className="text-slate-400 text-sm">Looking for PowerPulse devices in BLE range...</p>
      </div>

      {/* Scanning Animation */}
      {scanning && (
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-4 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDelay: '0.6s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Device List */}
      <div className="space-y-3">
        {devices.map((device) => {
          const signal = getSignalStrength(device.rssi);
          const isConnecting = connecting === device.id;
          return (
            <div
              key={device.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{device.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{device.mac}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Signal Strength */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5 items-end h-4">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 rounded-full transition-all ${
                            bar <= signal.bars ? signal.color.replace('text-', 'bg-') : 'bg-slate-700'
                          }`}
                          style={{ height: `${bar * 25}%` }}
                        />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${signal.color}`}>{signal.label}</span>
                  </div>

                  <button
                    onClick={() => handleConnect(device)}
                    disabled={isConnecting}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      'Connect'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {!scanning && devices.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg mb-2">No devices found</p>
            <p className="text-sm mb-4">Make sure your PowerPulse device is powered on and in setup mode</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={scanning ? stopScan : startScan}
          className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
            scanning
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
          }`}
        >
          {scanning ? 'Stop Scanning' : 'Rescan'}
        </button>
      </div>
    </div>
  );
};

export default Scan;
