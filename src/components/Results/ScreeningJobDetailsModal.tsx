
import React from 'react';
import { X, Briefcase, FileText } from 'lucide-react';

interface ScreeningJobDetailsModalProps {
  jobRole: string;
  jobDescription: string;
  onClose: () => void;
}

export const ScreeningJobDetailsModal: React.FC<ScreeningJobDetailsModalProps> = ({
  jobRole,
  jobDescription,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-glass border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-inter text-slate-900">Job Details</h2>
              <p className="text-sm text-slate-600">{jobRole}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Briefcase className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-semibold font-inter text-slate-900">Position</h3>
              </div>
              <p className="text-slate-700 font-medium bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
                {jobRole}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-4 h-4 text-secondary" />
                <h3 className="text-lg font-semibold font-inter text-slate-900">Job Description</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border border-white/50">
                <pre className="whitespace-pre-wrap text-slate-700 font-ibm text-sm leading-relaxed">
                  {jobDescription}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
