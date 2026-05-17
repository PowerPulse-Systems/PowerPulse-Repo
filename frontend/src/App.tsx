
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import DevicesList from './pages/Devices/DevicesList';
import DeviceSettings from './pages/Devices/DeviceSettings';
import Analytics from './pages/Analytics/Analytics';
import Alerts from './pages/Alerts/Alerts';
import Settings from './pages/Settings/Settings';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

import './App.css';

const App: React.FC = () => {
  return (
    <Router basename="/PowerPulse-Repo">
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Dashboard Routes with Layout */}
        <Route 
          path='/dashboard' 
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/devices' 
          element={
            <DashboardLayout>
              <DevicesList />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/devices/:id' 
          element={
            <DashboardLayout>
              <DeviceSettings />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/analytics' 
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/alerts' 
          element={
            <DashboardLayout>
              <Alerts />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/settings' 
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
