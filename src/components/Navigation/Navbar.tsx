
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Sparkles, ChevronDown, Menu, X } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const [showKandidexDropdown, setShowKandidexDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = () => {
    // Small delay to ensure navigation completes first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    setShowMobileMenu(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Workflow', path: '/workflow' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const kandidexItems = [
    { name: 'Screen Candidates', path: '/screen-candidates' },
    // Only show Screening History if user is authenticated
    ...(isAuthenticated ? [{ name: 'Screening History', path: '/screening-history' }] : []),
  ];

  const isKandidexActive = location.pathname === '/screen-candidates' || location.pathname === '/screening-history';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleNavClick} 
            className="flex items-center space-x-2 group flex-shrink-0"
          >
            <img 
              src="/gradient.png" 
              alt="Kandidex Logo"
              className="h-6 sm:h-8 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold font-inter text-slate-900 group-hover:text-primary transition-colors">Kandidex</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`relative px-3 xl:px-4 py-2 font-medium font-inter text-sm transition-all duration-300 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary bg-white/20 backdrop-blur-sm shadow-glass-inset'
                    : 'text-slate-700 hover:text-primary hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 backdrop-blur-sm"></div>
                )}
              </Link>
            ))}
            
            {/* Use Kandidex Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowKandidexDropdown(true)}
              onMouseLeave={() => setShowKandidexDropdown(false)}
            >
              <button
                className={`relative px-3 xl:px-4 py-2 font-medium font-inter text-sm transition-all duration-300 rounded-lg flex items-center space-x-1 ${
                  isKandidexActive
                    ? 'text-primary bg-white/20 backdrop-blur-sm shadow-glass-inset'
                    : 'text-slate-700 hover:text-primary hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <span className="relative z-10">Use Kandidex</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showKandidexDropdown ? 'rotate-180' : ''}`} />
                {isKandidexActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 backdrop-blur-sm"></div>
                )}
              </button>

              {/* Dropdown Menu with Glassmorphism */}
              <div className={`absolute top-full left-0 mt-2 w-48 transition-all duration-300 ${
                showKandidexDropdown 
                  ? 'opacity-100 visible transform translate-y-0' 
                  : 'opacity-0 invisible transform -translate-y-2'
              }`}>
                <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-glass border border-white/50 overflow-hidden">
                  {kandidexItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      className={`block px-4 py-3 text-sm font-medium font-inter transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                          : 'text-slate-700 hover:text-primary hover:bg-white/20'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Avatar */}
            <UserAvatar />
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors bg-white/10 backdrop-blur-sm rounded-lg"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          showMobileMenu ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-glass border border-white/50 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`block px-4 py-3 font-medium font-inter text-sm transition-all duration-200 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                    : 'text-slate-700 hover:text-primary hover:bg-white/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Kandidex Items */}
            <div className="border-t border-white/30 pt-2 mt-2">
              <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Use Kandidex</p>
              {kandidexItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`block px-4 py-3 font-medium font-inter text-sm transition-all duration-200 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                      : 'text-slate-700 hover:text-primary hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
