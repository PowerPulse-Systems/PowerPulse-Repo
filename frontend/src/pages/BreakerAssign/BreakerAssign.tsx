import React from 'react';

const BreakerAssign: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Breaker Assignment</h1>
      <p className="text-slate-400 mb-6">Map physical breakers to logical labels and rooms.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Panel Viz */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Physical Panel</h2>
          <div className="grid grid-cols-2 gap-2 mt-4 bg-slate-950 p-4 rounded border border-slate-800">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex border border-slate-700 bg-slate-800 rounded cursor-pointer hover:border-blue-500">
                <div className="bg-slate-700 w-8 flex items-center justify-center font-mono text-xs">{i}</div>
                <div className="p-2 text-sm flex-1 text-slate-300 truncate">Breaker {i}</div>
                <div className={`w-2 ${i <= 4 ? 'bg-emerald-500' : 'bg-slate-600'} rounded-r`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Assignment Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Assignment Details (Breaker 1)</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Breaker Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="Main AC" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Room / Zone</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" defaultValue="Server Room" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Device Type</label>
              <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                <option>HVAC</option>
                <option>Lighting</option>
                <option>Outlets</option>
                <option>Motors/Pumps</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Phase</label>
              <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                <option>L1</option>
                <option>L2</option>
                <option>L3</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-slate-400">Live Reading:</span>
                <span className="font-mono text-emerald-400">15.2 A / 220 V</span>
              </div>
              <button type="button" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold">Save Assignment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BreakerAssign;