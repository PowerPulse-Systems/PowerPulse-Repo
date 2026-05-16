import React, { useState } from 'react';

declare global {
  interface Window {
    electronAPI: any;
  }
}

interface WelcomeProps {
  onLogin: (data: { token: string; user: { id: string; name: string; email: string; role: string } }) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.api.login(email, password);
        if (result.success) {
          onLogin({ token: result.data.access_token, user: result.data.user });
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Fallback for dev/browser testing
        onLogin({
          token: 'dev-token',
          user: { id: '1', name: 'Dev User', email, role: 'Admin' },
        });
      }
    } catch (err: any) {
      setError(err.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
          <span className="text-4xl">⚡</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to PowerPulse</h1>
        <p className="text-slate-400">Sign in to provision your energy monitoring device</p>
      </div>

      {/* Login Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In & Start Setup'
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => window.electronAPI?.app.openExternal('http://localhost:5173/signup')}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create one on the web dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
