
import React, { useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { CheckCircle, Edit3, FileText, Briefcase, Upload, Archive, File } from 'lucide-react';

interface ConfirmationStepProps {
  onStartAnalysis: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onStartAnalysis }) => {
  const { 
    uploadedFiles, 
    jobDescription, 
    jobTitle, 
    setJobDescription, 
    setJobTitle,
    removeUploadedFile 
  } = useDashboardStore();
  
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [tempJobTitle, setTempJobTitle] = useState(jobTitle);
  const [tempJobDescription, setTempJobDescription] = useState(jobDescription);

  const validFiles = uploadedFiles.filter(file => file && file.name);
  const pdfFiles = validFiles.filter(file => 
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  );
  const zipFiles = validFiles.filter(file => 
    file.type === 'application/zip' || 
    file.type === 'application/x-zip-compressed' || 
    file.name.toLowerCase().endsWith('.zip')
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSaveJobEdit = () => {
    setJobTitle(tempJobTitle);
    setJobDescription(tempJobDescription);
    setIsEditingJob(false);
  };

  const handleCancelJobEdit = () => {
    setTempJobTitle(jobTitle);
    setTempJobDescription(jobDescription);
    setIsEditingJob(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-green">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-inter text-slate-900 mb-2">
          Ready to Analyze
        </h2>
        <p className="text-slate-600 font-ibm max-w-md mx-auto">
          Review your submission and start the AI-powered candidate analysis.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uploaded Files Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold font-inter text-slate-900">Uploaded Files ({validFiles.length})</h3>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>PDF Files:</span>
              <span className="font-medium">{pdfFiles.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>ZIP Archives:</span>
              <span className="font-medium">{zipFiles.length}</span>
            </div>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2">
            {validFiles.map((file, index) => {
              const isZip = file.type === 'application/zip' || 
                           file.type === 'application/x-zip-compressed' || 
                           file.name.toLowerCase().endsWith('.zip');
              
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2">
                    {isZip ? (
                      <Archive className="w-4 h-4 text-purple-500" />
                    ) : (
                      <File className="w-4 h-4 text-slate-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium font-inter text-slate-900 truncate max-w-32">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 font-ibm">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUploadedFile(file.name)}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Job Details Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold font-inter text-slate-900">Job Details</h3>
            </div>
            <button
              onClick={() => setIsEditingJob(!isEditingJob)}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditingJob ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditingJob ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={tempJobTitle}
                  onChange={(e) => setTempJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
                <textarea
                  value={tempJobDescription}
                  onChange={(e) => setTempJobDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveJobEdit}
                  className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelJobEdit}
                  className="px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-1">Job Title</h4>
                <p className="text-sm text-slate-900 font-inter bg-white p-3 rounded-lg border border-slate-200">
                  {jobTitle || 'No job title specified'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-1">Job Description</h4>
                <div className="bg-white p-3 rounded-lg border border-slate-200 max-h-32 overflow-y-auto">
                  <p className="text-sm text-slate-900 font-ibm whitespace-pre-wrap">
                    {jobDescription || 'No job description provided'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center pt-6 pb-4">
        <button
          onClick={onStartAnalysis}
          disabled={validFiles.length === 0 || !jobTitle.trim() || !jobDescription.trim()}
          className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-medium font-inter text-lg transition-all transform ${
            validFiles.length === 0 || !jobTitle.trim() || !jobDescription.trim()
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 shadow-glow-blue hover:shadow-glow-purple'
          }`}
        >
          <CheckCircle className="w-6 h-6" />
          <span>Start Kandidex Analysis</span>
        </button>
      </div>
    </div>
  );
};
