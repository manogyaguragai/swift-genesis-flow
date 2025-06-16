
import React, { useState } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { Header } from '../components/Layout/Header';
import { FileUploadZone } from '../components/FileUpload/FileUploadZone';
import { JobDescriptionInput } from '../components/JobDescription/JobDescriptionInput';
import { ProcessingButton } from '../components/Dashboard/ProcessingButton';
import { LoadingScreen } from '../components/Processing/LoadingScreen';
import { ProcessingPipeline } from '../components/Processing/ProcessingPipeline';
import { CandidateTable } from '../components/Results/CandidateTable';
import { TopCandidateSpotlight } from '../components/Results/TopCandidateSpotlight';
import { CandidateDetailPanel } from '../components/Results/CandidateDetailPanel';
import { FeatureHighlight } from '../components/Features/FeatureHighlight';
import { BackButton } from '../components/Navigation/BackButton';

const Index: React.FC = () => {
  const { processing, candidates } = useDashboardStore();
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const resetToSetup = () => {
    window.location.reload();
  };

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowDetailPanel(true);
  };

  if (processing.isProcessing) {
    return <LoadingScreen />;
  }

  if (candidates.length > 0) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-inter text-slate-900">
                Candidate Analysis Results
              </h1>
              <p className="text-slate-600 font-ibm mt-2">
                Found {candidates.length} candidates ranked by AI compatibility score
              </p>
            </div>
            <BackButton onClick={resetToSetup} />
          </div>

          <FeatureHighlight />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CandidateTable 
                candidates={candidates}
                onCandidateClick={handleCandidateClick}
              />
            </div>
            <div>
              <TopCandidateSpotlight candidate={candidates[0]} />
            </div>
          </div>

          <ProcessingPipeline processing={processing} />
        </div>

        {showDetailPanel && selectedCandidate && (
          <CandidateDetailPanel
            candidate={selectedCandidate}
            onClose={() => setShowDetailPanel(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <JobDescriptionInput />
          <FileUploadZone />
        </div>

        <ProcessingButton />
        <ProcessingPipeline processing={processing} />
      </div>
    </div>
  );
};

export default Index;
