import React from 'react';

const SensorNodePairing: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sensor Node Pairing</h1>
      <p className="text-slate-400">Register environmental and occupancy sensors.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Discovered Sensors</h2>
            <button className="px-3 py-1 bg-slate-800 text-sm border border-slate-700 rounded">Scan</button>
          </div>
          <div className="p-4 border border-slate-700 bg-slate-800/30 rounded flex justify-between items-center cursor-pointer border-blue-500">
            <div>
              <div className="font-medium">SEN-TEMP-01</div>
              <div className="text-xs text-slate-500 font-mono">MAC: AA:BB:CC:DD</div>
            </div>
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Sensor Configuration</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Sensor Type</label>
              <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                <option>Temperature & Humidity</option>
                <option>Motion / Occupancy</option>
                <option>Door / Window Contact</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Link to Breaker / Device (Optional)</label>
              <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                <option>None</option>
                <option>Breaker 1 (Main AC)</option>
                <option>SW-A1 (Office Light)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Sampling Interval (seconds)</label>
              <input type="number" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="60" />
            </div>

            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm flex justify-between items-center">
              <span className="text-slate-400">Live Data:</span>
              <span className="font-mono text-blue-400">24.5°C / 45% RH</span>
            </div>

            <button type="button" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold mt-4">Register Sensor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SensorNodePairing;