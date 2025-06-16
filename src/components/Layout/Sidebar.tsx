
import React from 'react';
import { FileText, Users, BarChart3, Clock } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const menuItems = [
    { icon: FileText, label: 'Job Postings', active: true },
    { icon: Users, label: 'Candidates', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Clock, label: 'History', active: false },
  ];

  return (
    <aside className={`bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium font-ibm">
            {isCollapsed ? '→' : '←'}
          </span>
        </button>
      </div>
      
      <nav className="px-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 px-3 py-2 mb-1 rounded-lg transition-colors ${
              item.active 
                ? 'bg-primary text-white' 
                : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium font-ibm">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};
