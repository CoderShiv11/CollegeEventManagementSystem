
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, LogIn, LogOut, Sun, Moon, GraduationCap } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">
              Edu<span className="text-blue-600">Vent</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-slate-500" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            <Link 
              to="/" 
              className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>

            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => { onLogout(); navigate('/'); }}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
