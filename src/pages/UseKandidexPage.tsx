
import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { LoadingScreen } from '../components/Processing/LoadingScreen';
import { CandidateTable } from '../components/Results/CandidateTable';
import { TopCandidateCarousel } from '../components/Results/TopCandidateCarousel';
import { CandidateDetailPanel } from '../components/Results/CandidateDetailPanel';
import { BackButton } from '../components/Navigation/BackButton';
import { NewFeatureDialog } from '../components/Results/NewFeatureDialog';
import { JobDetailsModal } from '../components/Results/JobDetailsModal';
import { FileUploadStep } from '../components/Steps/FileUploadStep';
import { JobDetailsStep } from '../components/Steps/JobDetailsStep';
import { ConfirmationStep } from '../components/Steps/ConfirmationStep';
import Stepper, { Step } from '../components/ui/Stepper';
import { rankCandidates } from '../services/api';
import { Lightbulb, Sparkles, FileText } from 'lucide-react';

const UseKandidexPage: React.FC = () => {
  const { 
    processing, 
    candidates, 
    showJobDetails, 
    setShowJobDetails,
    uploadedFiles,
    jobDescription,
    jobTitle,
    setProcessing,
    setCandidates,
    setRunId
  } = useDashboardStore();
  
  const { checkTokenValidity, isAuthenticated } = useAuthStore();
  
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showStepper, setShowStepper] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    console.log('UseKandidexPage mounted, checking authentication...');
    console.log('Is authenticated:', isAuthenticated);
    
    if (isAuthenticated && !checkTokenValidity()) {
      console.log('Authentication failed, user should be redirected');
      return;
    }
    
    if (isAuthenticated) {
      console.log('Authentication valid, proceeding with component');
    }
  }, [checkTokenValidity, isAuthenticated]);

  // Check if we should show results instead of stepper on mount
  useEffect(() => {
    if (candidates.length > 0 && !processing.isProcessing) {
      console.log('Found existing candidates, showing results');
      setShowStepper(false);
    }
  }, [candidates.length, processing.isProcessing]);

  const resetToSetup = () => {
    console.log('Resetting to setup...');
    setShowStepper(true);
    setCurrentStep(1);
    setCandidates([]);
    setProcessing({
      isProcessing: false,
      currentStage: 'upload',
      progress: 0,
      uploadedFiles: 0,
      timings: {
        upload: 0,
        screening: 0,
        analysis: 0,
        total: 0,
      },
    });
  };

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowDetailPanel(true);
  };
  
  // Check if user can proceed to next step
  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1:
        return uploadedFiles.length > 0;
      case 2:
        return jobDescription.trim() !== '' && jobTitle.trim() !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleStepChange = async (step: number) => {
    console.log('Step change to:', step);
    setCurrentStep(step);
    
    // When moving to step 3, show confirmation but don't trigger API call yet
    if (step === 3 && canProceedFromStep(2)) {
      console.log('Moved to confirmation step');
    }
  };

  const handleStartAnalysis = async () => {
    console.log('Starting analysis...');
    
    // Check authentication before starting
    if (!isAuthenticated || !checkTokenValidity()) {
      console.error('User not authenticated, cannot start analysis');
      return;
    }

    try {
      console.log('Authentication verified, starting analysis process...');
      
      // Hide stepper and show processing
      setShowStepper(false);
      
      setProcessing({
        isProcessing: true,
        currentStage: 'upload',
        progress: 0,
        uploadedFiles: uploadedFiles.length,
        timings: {
          upload: 0,
          screening: 0,
          analysis: 0,
          total: 0,
        },
      });

      console.log('Calling rankCandidates API...');
      const response = await rankCandidates({
        job_desc: jobDescription,
        job_role: jobTitle,
        files: uploadedFiles,
      });

      console.log('Ranking completed successfully:', response);
      setCandidates(response.candidates);
      setRunId(response.run_id);
      
      setProcessing({
        isProcessing: false,
        currentStage: 'complete',
        progress: 100,
        uploadedFiles: uploadedFiles.length,
        timings: {
          upload: 2.5,
          screening: 3.2,
          analysis: 4.1,
          total: 9.8,
        },
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setProcessing({
        isProcessing: false,
        currentStage: 'error',
        progress: 0,
        uploadedFiles: uploadedFiles.length,
        timings: {
          upload: 0,
          screening: 0,
          analysis: 0,
          total: 0,
        },
      });
    }
  };

  // Ensure page is always scrolled to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProtectedRoute>
      {/* If processing, show loading screen */}
      {processing.isProcessing && !showStepper && <LoadingScreen />}

      {/* If we have results and stepper is hidden, show results */}
      {candidates.length > 0 && !showStepper && !processing.isProcessing && (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-3xl font-bold font-inter text-slate-900">
                    Candidate Analysis Results
                  </h1>
                  <p className="text-slate-600 font-ibm mt-2">
                    Found {candidates.length} candidates ranked by AI compatibility score
                  </p>
                </div>
                
                {/* Floating Lightbulb next to title */}
                <button
                  onClick={() => setShowNewFeatureDialog(true)}
                  className="relative group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Sparkles around the bulb */}
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-2 h-2 text-yellow-400" />
                  </div>
                  <div className="absolute -bottom-1 -left-1">
                    <Sparkles className="w-1.5 h-1.5 text-yellow-500" />
                  </div>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowJobDetails(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200 hover:scale-105"
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">View Job Details</span>
                </button>
                <BackButton onClick={resetToSetup} />
              </div>
            </div>

            {/* Enhanced layout: Wider candidate table with sidebar carousel */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Left side - Candidate Table (3/4 width on XL screens) */}
              <div className="xl:col-span-3">
                <CandidateTable 
                  candidates={candidates}
                  onCandidateClick={handleCandidateClick}
                />
              </div>
              
              {/* Right side - Top 3 Candidates (1/4 width on XL screens) */}
              <div className="xl:col-span-1">
                <TopCandidateCarousel candidates={candidates.slice(0, 3)} />
              </div>
            </div>
          </div>

          {showDetailPanel && selectedCandidate && (
            <CandidateDetailPanel
              candidate={selectedCandidate}
              onClose={() => setShowDetailPanel(false)}
            />
          )}

          {showNewFeatureDialog && (
            <NewFeatureDialog onClose={() => setShowNewFeatureDialog(false)} />
          )}

          {showJobDetails && (
            <JobDetailsModal onClose={() => setShowJobDetails(false)} />
          )}
        </div>
      )}

      {/* Show stepper for setup flow */}
      {showStepper && !processing.isProcessing && (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-inter text-slate-900 mb-2">
                Use Kandidex
              </h1>
              <p className="text-slate-600 font-ibm">
                AI-powered candidate analysis in 3 simple steps
              </p>
            </div>

            <Stepper
              initialStep={1}
              onStepChange={handleStepChange}
              canProceed={canProceedFromStep(currentStep)}
              nextButtonText={currentStep === 2 ? "Review & Start" : "Next"}
            >
              <Step>
                <FileUploadStep />
              </Step>
              <Step>
                <JobDetailsStep />
              </Step>
              <Step>
                <ConfirmationStep onStartAnalysis={handleStartAnalysis} />
              </Step>
            </Stepper>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default UseKandidexPage;
