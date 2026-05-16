import React, { useState, useCallback } from 'react';
import Welcome from './pages/Welcome';
import Scan from './pages/Scan';
import Configure from './pages/Configure';
import Provisioning from './pages/Provisioning';
import Success from './pages/Success';

type AppPage = 'welcome' | 'scan' | 'configure' | 'provisioning' | 'success';

interface AuthData {
  token: string;
  user: { id: string; name: string; email: string; role: string };
}

interface SelectedDevice {
  id: string;
  name: string;
  mac: string;
  rssi: number;
}

const App: React.FC = () => {
  const [page, setPage] = useState<AppPage>('welcome');
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<SelectedDevice | null>(null);
  const [wifiConfig, setWifiConfig] = useState<{ ssid: string; password: string }>({ ssid: '', password: '' });

  const handleLogin = useCallback((data: AuthData) => {
    setAuthData(data);
    setPage('scan');
  }, []);

  const handleDeviceSelect = useCallback((device: SelectedDevice) => {
    setSelectedDevice(device);
    setPage('configure');
  }, []);

  const handleConfigSubmit = useCallback((config: { ssid: string; password: string }) => {
    setWifiConfig(config);
    setPage('provisioning');
  }, []);

  const handleProvisioningComplete = useCallback(() => {
    setPage('success');
  }, []);

  const handleStartOver = useCallback(() => {
    setSelectedDevice(null);
    setWifiConfig({ ssid: '', password: '' });
    setPage('scan');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-blue-500/20">
            ⚡
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">PowerPulse Setup</span>
        </div>
        {authData && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400">{authData.user.email}</span>
          </div>
        )}
      </header>

      {/* Progress Bar */}
      <div className="flex gap-1 px-6 py-3 bg-slate-900/30">
        {['Login', 'Scan', 'Configure', 'Provision', 'Done'].map((step, i) => {
          const stepIndex = ['welcome', 'scan', 'configure', 'provisioning', 'success'].indexOf(page);
          const isActive = i <= stepIndex;
          const isCurrent = i === stepIndex;
          return (
            <div key={step} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                isActive ? 'bg-blue-500' : 'bg-slate-800'
              } ${isCurrent ? 'shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`} />
              <span className={`text-[10px] font-medium transition-colors ${
                isActive ? 'text-blue-400' : 'text-slate-600'
              }`}>{step}</span>
            </div>
          );
        })}
      </div>

      {/* Page Content */}
      <main className="p-6">
        {page === 'welcome' && <Welcome onLogin={handleLogin} />}
        {page === 'scan' && <Scan onDeviceSelect={handleDeviceSelect} />}
        {page === 'configure' && selectedDevice && (
          <Configure device={selectedDevice} onSubmit={handleConfigSubmit} onBack={() => setPage('scan')} />
        )}
        {page === 'provisioning' && selectedDevice && (
          <Provisioning
            device={selectedDevice}
            wifiConfig={wifiConfig}
            authToken={authData?.token || ''}
            onComplete={handleProvisioningComplete}
            onError={handleStartOver}
          />
        )}
        {page === 'success' && selectedDevice && (
          <Success device={selectedDevice} onAddAnother={handleStartOver} />
        )}
      </main>
    </div>
  );
};

export default App;
