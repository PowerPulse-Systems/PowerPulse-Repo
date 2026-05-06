import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Analytics & Insights</h1>
      
      {/* Insight Banner */}
      <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl flex items-start space-x-4">
        <div className="text-2xl">💡</div>
        <div>
          <h3 className="font-semibold text-blue-400">Efficiency Insight</h3>
          <p className="text-sm text-slate-300 mt-1">Breaker 4 (Warehouse Motors) consumes 35% of total load. Scheduling operation during off-peak hours could reduce costs by 15%.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Usage Graph */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm h-80 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-100">Monthly Usage (per breaker)</h2>
            <select className="bg-slate-950 border border-slate-700 text-xs rounded px-2 py-1 text-slate-300">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex-1 border border-slate-800 rounded bg-slate-800/50 flex items-center justify-center text-slate-500">
            [ Stacked Bar Chart ]
          </div>
        </div>

        {/* Peak Usage Times */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm h-80 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Peak Usage Heatmap</h2>
          <div className="flex-1 border border-slate-800 rounded bg-slate-800/50 flex items-center justify-center text-slate-500">
            [ Heatmap Visualization ]
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Historical Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <div className="text-xs text-slate-400">Today vs Yesterday</div>
            <div className="text-xl font-bold text-rose-500 mt-1">+12.4%</div>
          </div>
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <div className="text-xs text-slate-400">This Week vs Last Week</div>
            <div className="text-xl font-bold text-emerald-500 mt-1">-4.2%</div>
          </div>
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <div className="text-xs text-slate-400">This Month vs Last Month</div>
            <div className="text-xl font-bold text-emerald-500 mt-1">-1.5%</div>
          </div>
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <div className="text-xs text-slate-400">Avg Cost / Day</div>
            <div className="text-xl font-bold text-slate-200 mt-1">$45.20</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;