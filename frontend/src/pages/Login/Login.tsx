import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sidePaneImage from '../../assets/login side pane.png';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex bg-slate-900 text-slate-200">
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-400 hover:text-slate-200 transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-slate-800 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url("${sidePaneImage}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-0" />
        
        {/* Content */}
        <div className="z-10 flex flex-col items-center p-12 text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-4 drop-shadow-lg">SmartEMS</h1>
          <p className="text-xl text-slate-200 max-w-md drop-shadow-md">
            Industrial-grade dashboard for precise energy tracking and automation.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-blue-500" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded bg-slate-900 border-slate-700" />
                <span className="text-slate-400">Remember Me</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold transition">Login</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;