
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Briefcase } from 'lucide-react';

export const JobTitleInput: React.FC = () => {
  const { jobTitle, setJobTitle } = useDashboardStore();

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-glass border border-white/50 p-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-inter text-slate-900">Job Title</h3>
          <p className="text-sm text-slate-600 font-ibm">Enter the position you're hiring for</p>
        </div>
      </div>
      
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="e.g., Senior Software Engineer, Product Manager..."
        className="w-full px-4 py-3 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-ibm text-slate-700 bg-white/80 backdrop-blur-sm transition-all hover:shadow-md"
      />
    </div>
  );
};
