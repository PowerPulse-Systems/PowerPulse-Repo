import React, { useState } from 'react';

interface NodeDevice {
  id: string;
  mac: string;
  status: 'pending' | 'paired';
}

const SwitchNodePairing: React.FC = () => {
  const [nodes] = useState<NodeDevice[]>([
    { id: 'SW-A1', mac: 'A1:B2:C3:D4', status: 'pending' },
    { id: 'SW-B2', mac: 'F1:E2:D3:C4', status: 'paired' },
  ]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Switch Node Pairing</h1>
      <p className="text-slate-400">Discover and configure remote control relays (Switches, AC IR nodes).</p>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Discovered Nodes</h2>
          <button className="px-4 py-2 bg-slate-800 text-sm border border-slate-700 rounded hover:bg-slate-700">Scan Again</button>
        </div>
        
        <div className="space-y-3">
          {nodes.map(node => (
            <div key={node.id} className="flex items-center justify-between p-3 border border-slate-800 rounded bg-slate-950">
              <div>
                <div className="font-medium text-slate-200">{node.id} <span className="text-xs text-slate-500 ml-2 font-mono">{node.mac}</span></div>
              </div>
              <div>
                {node.status === 'pending' ? (
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500">Configure</button>
                ) : (
                  <span className="text-emerald-500 text-sm font-medium">Paired ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4 border-b border-slate-800 pb-2">Configure Node: SW-A1</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Device Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" placeholder="e.g. Office Light" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Room / Location</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200" placeholder="Office 101" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Device Type</label>
              <select className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded text-slate-200">
                <option>Light Relay</option>
                <option>AC (IR Emitter)</option>
                <option>Fan</option>
                <option>Generic Relay</option>
              </select>
            </div>
          </div>
          
          <div className="bg-slate-950 p-4 rounded border border-slate-800 flex flex-col justify-center items-center">
            <div className="text-slate-400 text-sm mb-4">Test Control</div>
            <div className="flex space-x-4">
              <button className="w-24 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500">ON</button>
              <button className="w-24 py-2 bg-rose-600 text-white rounded font-bold hover:bg-rose-500">OFF</button>
            </div>
            <div className="mt-8 w-full">
              <button className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-500">Save Configuration</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchNodePairing;