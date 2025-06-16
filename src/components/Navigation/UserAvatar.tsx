
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserAvatar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="relative">
        <Link
          to="/login"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full shadow-glass hover:shadow-glow-blue transition-all duration-300 hover:scale-105"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
        </Link>
        
        {/* Tooltip - positioned below the icon */}
        {showTooltip && (
          <div className="absolute top-10 sm:top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md whitespace-nowrap animate-fade-in z-50">
            Login
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-slate-800"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-full shadow-glow-blue hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
      >
        <span className="text-white font-bold font-inter text-xs sm:text-sm">
          {user?.initials}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-10 sm:top-12 w-44 sm:w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-glass border border-white/50 py-2 animate-fade-in z-50">
          <div className="px-3 sm:px-4 py-2 border-b border-slate-200">
            <p className="text-xs sm:text-sm font-medium font-inter text-slate-900 truncate">
              {user?.email}
            </p>
          </div>
          <Link
            to="/settings"
            onClick={() => setShowDropdown(false)}
            className="w-full flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-white/50 transition-colors font-ibm"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-white/50 transition-colors font-ibm"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
