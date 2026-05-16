import React, { useState, useEffect } from 'react';

interface ProvisioningProps {
  device: { id: string; name: string; mac: string };
  wifiConfig: { ssid: string; password: string };
  authToken: string;
  onComplete: () => void;
  onError: () => void;
}

type StepStatus = 'pending' | 'active' | 'done' | 'error';

interface Step {
  label: string;
  status: StepStatus;
}

const Provisioning: React.FC<ProvisioningProps> = ({ device, wifiConfig, authToken, onComplete, onError }) => {
  const [steps, setSteps] = useState<Step[]>([
    { label: 'Sending configuration...', status: 'pending' },
    { label: 'Connecting to WiFi...', status: 'pending' },
    { label: 'Connecting to cloud...', status: 'pending' },
    { label: 'Registering device...', status: 'pending' },
    { label: 'Linking to account...', status: 'pending' },
  ]);
  const [error, setError] = useState('');

  const updateStep = (index: number, status: StepStatus) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, status } : s));
  };

  useEffect(() => {
    const runProvisioning = async () => {
      try {
        // Step 1: Send config via BLE
        updateStep(0, 'active');
        const payload = {
          wifi_ssid: wifiConfig.ssid,
          wifi_password: wifiConfig.password,
          backend_url: 'http://localhost:3000',
          device_id: device.id,
          mqtt_host: 'broker.hivemq.com',
          mqtt_port: 1883,
          mqtt_username: '',
          mqtt_password: '',
        };

        if (window.electronAPI) {
          window.electronAPI.ble.onStatusUpdate((data: { status: string }) => {
            if (data.status === 'RECEIVED') { updateStep(0, 'done'); updateStep(1, 'active'); }
            if (data.status === 'WIFI_CONNECTED') { updateStep(1, 'done'); updateStep(2, 'active'); }
            if (data.status === 'MQTT_CONNECTED') { updateStep(2, 'done'); }
            if (data.status === 'WIFI_FAILED') { updateStep(1, 'error'); setError('WiFi connection failed'); }
            if (data.status === 'MQTT_FAILED') { updateStep(2, 'error'); setError('MQTT connection failed'); }
          });
          await window.electronAPI.ble.provision(payload);
        } else {
          // Dev simulation
          for (let i = 0; i < 3; i++) {
            updateStep(i, 'active');
            await new Promise(r => setTimeout(r, 1500));
            updateStep(i, 'done');
          }
        }

        // Step 4: Register device
        updateStep(3, 'active');
        if (window.electronAPI) {
          await window.electronAPI.api.registerDevice(device.mac, 'breaker-node', '1.0.0');
        } else {
          await new Promise(r => setTimeout(r, 1000));
        }
        updateStep(3, 'done');

        // Step 5: Claim device
        updateStep(4, 'active');
        if (window.electronAPI) {
          await window.electronAPI.api.claimDevice(device.id);
        } else {
          await new Promise(r => setTimeout(r, 1000));
        }
        updateStep(4, 'done');

        setTimeout(onComplete, 1000);
      } catch (err: any) {
        setError(err.message || 'Provisioning failed');
      }
    };

    runProvisioning();
    return () => { if (window.electronAPI) window.electronAPI.ble.removeAllListeners(); };
  }, []);

  const icon = (status: StepStatus) => {
    if (status === 'done') return <span className="text-emerald-400">✓</span>;
    if (status === 'error') return <span className="text-red-400">✗</span>;
    if (status === 'active') return (
      <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    );
    return <span className="text-slate-600">○</span>;
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Provisioning Device</h2>
        <p className="text-slate-400 text-sm">{device.name} → {wifiConfig.ssid}</p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
        {steps.map((step, i) => (
          <div key={i} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
            step.status === 'active' ? 'bg-blue-500/5 border border-blue-500/20' : ''
          }`}>
            <div className="w-6 h-6 flex items-center justify-center">{icon(step.status)}</div>
            <span className={`text-sm ${step.status === 'done' ? 'text-emerald-400' : step.status === 'error' ? 'text-red-400' : step.status === 'active' ? 'text-white' : 'text-slate-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <button onClick={onError} className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 text-sm">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default Provisioning;
