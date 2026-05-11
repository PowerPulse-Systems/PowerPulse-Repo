import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-400 hover:text-slate-200 transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>

      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-slate-800 p-12 dark:bg-slate-800 light:bg-slate-100">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">SmartEMS</h1>
        <p className="text-xl text-slate-400 text-center max-w-md dark:text-slate-400 light:text-slate-600">
          Industrial-grade dashboard for precise energy tracking and automation.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700 dark:bg-slate-800 dark:border-slate-700 light:bg-white light:border-slate-300">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-slate-100 light:text-slate-900">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1 dark:text-slate-400 light:text-slate-600">Email</label>
              <input type="email" required className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 light:bg-slate-100 light:border-slate-300 light:text-slate-900" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1 dark:text-slate-400 light:text-slate-600">Password</label>
              <input type="password" required className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 light:bg-slate-100 light:border-slate-300 light:text-slate-900" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded bg-slate-900 border-slate-700 dark:bg-slate-900 dark:border-slate-700 light:bg-slate-100 light:border-slate-300" />
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-600">Remember Me</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 dark:text-blue-400 light:text-blue-600 light:hover:text-blue-700">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold transition dark:bg-blue-600 dark:hover:bg-blue-500 light:bg-blue-600 light:hover:bg-blue-700">Login</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
            Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300 dark:text-blue-400 light:text-blue-600 light:hover:text-blue-700">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;