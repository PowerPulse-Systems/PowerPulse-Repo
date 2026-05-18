import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      title: 'Energy Monitoring',
      desc: 'Track real-time power draw and historical usage across all breaker nodes.',
      icon: '⚡'
    },
    {
      title: 'Smart Automation',
      desc: 'Set up rules to automatically turn off devices when rooms are empty or during peak hours.',
      icon: '🤖'
    },
    {
      title: 'Device Control',
      desc: 'Remotely toggle switches, AC units, and lights directly from your dashboard.',
      icon: '🎛️'
    },
    {
      title: 'Alerts & Analytics',
      desc: 'Get notified of anomalies like overcurrents and analyze peak usage heatmaps.',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">
              ⚡
            </div>
            <div className="text-xl font-bold text-white tracking-tight">PowerPulse</div>
          </div>
          <nav className="space-x-4 flex items-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] uppercase font-bold">
                  {user?.name?.slice(0, 2) || 'US'}
                </div>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
            🚀 Version 2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white">
            Smart Building <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Energy Management</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Industrial-grade dashboard for precise energy tracking, automated device control, and real-time anomaly detection. Identify waste and optimize efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center">
              Go to Dashboard
              <span className="ml-2">→</span>
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center">
              View Features
            </a>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-24 bg-slate-900/50 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Control & Visibility</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to monitor, analyze, and optimize your building's energy consumption in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors group">
                <div className="text-4xl mb-6 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture Visualization */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Seamless Integration</h2>
          <div className="relative p-8 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Breaker Panel */}
            <div className="flex-1 w-full p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl mb-3">🔌</div>
              <div className="font-semibold text-slate-200">Breaker Nodes</div>
              <div className="text-xs text-slate-400 mt-2">ESP32 + CT Sensors</div>
            </div>
            
            <div className="hidden md:block text-slate-600">→</div>

            {/* Cloud Server */}
            <div className="flex-1 w-full p-6 bg-slate-800 rounded-xl border border-blue-900/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <div className="text-3xl mb-3">☁️</div>
              <div className="font-semibold text-blue-400">NestJS Backend</div>
              <div className="text-xs text-slate-400 mt-2">MQTT & WebSockets</div>
            </div>

            <div className="hidden md:block text-slate-600">→</div>

            {/* Dashboard */}
            <div className="flex-1 w-full p-6 bg-slate-800 rounded-xl border border-emerald-900/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="text-3xl mb-3">💻</div>
              <div className="font-semibold text-emerald-400">Web Dashboard</div>
              <div className="text-xs text-slate-400 mt-2">React + Analytics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 flex items-center space-x-2">
            <span className="text-xl">⚡</span>
            <span className="font-semibold">PowerPulse</span>
          </div>
          <div className="space-x-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Architecture</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Contact Support</a>
          </div>
          <p className="text-sm text-slate-600">&copy; {new Date().getFullYear()} PowerPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;