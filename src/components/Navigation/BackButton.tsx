
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  label = "Back to Setup",
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium font-ibm text-slate-600 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-primary transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};
