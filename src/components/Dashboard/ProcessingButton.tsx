import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { rankCandidates } from '../../services/api';
import { Play, Loader2, Upload } from 'lucide-react';
export const ProcessingButton: React.FC = () => {
  const {
    jobDescription,
    jobTitle,
    uploadedFiles,
    processing,
    setProcessing,
    setCandidates,
    setRunId
  } = useDashboardStore();
  const hasUploadedFiles = uploadedFiles.length > 0;
  const hasJobDescription = jobDescription.length >= 500;
  const canProcess = hasJobDescription && hasUploadedFiles && !processing.isProcessing;
  const handleProcessing = async () => {
    if (!canProcess) return;
    const startTime = Date.now();
    setProcessing({
      isProcessing: true,
      currentStage: 'upload',
      progress: 0,
      uploadedFiles: uploadedFiles.length,
      timings: {
        upload: 0,
        screening: 0,
        analysis: 0,
        total: 0
      }
    });
    try {
      const uploadStart = Date.now();
      const response = await rankCandidates({
        job_desc: jobDescription,
        job_role: jobTitle,
        files: uploadedFiles
      });
      const uploadTime = (Date.now() - uploadStart) / 1000;
      setCandidates(response.candidates);
      setRunId(response.run_id);
      
      const totalTime = (Date.now() - startTime) / 1000;
      const screeningTime = uploadTime * 1.5;
      const analysisTime = totalTime - uploadTime - screeningTime;
      setProcessing({
        isProcessing: false,
        currentStage: 'complete',
        progress: 100,
        uploadedFiles: uploadedFiles.length,
        timings: {
          upload: parseFloat(uploadTime.toFixed(2)),
          screening: parseFloat(screeningTime.toFixed(2)),
          analysis: parseFloat(analysisTime.toFixed(2)),
          total: parseFloat(totalTime.toFixed(2))
        }
      });
    } catch (error) {
      console.error('Processing error:', error);
      setProcessing({
        isProcessing: false,
        currentStage: 'error',
        progress: 0,
        uploadedFiles: uploadedFiles.length,
        timings: {
          upload: 0,
          screening: 0,
          analysis: 0,
          total: 0
        }
      });
    }
  };
  const getButtonContent = () => {
    if (processing.currentStage === 'error') {
      return {
        icon: <span className="text-red-500">!</span>,
        text: 'Processing Failed - Try Again',
        className: 'bg-red-500 hover:bg-red-600 text-white'
      };
    }
    if (processing.isProcessing) {
      return {
        icon: <Loader2 className="w-6 h-6 animate-spin" />,
        text: 'Processing Candidates...',
        className: 'bg-primary text-white'
      };
    }
    if (!hasJobDescription) {
      return {
        icon: <Play className="w-6 h-6" />,
        text: 'Add Job Description (500+ chars)',
        className: 'bg-slate-200 text-slate-400 cursor-not-allowed'
      };
    }
    if (!hasUploadedFiles) {
      return {
        icon: <Upload className="w-6 h-6" />,
        text: 'Upload Resume Files First',
        className: 'bg-slate-200 text-slate-400 cursor-not-allowed'
      };
    }
    return {
      icon: <Play className="w-6 h-6" />,
      text: 'Start AI Analysis',
      className: 'bg-primary hover:bg-blue-600 text-white hover:scale-105 shadow-lg hover:shadow-xl'
    };
  };
  const buttonContent = getButtonContent();
  return <div className="flex justify-center">
      <button onClick={handleProcessing} disabled={!canProcess} className={`inline-flex items-center space-x-3 px-8 py-4 rounded-lg font-medium font-inter text-lg transition-all transform ${buttonContent.className}`}>
        {buttonContent.icon}
        <span>{buttonContent.text}</span>
      </button>
      
      {!hasUploadedFiles && hasJobDescription && <p className="text-sm text-slate-500 font-ibm mt-3 text-center"></p>}
    </div>;
};
