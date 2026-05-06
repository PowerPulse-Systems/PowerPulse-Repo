import React, { useState } from 'react';

const DeviceSetup: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Gateway Setup Wizard</h1>
      <p className="text-slate-400">Configure your main ESP32 gateway and breakers.</p>

      <div className="flex space-x-2 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded ${step >= i ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-sm min-h-[400px] flex flex-col">
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Step 1: Device Detection</h2>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Scanning for ESP32 gateway...</p>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">Step 2: WiFi Configuration</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-slate-400 mb-1">WiFi SSID</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" placeholder="Network Name" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Password</label>
                <input type="password" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" placeholder="••••••••" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">Step 3: Backend Connection</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-slate-400 mb-1">MQTT Broker URL</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="mqtt://broker.hivemq.com" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Device ID</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="ESP_MAIN_01" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">Step 4: Breaker Count</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Number of Monitored Breakers</label>
                <input type="number" min="1" max="24" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="4" />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">Step 5: Breaker Naming</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((b) => (
                <div key={b} className="flex items-center space-x-4">
                  <div className="text-slate-400 w-24">Breaker {b}</div>
                  <input type="text" className="flex-1 px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" placeholder={`E.g. Main AC, Lighting ${b}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">Step 6: Calibration</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Voltage Calibration Factor</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="220.5" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">CT Sensor Ratio</label>
                <input type="number" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="100" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between">
          <button 
            disabled={step === 1} 
            onClick={() => setStep(step - 1)} 
            className="px-6 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 disabled:opacity-50"
          >
            Back
          </button>
          <button 
            onClick={() => step < 6 ? setStep(step + 1) : alert('Setup Complete!')} 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold"
          >
            {step === 6 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceSetup;