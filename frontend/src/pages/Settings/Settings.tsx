import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-100">Settings & Automations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account & System */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">System Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Timezone</label>
                <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                  <option>UTC (GMT+0)</option>
                  <option>EST (GMT-5)</option>
                  <option>PST (GMT-8)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Data Retention</label>
                <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">MQTT Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Broker URL</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="mqtt://internal-broker:1883" />
              </div>
              <button className="px-4 py-2 bg-slate-800 text-sm border border-slate-700 rounded hover:bg-slate-700">Test Connection</button>
            </div>
          </div>
        </div>

        {/* Automation Rules */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-semibold">Automation Rules</h2>
            <button className="text-blue-400 text-sm hover:text-blue-300">+ Add Rule</button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-slate-700 bg-slate-800/30 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-slate-200">Auto-Off AC</span>
                <input type="checkbox" defaultChecked className="toggle-checkbox" />
              </div>
              <p className="text-sm text-slate-400">If <span className="text-blue-400">Motion Sensor</span> is Inactive for <span className="text-emerald-400">30 mins</span>, Turn OFF <span className="text-amber-400">Main AC</span>.</p>
            </div>
            
            <div className="p-4 border border-slate-700 bg-slate-800/30 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-slate-200">Overload Protection</span>
                <input type="checkbox" defaultChecked className="toggle-checkbox" />
              </div>
              <p className="text-sm text-slate-400">If <span className="text-blue-400">Total Load</span> &gt; <span className="text-emerald-400">45 kW</span>, Send <span className="text-rose-400">Critical Alert</span>.</p>
            </div>
            
            <div className="p-4 border border-slate-700 bg-slate-800/30 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-slate-200">Night Mode</span>
                <input type="checkbox" className="toggle-checkbox" />
              </div>
              <p className="text-sm text-slate-400">At <span className="text-blue-400">22:00</span>, Turn OFF <span className="text-amber-400">All Office Lights</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;