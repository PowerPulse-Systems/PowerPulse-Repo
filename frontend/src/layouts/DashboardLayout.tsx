import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;