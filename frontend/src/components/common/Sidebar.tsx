import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Device Setup', path: '/setup' },
    { name: 'Breakers', path: '/breakers' },
    { name: 'Switch Nodes', path: '/pairing/switch' },
    { name: 'Sensor Nodes', path: '/pairing/sensor' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col transition-colors bg-white border-r border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
      <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-500 border-b border-slate-200 dark:border-slate-800">
        SmartEMS
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-6 py-3 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-500' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t text-xs text-center border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-500">
        System Status: <span className="text-emerald-500 font-semibold">Online</span>
      </div>
    </aside>
  );
};

export default Sidebar;