import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { devicesApi } from '../../services/api';
import { ArrowLeft, Server, Activity, Save } from 'lucide-react';

const DeviceSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      devicesApi.getDevice(id).then((res) => {
        setDevice(res.data);
        setName(res.data.name || '');
        setLoading(false);
      }).catch(err => {
        console.error("Failed to load device settings", err);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSave = async () => {
    // We would need an API endpoint to update the device name, but for now we simulate it
    // await api.put(`/devices/${id}`, { name });
    alert("Settings saved!");
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-500 p-12">
        Device not found
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/devices')}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              Device Settings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-500 font-mono mt-0.5">{device.macAddress}</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">General Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Device Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Server Room Panel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Building / Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Block A"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Breakers</h2>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Add Breaker</button>
            </div>
            
            {device.breakers && device.breakers.length > 0 ? (
              <div className="space-y-3">
                {device.breakers.map((breaker: any) => (
                  <div key={breaker.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{breaker.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 font-mono">Pin: {breaker.hardwarePin}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-500 text-sm">
                No breakers configured for this device yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Status */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Status</h2>
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.onlineStatus ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:text-slate-400 dark:bg-slate-800'}`}>
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className={`text-sm font-bold uppercase tracking-wider ${device.onlineStatus ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-500 dark:text-slate-400'}`}>
                  {device.onlineStatus ? 'Online' : 'Offline'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                  Last seen: {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Never'}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-500">Type</span>
                <span className="font-medium text-slate-900 dark:text-white uppercase">{device.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-500">Firmware</span>
                <span className="font-medium text-slate-900 dark:text-white">{device.firmwareVersion || 'Unknown'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-500">Registered</span>
                <span className="font-medium text-slate-900 dark:text-white">{new Date(device.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceSettings;

