import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
    navigate('/login');
  };

  return (
    <header className="relative z-20 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 text-slate-300 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 light:border-slate-200 light:bg-white/90 light:text-slate-700">
      <div className="flex items-center space-x-4">
        <select className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 light:border-slate-300 light:bg-slate-100 light:text-slate-900">
          <option>Main Building - Block A</option>
          <option>Warehouse B</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-xl transition hover:border-blue-500/60 hover:bg-slate-700/80 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500/60 dark:hover:bg-slate-700/80 light:border-slate-300 light:bg-slate-200/80 light:hover:border-blue-400/60 light:hover:bg-slate-300/80"
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
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-xl transition hover:border-blue-500/60 hover:bg-slate-700/80 dark:border-slate-700 dark:bg-slate-800/80 light:border-slate-300 light:bg-slate-200/80 light:hover:border-blue-400/60 light:hover:bg-slate-300/80"
            aria-expanded={notificationsOpen}
            aria-label="Toggle notifications"
          >
            <span className="animate-pulse-glow">🔔</span>
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-slate-900 bg-rose-500"></span>
          </button>

          {notificationsOpen ? (
            <div className="absolute right-0 top-12 w-[22rem] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl shadow-slate-950/60 dark:border-slate-700 dark:bg-slate-950/95 light:border-slate-300 light:bg-white/95 light:shadow-slate-300/60">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 dark:border-slate-800 light:border-slate-200">
                <div>
                  <p className="text-sm font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">Notifications</p>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">3 new updates</p>
                </div>
                <span className="rounded-full bg-blue-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Live
                </span>
              </div>
              <div className="divide-y divide-slate-800 dark:divide-slate-800 light:divide-slate-200">
                {notifications.map((notification) => (
                  <div key={notification.title} className="px-4 py-3 transition hover:bg-slate-900/80 dark:hover:bg-slate-900/80 light:hover:bg-slate-100/80">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.tone.replace('text-', 'bg-')}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-100 dark:text-slate-100 light:text-slate-900">{notification.title}</p>
                        <p className="mt-1 text-sm leading-5 text-slate-400 dark:text-slate-400 light:text-slate-600">{notification.detail}</p>
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
            }}
            className="flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 transition hover:border-blue-400/60 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500/60 dark:hover:bg-slate-700/80"
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
              AD
            </div>
            <span className="hidden pr-1 text-sm font-medium text-slate-900 md:block dark:text-slate-200">Admin</span>
          </button>

          {profileOpen ? (
            <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-slate-300 bg-white/95 shadow-2xl shadow-slate-300/60 dark:border-slate-700 dark:bg-slate-950/95 dark:shadow-slate-950/60">
              <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Admin</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">admin@smartems.local</p>
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
    </header>
  );
};

export default Topbar;