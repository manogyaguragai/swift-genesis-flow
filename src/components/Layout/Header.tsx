
import React from 'react';
import { Users, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg">
            <Users className="w-4 h-4 text-white absolute" />
            <Sparkles className="w-3 h-3 text-white/80 absolute top-1 right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-inter text-slate-900">Kandidex</h1>
            <p className="text-sm text-slate-500 font-ibm">AI-Powered HR System</p>
          </div>
        </div>
      </div>
    </header>
  );
};
