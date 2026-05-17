import React from 'react';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, token }) => {
  if (!isOpen) return null;

  const handleLaunch = () => {
    if (token) {
      window.location.href = `powerpulse://add-device?token=${token}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              ➕
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Provision a New Device</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            To add a new PowerPulse device, you'll need the <strong>PowerPulse Setup</strong> companion app installed on your computer. This app communicates with your device via Bluetooth to configure WiFi and connect it to your account.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <h3 className="mb-3 text-sm font-medium text-slate-900 dark:text-white">Download Setup App</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a 
                href="#" // TODO: Add actual MSIX link
                className="flex flex-col items-center justify-center gap-2 p-3 text-sm font-medium text-slate-700 transition border rounded-lg bg-white border-slate-200 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                <span className="text-xl">🪟</span>
                Windows
              </a>
              <button 
                disabled
                className="flex flex-col items-center justify-center gap-2 p-3 text-sm font-medium text-slate-400 border rounded-lg bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-500"
              >
                <span className="text-xl grayscale">🍎</span>
                macOS
              </button>
              <button 
                disabled
                className="flex flex-col items-center justify-center gap-2 p-3 text-sm font-medium text-slate-400 border rounded-lg bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-500"
              >
                <span className="text-xl grayscale">🐧</span>
                Linux
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">ℹ️</span>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Already have it installed? Click below to launch it securely without needing to sign in again.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 transition bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleLaunch}
            disabled={!token}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            Launch Setup App 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDeviceModal;
