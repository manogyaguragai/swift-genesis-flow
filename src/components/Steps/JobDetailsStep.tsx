
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { JobDescriptionInput } from '../JobDescription/JobDescriptionInput';
import { Briefcase, FileText } from 'lucide-react';

export const JobDetailsStep: React.FC = () => {
  const { jobTitle, setJobTitle } = useDashboardStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-inter text-slate-900 mb-2">
          Job Details & Requirements
        </h2>
        <p className="text-slate-600 font-ibm max-w-md mx-auto">
          Provide the job title and detailed description to help our AI match the best candidates.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <JobDescriptionInput />
      </div>
    </div>
  );
};
