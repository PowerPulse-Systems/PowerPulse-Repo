
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import DeviceSetup from './pages/DeviceSetup/DeviceSetup';
import BreakerAssign from './pages/BreakerAssign/BreakerAssign';
import SwitchNodePairing from './pages/SwitchNodePairing/SwitchNodePairing';
import SensorNodePairing from './pages/SensorNodePairing/SensorNodePairing';
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
          path='/setup' 
          element={
            <DashboardLayout>
              <DeviceSetup />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/breakers' 
          element={
            <DashboardLayout>
              <BreakerAssign />
            </DashboardLayout>
          } 
        />
        <Route 
          path='/pairing/switch' 
          element={
             <DashboardLayout>
               <SwitchNodePairing />
             </DashboardLayout>
          } 
        />
        <Route 
          path='/pairing/sensor' 
          element={
             <DashboardLayout>
               <SensorNodePairing />
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
