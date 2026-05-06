import React from 'react';

const Topbar: React.FC = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 text-slate-300">
      <div className="flex items-center space-x-4">
        <select className="bg-slate-800 border border-slate-700 text-sm rounded px-3 py-1.5 focus:outline-none">
          <option>Main Building - Block A</option>
          <option>Warehouse B</option>
        </select>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative cursor-pointer">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full border border-slate-900"></span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
            AD
          </div>
          <span className="text-sm font-medium hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;