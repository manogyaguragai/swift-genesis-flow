
import React from 'react';
import { FileUploadZone } from '../FileUpload/FileUploadZone';
import { Upload } from 'lucide-react';

export const FileUploadStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-blue">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-inter text-slate-900 mb-2">
          Upload Resumes
        </h2>
        <p className="text-slate-600 font-ibm max-w-md mx-auto">
          Upload PDF files or ZIP archives containing multiple resumes to get started with AI-powered candidate analysis.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <FileUploadZone />
      </div>
    </div>
  );
};
