
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

// Layouts & Guards
import DashboardLayout from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { GuestRoute } from './components/common/GuestRoute';

import './App.css';

const App: React.FC = () => {
  return (
    <Router basename="/PowerPulse-Repo">
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
        <Route path='/signup' element={<GuestRoute><Signup /></GuestRoute>} />

        {/* Dashboard Routes with Layout */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/devices' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DevicesList />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/devices/:id' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DeviceSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/analytics' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/alerts' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Alerts />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/settings' 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
