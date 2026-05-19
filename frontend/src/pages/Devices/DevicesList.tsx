import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { devicesApi } from '../../services/api';
import { Server, Activity, Plus, Trash2 } from 'lucide-react';
import AddDeviceModal from '../../components/ui/AddDeviceModal';

const DevicesList: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await devicesApi.getMyDevices();
        setDevices(res.data);
      } catch (err) {
        console.error("Failed to fetch devices", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this device? This will also delete all associated energy readings and settings. This cannot be undone.")) return;
    
    try {
      await devicesApi.deleteDevice(id);
      setDevices(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error("Failed to delete device", err);
      alert("Failed to delete device.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Server className="text-blue-500" /> My Devices
          </h1>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Manage and configure your PowerPulse hardware</p>
        </div>
        <button 
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add Device
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : devices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500">
          <Server className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg">No devices found</p>
          <p className="text-sm mt-2">Click "Add Device" to register your first hardware.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {devices.map(device => (
            <div 
              key={device.id}
              onClick={() => navigate(`/devices/${device.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${device.onlineStatus ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:text-slate-400 dark:bg-slate-800'}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {device.name || device.macAddress}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">{device.macAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${device.onlineStatus ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {device.onlineStatus ? 'Online' : 'Offline'}
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, device.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Device"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{device.breakers?.length || 0}</span> Breakers
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-1.5">
                  Type: <span className="uppercase text-xs">{device.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDeviceModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        token={localStorage.getItem('token')}
      />
    </div>
  );
};

export default DevicesList;

