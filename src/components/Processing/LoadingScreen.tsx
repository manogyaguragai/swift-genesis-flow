
import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { FileText, Brain, Sparkles, Target } from 'lucide-react';

const PROCESSING_STEPS = [
  {
    id: 'parsing',
    title: 'Parsing Resumes',
    description: 'Extracting text and structure from documents',
    icon: FileText,
    duration: 2000,
  },
  {
    id: 'skills',
    title: 'Extracting Skills',
    description: 'Identifying technical and soft skills',
    icon: Target,
    duration: 2000,
  },
  {
    id: 'ai-analysis',
    title: 'AI Analysis',
    description: 'Matching candidates to job requirements',
    icon: Brain,
    duration: 2000,
  },
  {
    id: 'ranking',
    title: 'Ranking Candidates',
    description: 'Calculating fit scores and recommendations',
    icon: Sparkles,
    duration: 2000,
  }
];

export const LoadingScreen: React.FC = () => {
  const { processing } = useDashboardStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!processing.isProcessing) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % PROCESSING_STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [processing.isProcessing]);

  const currentStep = PROCESSING_STEPS[currentStepIndex];

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/2 to-secondary/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col justify-center min-h-[calc(100vh-6rem)]">
        {/* Main Processing Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-glass border border-white/50 p-12 mb-12 max-w-2xl mx-auto">
          {/* Current Step Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-blue animate-pulse">
              <currentStep.icon className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold font-inter text-slate-900 mb-3 animate-fade-in">
              {currentStep.title}
            </h1>
            <p className="text-lg text-slate-600 font-ibm animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentStep.description}
            </p>
          </div>

          {/* Processing Steps */}
          <div className="space-y-4">
            {PROCESSING_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStepIndex;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 scale-105' 
                      : 'bg-slate-50 border border-slate-200 opacity-60'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary to-secondary shadow-glow-blue' 
                      : 'bg-slate-300'
                  }`}>
                    <StepIcon className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold font-inter ${
                      isActive ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm font-ibm ${
                      isActive ? 'text-slate-700' : 'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {isActive && (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-glass animate-fade-in">
            <div className="text-center">
              <p className="text-2xl font-bold font-fira text-slate-900">{processing.uploadedFiles || 0}</p>
              <p className="text-sm text-slate-600 font-ibm">Resumes</p>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center">
              <p className="text-2xl font-bold font-fira text-slate-900">AI</p>
              <p className="text-sm text-slate-600 font-ibm">Powered</p>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <p className="text-2xl font-bold font-fira text-slate-900">100%</p>
              <p className="text-sm text-slate-600 font-ibm">Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
