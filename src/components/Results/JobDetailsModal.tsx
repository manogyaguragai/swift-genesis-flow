
import React from 'react';
import { X, Briefcase, FileText } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

interface JobDetailsModalProps {
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ onClose }) => {
  const { jobTitle, jobDescription } = useDashboardStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border-b border-white/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-inter text-slate-900">Job Details</h2>
                <p className="text-slate-600">Position and requirements overview</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors group"
            >
              <X className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Job Title */}
            <div className="bg-gradient-to-r from-slate-50/50 to-blue-50/50 rounded-xl border border-white/50 backdrop-blur-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold font-inter text-slate-900">Job Title</h3>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                {jobTitle || 'No job title specified'}
              </p>
            </div>

            {/* Job Description */}
            <div className="bg-gradient-to-r from-slate-50/50 to-blue-50/50 rounded-xl border border-white/50 backdrop-blur-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-secondary" />
                <h3 className="text-lg font-bold font-inter text-slate-900">Job Description</h3>
              </div>
              <div className="prose prose-slate max-w-none">
                <div className="text-slate-700 whitespace-pre-wrap font-ibm leading-relaxed">
                  {jobDescription || 'No job description provided'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/50 p-6 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:from-secondary hover:to-primary transition-all duration-300 hover:scale-105 shadow-glow-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
