import React from 'react';

interface SuccessProps {
  device: { id: string; name: string; mac: string };
  onAddAnother: () => void;
}

const Success: React.FC<SuccessProps> = ({ device, onAddAnother }) => {
  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      {/* Animated Checkmark */}
      <div className="w-24 h-24 mx-auto mb-8 bg-emerald-500/10 border-2 border-emerald-400 rounded-full flex items-center justify-center animate-bounce">
        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">Device Provisioned!</h2>
      <p className="text-slate-400 mb-8">Your PowerPulse device is connected and ready to monitor energy usage.</p>

      {/* Device Summary */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 mb-8 text-left">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Device Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">Device</span>
            <span className="text-white text-sm font-medium">{device.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">MAC Address</span>
            <span className="text-white text-sm font-mono">{device.mac}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">Status</span>
            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" /> Online
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => window.electronAPI?.app.openExternal('http://localhost:5173/dashboard')}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
        >
          Open Dashboard →
        </button>
        <button
          onClick={onAddAnother}
          className="w-full py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
        >
          + Add Another Device
        </button>
      </div>
    </div>
  );
};

export default Success;
