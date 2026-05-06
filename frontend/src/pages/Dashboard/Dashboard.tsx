import React from 'react';

interface Breaker {
  id: number;
  name: string;
  current: string;
  voltage: string;
  status: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const breakers: Breaker[] = [
    { id: 1, name: 'Main AC', current: '15.2A', voltage: '220V', status: 'Normal', color: 'text-emerald-500' },
    { id: 2, name: 'Lighting Floor 1', current: '4.1A', voltage: '220V', status: 'Normal', color: 'text-emerald-500' },
    { id: 3, name: 'Server Room', current: '22.5A', voltage: '218V', status: 'Warning', color: 'text-amber-500' },
    { id: 4, name: 'Warehouse Motors', current: '35.0A', voltage: '215V', status: 'Overload', color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">System Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <div className="text-slate-400 text-sm mb-1">Current Load</div>
          <div className="text-3xl font-bold text-blue-400">45.2 kW</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <div className="text-slate-400 text-sm mb-1">Today's Usage</div>
          <div className="text-3xl font-bold text-emerald-400">312 kWh</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <div className="text-slate-400 text-sm mb-1">Monthly Usage</div>
          <div className="text-3xl font-bold text-amber-400">4,250 kWh</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Graph Placeholder */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Real-Time Power Draw</h2>
          <div className="flex-1 border border-slate-800 rounded bg-slate-800/50 flex items-center justify-center text-slate-500">
            [ Live Chart Visualization ]
          </div>
        </div>

        {/* Top Consumers */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Top Consumers</h2>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Server Room</span>
              <span className="font-mono text-amber-400">42%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-amber-400 h-2 rounded-full" style={{width: '42%'}}></div></div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-slate-300">Main AC</span>
              <span className="font-mono text-blue-400">35%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-blue-400 h-2 rounded-full" style={{width: '35%'}}></div></div>
          </div>
        </div>
      </div>

      {/* Breaker Overview Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-slate-100">Breaker Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Breaker Name</th>
                <th className="px-6 py-3 font-medium">Current Draw</th>
                <th className="px-6 py-3 font-medium">Voltage</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {breakers.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-slate-200">{b.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-300">{b.current}</td>
                  <td className="px-6 py-4 font-mono text-slate-300">{b.voltage}</td>
                  <td className={`px-6 py-4 font-semibold ${b.color}`}>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;