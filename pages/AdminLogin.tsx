
import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, GraduationCap, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock validation
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        onLogin();
      } else {
        setError('Verification failed. Invalid admin credentials.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-slate-700 transition-all duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-5 bg-blue-600 rounded-[1.5rem] mb-6 shadow-xl shadow-blue-100 dark:shadow-none">
            {/* Fixed: Removed invalid '刻度' tag */}
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">Admin Access</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">Please sign in to manage campus events</p>
        </div>

        {error && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 flex items-center space-x-3 text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Admin Identity</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                required
                type="text" 
                className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                required
                type={showPassword ? 'text' : 'password'} 
                className="w-full pl-12 pr-14 py-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white font-medium"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Authorize Login</span>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
