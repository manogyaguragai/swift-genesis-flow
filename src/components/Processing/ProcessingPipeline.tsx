
import React from 'react';
import { ProcessingState } from '../../store/dashboardStore';
import { Upload, FileSearch, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingPipelineProps {
  processing: ProcessingState;
}

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ processing }) => {
  const stages = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'screening', label: 'Screening', icon: FileSearch },
    { id: 'analysis', label: 'Analysis', icon: Brain },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const getStageStatus = (stageId: string) => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    const currentIndex = stages.findIndex(s => s.id === processing.currentStage);
    
    if (processing.currentStage === 'error') return 'error';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getStageStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white border-success';
      case 'active':
        return 'bg-primary text-white border-primary animate-pulse';
      case 'error':
        return 'bg-danger text-white border-danger';
      default:
        return 'bg-slate-200 text-slate-500 border-slate-200';
    }
  };

  const getConnectorStyle = (index: number) => {
    const currentIndex = stages.findIndex(s => s.id === processing.currentStage);
    if (processing.currentStage === 'error') return 'bg-danger';
    if (index < currentIndex) return 'bg-success';
    return 'bg-slate-200';
  };

  if (!processing.isProcessing && processing.currentStage === 'upload') {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-inter text-slate-900">Processing Pipeline</h3>
        {processing.currentStage === 'error' && (
          <div className="flex items-center space-x-2 text-danger">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Processing Error</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between relative">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const Icon = stage.icon;
          
          return (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${getStageStyle(status)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-600">{stage.label}</span>
                {status === 'active' && processing.isProcessing && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              {index < stages.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded transition-all ${getConnectorStyle(index)}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {processing.isProcessing && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Progress</span>
            <span>{processing.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${processing.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {processing.uploadedFiles > 0 && (
        <div className="mt-4 text-sm text-slate-600">
          <span>Files processed: {processing.uploadedFiles}</span>
        </div>
      )}
    </div>
  );
};
