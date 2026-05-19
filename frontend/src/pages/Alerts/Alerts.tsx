import React from 'react';

interface AlertItem {
  id: number;
  type: string;
  source: string;
  time: string;
  desc: string;
  severity: 'high' | 'medium' | 'low';
}

const Alerts: React.FC = () => {
  const alerts: AlertItem[] = [
    { id: 1, type: 'High Current', source: 'Breaker 4', time: '10 mins ago', desc: 'Current exceeded 30A threshold (Live: 35A)', severity: 'high' },
    { id: 2, type: 'Comm Failure', source: 'SEN-TEMP-01', time: '1 hour ago', desc: 'Node unresponsive for > 5 mins', severity: 'medium' },
    { id: 3, type: 'Unusual Activity', source: 'Breaker 2', time: 'Yesterday', desc: 'Lights left ON after 10 PM', severity: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Alerts & Diagnostics</h1>
        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-sm border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-700">Alert Settings</button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/30">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Active Alerts</h2>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 flex items-start space-x-4 hover:bg-slate-100 dark:hover:bg-slate-800/20">
              <div className="mt-1">
                {alert.severity === 'high' && <span className="text-rose-500 text-xl">⚠️</span>}
                {alert.severity === 'medium' && <span className="text-amber-500 text-xl">⚡</span>}
                {alert.severity === 'low' && <span className="text-blue-500 text-xl">ℹ️</span>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{alert.type} - {alert.source}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-500">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{alert.desc}</p>
                <div className="mt-3 space-x-2">
                  <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded hover:bg-slate-200 dark:hover:bg-slate-700">Acknowledge</button>
                  <button className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-800 text-xs rounded hover:bg-blue-900/50">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Threshold Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">Global Overcurrent Limit</span>
              <span className="text-sm text-slate-500 dark:text-slate-500">50 A</span>
            </div>
            <input type="range" className="w-full accent-blue-500" />
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">Voltage Drop Alert</span>
              <span className="text-sm text-slate-500 dark:text-slate-500">&lt; 200 V</span>
            </div>
            <input type="range" className="w-full accent-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
