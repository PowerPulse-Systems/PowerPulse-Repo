import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Devices', path: '/devices', icon: Server },
    { name: 'Analytics', path: '/analytics', icon: Activity },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} shrink-0 h-screen flex flex-col transition-all duration-300 bg-white border-r border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 relative`}
    >
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start'} text-2xl font-bold text-blue-600 dark:text-blue-500 border-b border-slate-200 dark:border-slate-800 h-20`}>
        {isCollapsed ? 'PP' : 'PowerPulse'}
      </div>
      
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm z-10 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path} className="px-3">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                    } ${isCollapsed ? 'justify-center' : 'justify-start'}`
                  }
                  title={isCollapsed ? link.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{link.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={`p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'}`}>
        {!isCollapsed && <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Status</span>}
        <div className="flex items-center gap-2" title={isCollapsed ? "System Online" : undefined}>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          {!isCollapsed && <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">System Online</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;