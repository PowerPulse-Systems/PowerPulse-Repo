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
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col text-slate-300">
      <div className="p-6 text-2xl font-bold text-blue-500 border-b border-slate-800">
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
                    isActive ? 'bg-blue-600 text-white font-bold border-r-4 border-blue-300 shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        System Status: <span className="text-emerald-500 font-semibold">Online</span>
      </div>
    </aside>
  );
};

export default Sidebar;