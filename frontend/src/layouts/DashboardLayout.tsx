import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col overflow-visible">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;