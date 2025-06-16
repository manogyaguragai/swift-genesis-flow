
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trophy, ArrowRight, ChevronDown } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Upload Resumes',
    description: 'Upload multiple resumes in ZIP or PDF format',
    icon: Upload,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-300'
  },
  {
    id: 2,
    title: 'Add Job Description',
    description: 'Provide detailed job requirements and qualifications',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-300'
  },
  {
    id: 3,
    title: 'Get Top Candidates',
    description: 'Receive AI-ranked top 10 candidates instantly',
    icon: Trophy,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-300'
  }
];

export const ProcessInfographic: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('[data-upload-section]');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative py-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/60 to-indigo-100/80">
        {/* Enhanced texture overlays */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/8 to-purple-500/8 animate-pulse"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)
            `
          }}></div>
        </div>
        
        {/* Enhanced floating geometric shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-l from-purple-400/15 to-indigo-400/15 rounded-full blur-xl animate-float" style={{
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-1/2 left-5 w-20 h-20 bg-gradient-to-t from-blue-300/20 to-purple-300/20 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary/12 to-primary/12 rounded-full blur-lg animate-float" style={{
          animationDelay: '1s'
        }}></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const isPrevious = activeStep > index || (activeStep === 0 && index === steps.length - 1);
            
            return (
              <div key={step.id} className="relative">
                {/* Connector Arrow - Only show between steps on larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className={`w-6 h-6 transition-all duration-500 ${
                      isPrevious ? 'text-primary animate-pulse' : 'text-slate-300'
                    }`} />
                  </div>
                )}
                
                {/* Step Card */}
                <div className={`relative bg-white rounded-xl p-5 shadow-lg border-2 transition-all duration-700 transform ${
                  isActive 
                    ? 'scale-105 shadow-xl border-primary bg-white' 
                    : isPrevious 
                      ? 'scale-100 border-success/50 bg-white/95 blur-[1px]' 
                      : 'scale-95 border-slate-200 bg-white/80 blur-[1px]'
                }`}>
                  {/* Step Number */}
                  <div className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-fira transition-all duration-500 ${
                    isActive 
                      ? 'bg-primary text-white animate-pulse' 
                      : isPrevious 
                        ? 'bg-success text-white' 
                        : 'bg-slate-300 text-slate-600'
                  }`}>
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActive 
                      ? step.bgColor + ' animate-pulse' 
                      : isPrevious 
                        ? 'bg-success/10' 
                        : 'bg-slate-100'
                  }`}>
                    <Icon className={`w-6 h-6 transition-all duration-500 ${
                      isActive 
                        ? 'text-primary animate-bounce' 
                        : isPrevious 
                          ? 'text-success' 
                          : 'text-slate-400'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className={`text-lg font-bold font-inter mb-2 transition-all duration-500 ${
                      isActive 
                        ? 'text-slate-900' 
                        : isPrevious 
                          ? 'text-slate-800' 
                          : 'text-slate-600'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm font-ibm leading-relaxed transition-all duration-500 ${
                      isActive 
                        ? 'text-slate-700' 
                        : isPrevious 
                          ? 'text-slate-600' 
                          : 'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-primary scale-125' 
                    : (activeStep > index || (activeStep === 0 && index === steps.length - 1))
                      ? 'bg-success' 
                      : 'bg-slate-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Get Started Button */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={scrollToUpload}
            className="group inline-flex items-center space-x-3 px-10 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold font-inter text-base rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600"
          >
            <span>Get Started</span>
            <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
          </button>
          <p className="text-xs text-slate-500 font-ibm">
            Start analyzing resumes in seconds
          </p>
        </div>
      </div>
    </div>
  );
};
