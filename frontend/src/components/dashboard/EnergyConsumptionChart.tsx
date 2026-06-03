import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', energy: 120 },
  { time: '04:00', energy: 90 },
  { time: '08:00', energy: 210 },
  { time: '12:00', energy: 380 },
  { time: '16:00', energy: 410 },
  { time: '20:00', energy: 290 },
  { time: '23:59', energy: 150 },
];

export const EnergyConsumptionChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Overall Energy Consumption</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Daily usage across all connected devices (Wh)</p>
        </div>
      </div>
      <div className="w-full mt-4">
        {/* We use a strict height so Recharts won't collapse to 0 */}
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.5} />
              
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
                dy={10} 
                label={{ value: 'Time', position: 'insideBottom', offset: -15, fill: '#64748b' }}
              />
              
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                dx={-10}
                label={{ value: 'Energy Consumption', angle: -90, position: 'insideLeft', offset: -10, fill: '#64748b' }}
              />
              
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#f8fafc',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
              />
              
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
