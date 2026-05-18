import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { devicesApi } from '../../services/api';
import { useEffect } from 'react';
import AddDeviceModal from '../ui/AddDeviceModal';
import { useDashboardStore } from '../../store/useDashboardStore';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, token, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [devicesOpen, setDevicesOpen] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  
  const { activeDeviceId, setActiveDevice } = useDashboardStore();
  const selectedDevice = devices.find(d => d.id === activeDeviceId);

  const [addDeviceModalOpen, setAddDeviceModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      devicesApi.getMyDevices().then((res) => {
        setDevices(res.data);
        if (res.data.length > 0 && !activeDeviceId) {
          setActiveDevice(res.data[0].id);
        }
      }).catch(err => console.error("Failed to load devices", err));
    }
  }, [token]);

  const handleAddDevice = () => {
    setDevicesOpen(false);
    setAddDeviceModalOpen(true);
  };

  const notifications = [
    {
      title: 'Server Room load is rising',
      detail: 'Usage crossed 80% of the configured threshold 4 minutes ago.',
      tone: 'text-amber-400',
    },
    {
      title: 'Breaker sync completed',
      detail: 'All paired switches have refreshed their live status successfully.',
      tone: 'text-emerald-400',
    },
    {
      title: 'New analytics snapshot ready',
      detail: 'A fresh energy summary has been generated for Block A.',
      tone: 'text-blue-400',
    },
  ];

  const goToSettings = () => {
    setProfileOpen(false);
    navigate('/settings');
  };

  const logOut = () => {
    setProfileOpen(false);
    logout();
    navigate('/login');
  };

  const iconBtnClass = "relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200";

  return (
    <header className="relative z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 text-slate-700 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-200 transition-colors">
      <div className="flex items-center space-x-2 relative">
        {devices.length === 0 ? (
          <button 
            onClick={handleAddDevice}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 shadow-lg shadow-blue-500/20"
          >
            <span>➕</span> Add Device
          </button>
        ) : (
          <div className="relative z-50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDevicesOpen(!devicesOpen);
                  setNotificationsOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center justify-between min-w-[220px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-slate-50 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={selectedDevice?.onlineStatus ? 'text-emerald-400 text-xs' : 'text-slate-400 text-xs'}>
                    ●
                  </span>
                  <span className="truncate">{selectedDevice?.name || selectedDevice?.macAddress || 'Select Device'}</span>
                </div>
                <span className="text-[10px] opacity-60 ml-2">▼</span>
              </button>
              
              <button 
                onClick={handleAddDevice}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Add new device"
                title="Add new device"
              >
                ➕
              </button>
            </div>

            {devicesOpen && (
              <div className="absolute left-0 top-12 w-[220px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg z-50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50">
                <div className="max-h-64 overflow-y-auto p-2">
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => {
                        setActiveDevice(device.id);
                        setDevicesOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                        selectedDevice?.id === device.id 
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                      }`}
                    >
                      <span className={device.onlineStatus ? 'text-emerald-400 text-[10px]' : 'text-slate-500 text-[10px]'}>
                        ●
                      </span>
                      <span className="truncate">{device.name || device.macAddress}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 p-2">
                  <button
                    onClick={handleAddDevice}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  >
                    <span>➕</span> Add New Device
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            type="button"
            onClick={toggleTheme}
            className={iconBtnClass}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((current) => !current);
              setProfileOpen(false);
              setDevicesOpen(false);
            }}
            className={iconBtnClass}
            aria-expanded={notificationsOpen}
            aria-label="Toggle notifications"
          >
            <span className="animate-pulse-glow">🔔</span>
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-slate-900 bg-rose-500"></span>
          </button>

          {notificationsOpen ? (
            <div className="absolute right-0 top-12 w-[22rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">3 new updates</p>
                </div>
                <span className="rounded-full bg-blue-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                  Live
                </span>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {notifications.map((notification) => (
                  <div key={notification.title} className="px-4 py-3 transition hover:bg-slate-100/80 dark:hover:bg-slate-900/80">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.tone.replace('text-', 'bg-')}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notification.title}</p>
                        <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">{notification.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((current) => !current);
              setNotificationsOpen(false);
              setDevicesOpen(false);
            }}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-2 py-1.5 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/30 uppercase">
              {user?.name?.slice(0, 2) || 'US'}
            </div>
            <span className="hidden pr-1 text-sm font-medium text-slate-900 md:block dark:text-slate-200">
              {user?.name || 'User'}
            </span>
          </button>

          {profileOpen ? (
            <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50">
              <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="p-2">
                <button
                  type="button"
                  onClick={goToSettings}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                >
                  Profile settings
                </button>
                <button
                  type="button"
                  onClick={logOut}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-100/50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <AddDeviceModal 
        isOpen={addDeviceModalOpen} 
        onClose={() => setAddDeviceModalOpen(false)} 
        token={token}
      />
    </header>
  );
};

export default Topbar;