import React, { useEffect, useState } from 'react';
import { X, Zap, Activity } from 'lucide-react';
import { energyApi } from '../../services/api';

interface EnergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  breakerId?: string;
  breakerName?: string;
}

const EnergyModal: React.FC<EnergyModalProps> = ({ isOpen, onClose, breakerId, breakerName }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && breakerId) {
      setLoading(true);
      energyApi.getSummary(breakerId)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load energy summary", err);
          setLoading(false);
        });
    } else {
      setData(null);
    }
  }, [isOpen, breakerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Energy Readings</h2>
              <p className="text-xs font-medium text-slate-500">{breakerName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : !data ? (
            <div className="text-center p-8 text-slate-500">Failed to load data</div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Energy (24h)</h3>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-end gap-1">
                       {data.totalEnergy ? (data.totalEnergy / 1000).toFixed(3) : 0} <span className="text-sm font-medium text-slate-500 mb-1">kWh</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Readings</h3>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-end gap-1">
                       {data.numberOfReadings || 0} <span className="text-sm font-medium text-slate-500 mb-1">logs</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Latest Peak Power</h3>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-end gap-1">
                       {data.peakPower || 0} <span className="text-sm font-medium text-slate-500 mb-1">W</span>
                    </div>
                 </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" /> Recent Raw Logs (MQTT Payload Data)
                </h3>
                
                {data.readings && data.readings.length > 0 ? (
                  <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                        <tr>
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Time</th>
                          <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-right">Energy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.readings.slice(-30).reverse().map((r: any) => (
                          <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                               {(r.periodEnd || r.periodStart) ? new Date(r.periodEnd * 1000).toLocaleTimeString() : new Date(r.createdAt).toLocaleTimeString()}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="font-bold text-slate-900 dark:text-white">{(r.energyWh / 1000).toFixed(3)}</span> 
                              <span className="text-slate-500 text-xs ml-1">kWh</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 border border-slate-100 dark:border-slate-800 border-dashed">
                    No raw energy telemetry received from ESP yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyModal;