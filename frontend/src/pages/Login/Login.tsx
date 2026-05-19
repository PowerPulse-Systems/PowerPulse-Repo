import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import sidePaneImage from '../../assets/login side pane.png';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // The context now has the user state, so GuestRoute handles the redirect automatically
      // or we can explicitly steer it:
      navigate('/dashboard');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          // No response from server (Network Error / Server Offline)
          setError('Network error: Unable to connect to the server. Please check your connection and try again.');
        } else if (err.response.status === 401) {
          // Unauthorized (Wrong credentials)
          setError('Incorrect email or password. Please try again.');
        } else {
          // Other backend errors (e.g., 500, 400)
          setError(err.response.data?.message || 'An unexpected error occurred. Please try again later.');
        }
      } else {
        // Unknown JavaScript error
        setError(err?.response?.data?.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors z-20"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-slate-50 dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-100 dark:opacity-40 transition-opacity"
          style={{ backgroundImage: `url("${sidePaneImage}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent dark:from-slate-900 dark:via-slate-900/40 dark:to-transparent z-0 transition-colors duration-300 pointer-events-none" />
        
        {/* Content */}
        <div className="z-10 flex flex-col items-center p-12 text-center">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 drop-shadow-sm dark:drop-shadow-lg">PowerPulse</h1>
          <p className="text-xl text-slate-700 dark:text-slate-200 max-w-md drop-shadow-sm dark:drop-shadow-md">
            Industrial-grade dashboard for precise energy tracking and automation.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors duration-300 shadow-sm dark:shadow-none">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100 transition-colors">Login</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                Email Address
              </label>
              <input 
                id="email"
                name="email"
                type="email" 
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!!error}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm" 
                placeholder="admin@example.com" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                Password
              </label>
              <div className="relative">
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  aria-invalid={!!error}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm pr-10" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 accent-blue-600" />
                <span className="text-slate-600 dark:text-slate-400 transition-colors">Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500 font-semibold transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
