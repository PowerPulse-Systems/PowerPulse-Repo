import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sidePaneImage from '../../assets/login side pane.png';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('An account with this email already exists.');
      } else if (!err.response) {
        setError('Network error: Unable to connect to the server.');
      } else {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-900 dark:text-slate-200 hover:text-slate-800 dark:hover:text-slate-100 transition-colors z-20"
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
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-100 dark:opacity-40 transition-opacity"
          style={{ backgroundImage: `url("${sidePaneImage}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/20 to-transparent dark:from-slate-950/90 dark:via-slate-950/60 dark:to-transparent z-0 transition-colors duration-300 pointer-events-none" />
        
        <div className="z-10 relative flex flex-col items-center p-12 text-center">
          <div className="absolute inset-0 m-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 dark:bg-slate-950/50 dark:border-slate-700/40 -z-10" />
          <h1 className="text-4xl font-black text-slate-950 dark:text-cyan-300 mb-4 tracking-tight drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]">
            SmartEMS
          </h1>
          <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 max-w-md leading-relaxed drop-shadow-[0_8px_14px_rgba(0,0,0,0.2)]">
            Industrial-grade dashboard for precise energy tracking and automation.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors duration-300 shadow-sm dark:shadow-none">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100 transition-colors">Create Account</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 transition-colors">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 transition-colors">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 transition-colors">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500 font-semibold transition-colors duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
