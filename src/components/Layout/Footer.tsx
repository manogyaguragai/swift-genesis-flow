
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Footer: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Workflow', path: '/workflow' },
    { name: 'Screen Candidates', path: '/screen-candidates' },
    // Only show Screening History if user is authenticated
    ...(isAuthenticated ? [{ name: 'Screening History', path: '/screening-history' }] : []),
    { name: 'Contact Us', path: '/contact' },
    // Add login link only if user is not authenticated
    ...(!isAuthenticated ? [{ name: 'Login', path: '/login' }] : []),
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations with consistent theme */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/" onClick={handleNavClick} className="flex items-center space-x-3 mb-6 group">
              <img 
              src="/gradient.png" 
              alt="Kandidex Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-inter text-white group-hover:text-primary transition-colors">Kandidex</h3>
                <p className="text-slate-300 font-ibm text-sm">AI-Powered HR System</p>
              </div>
            </Link>
            <p className="text-slate-300 font-ibm leading-relaxed max-w-md mb-6 text-sm sm:text-base">
              Revolutionizing recruitment with intelligent resume screening, personalized interview questions, and smart candidate recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold font-inter text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleNavClick}
                    className="text-slate-300 font-ibm hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold font-inter text-white mb-6">Features</h4>
            <ul className="space-y-3">
              <li className="text-slate-300 font-ibm text-sm sm:text-base">Resume Screening</li>
              <li className="text-slate-300 font-ibm text-sm sm:text-base">Interview Questions</li>
              <li className="text-slate-300 font-ibm text-sm sm:text-base">Candidate Ranking</li>
              <li className="text-slate-300 font-ibm text-sm sm:text-base">Alternative Finder</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-400 font-ibm text-xs sm:text-sm text-center sm:text-left">
              © 2025 Kandidex. All rights reserved.
            </p>
            <p className="text-slate-400 font-ibm text-xs sm:text-sm text-center sm:text-right">
              Brought to life by <span className="text-primary font-semibold">Manogya Guragai</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
