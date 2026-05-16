import React, { useState } from 'react';

interface ConfigureProps {
  device: { id: string; name: string; mac: string };
  onSubmit: (config: { ssid: string; password: string }) => void;
  onBack: () => void;
}

const Configure: React.FC<ConfigureProps> = ({ device, onSubmit, onBack }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ssid, password });
  };

  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Configure Device</h2>
        <p className="text-slate-400 text-sm">WiFi setup for <span className="text-blue-400 font-medium">{device.name}</span></p>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
        <p className="text-sm text-emerald-400">Connected to {device.name} <span className="text-slate-500 font-mono text-xs ml-1">{device.mac}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">WiFi SSID</label>
          <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} required
            className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            placeholder="Your WiFi network" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">WiFi Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pr-12"
              placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 border border-slate-700">← Back</button>
          <button type="submit" disabled={!ssid} className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/25 disabled:opacity-50">
            Start Provisioning →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Configure;
