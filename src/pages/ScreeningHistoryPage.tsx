import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { getScreeningRuns, ScreeningRun, ScreeningRunsResponse } from '../services/api';
import { ScreeningJobDetailsModal } from '../components/Results/ScreeningJobDetailsModal';
import { ScreeningCandidateModal } from '../components/Results/ScreeningCandidateModal';
import { Calendar, Clock, Users, FileText, ChevronRight, Search, Eye, ChevronLeft, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

const ScreeningHistoryPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [screeningData, setScreeningData] = useState<ScreeningRunsResponse | null>(null);
  const [selectedRun, setSelectedRun] = useState<ScreeningRun | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Set default dates (last 30 days)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    setEndDate(format(today, 'yyyy-MM-dd'));
    setStartDate(format(thirtyDaysAgo, 'yyyy-MM-dd'));
  }, []);

  const fetchScreeningRuns = async (page: number = 1) => {
    if (!user?.userId || !startDate || !endDate) return;

    setLoading(true);
    try {
      const response = await getScreeningRuns({
        user_id: user.userId,
        start_date: startDate,
        end_date: endDate,
        page,
        limit: pageSize,
      });
      setScreeningData(response);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch screening runs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.userId && startDate && endDate) {
      fetchScreeningRuns(1);
    }
  }, [isAuthenticated, user?.userId, startDate, endDate]);

  const handlePageChange = (page: number) => {
    fetchScreeningRuns(page);
  };

  const handleJobDetailsClick = (run: ScreeningRun) => {
    setSelectedRun(run);
    setShowJobModal(true);
  };

  const handleCandidateDetailsClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screeningRuns = screeningData?.results || [];

  return (
    <ProtectedRoute>
      <div className="pt-20 sm:pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            {/* <h1 className="text-2xl sm:text-3xl font-bold font-inter text-slate-900 mb-2">
              Screening History
            </h1>
            <p className="text-slate-600 font-ibm text-sm sm:text-base">
              View your past candidate screening runs and results
            </p> */}
          </div>

          {/* Date Filter Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-glass border border-white/50 p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-slate-700 text-sm sm:text-base">Filter by Date Range</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                  <label className="text-xs sm:text-sm text-slate-600 flex-shrink-0">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm bg-white/50 backdrop-blur-sm w-full sm:w-auto"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                  <label className="text-xs sm:text-sm text-slate-600 flex-shrink-0">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm bg-white/50 backdrop-blur-sm w-full sm:w-auto"
                  />
                </div>
                <button
                  onClick={() => fetchScreeningRuns(1)}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-glow-blue disabled:opacity-50 w-full sm:w-auto flex items-center justify-center"
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="ml-2 sm:hidden">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Updated grid layout for wider right column */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8">
            {/* Left Side - Screening Runs List (smaller width) */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-glass border border-white/50 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold font-inter text-slate-900">
                    Screening Runs ({screeningData?.total || 0})
                  </h2>
                </div>
                
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 sm:h-20 bg-slate-200 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                ) : screeningRuns.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm sm:text-base">No screening runs found for the selected date range.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {screeningRuns.map((run) => (
                        <div
                          key={run.id}
                          className={`p-3 sm:p-4 rounded-xl transition-all duration-300 border ${
                            selectedRun?.id === run.id
                              ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20'
                              : 'bg-white/50 hover:bg-white/70 border border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <button
                              onClick={() => setSelectedRun(run)}
                              className="flex-1 text-left"
                            >
                              <p className="font-medium text-slate-900 truncate text-sm sm:text-base">
                                Run #{run.id.slice(-8)}
                              </p>
                              <p className="text-xs text-slate-600 mt-1">
                                {formatDateTime(run.run_start_time)}
                              </p>
                            </button>
                            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3 text-slate-500" />
                                <span className="text-xs text-slate-600">{run.candidates.length}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span className="text-xs text-slate-600">{formatDuration(run.time_taken)}</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleJobDetailsClick(run)}
                              className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all text-xs"
                            >
                              <Briefcase className="w-3 h-3" />
                              <span>Job</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {screeningData && screeningData.total_pages > 1 && (
                      <Pagination className="mt-4">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          
                          {[...Array(Math.min(screeningData.total_pages, 5))].map((_, i) => {
                            const page = i + 1;
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => currentPage < screeningData.total_pages && handlePageChange(currentPage + 1)}
                              className={currentPage === screeningData.total_pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Side - Run Details (wider width) */}
            <div className="xl:col-span-3">
              {selectedRun ? (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-glass border border-white/50 p-4 sm:p-6 animate-fade-in">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg sm:text-xl font-bold font-inter text-slate-900">
                        Screening Run Details
                      </h2>
                      <button
                        onClick={() => handleJobDetailsClick(selectedRun)}
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium">View Job Details</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-2 sm:p-3">
                        <p className="text-xs text-slate-600 mb-1">Run ID</p>
                        <p className="font-mono text-xs sm:text-sm font-medium text-slate-900">#{selectedRun.id.slice(-8)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-2 sm:p-3">
                        <p className="text-xs text-slate-600 mb-1">Candidates</p>
                        <p className="text-lg font-bold text-slate-900">{selectedRun.candidates.length}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-2 sm:p-3">
                        <p className="text-xs text-slate-600 mb-1">Duration</p>
                        <p className="text-xs sm:text-sm font-medium text-slate-900">{formatDuration(selectedRun.time_taken)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-2 sm:p-3">
                        <p className="text-xs text-slate-600 mb-1">Completed</p>
                        <p className="text-xs font-medium text-slate-900">{formatDateTime(selectedRun.run_end_time)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Candidates List */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-inter text-slate-900 mb-4">
                      Candidates ({selectedRun.candidates.length})
                    </h3>
                    <div className="space-y-4">
                      {selectedRun.candidates.map((candidate, index) => (
                        <div
                          key={candidate.resume_id}
                          className="bg-white/50 rounded-xl p-3 sm:p-4 border border-white/30 hover:bg-white/70 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-slate-900 text-sm sm:text-base truncate">{candidate.candidate_name}</h4>
                                  <p className="text-xs sm:text-sm text-slate-600 truncate">{candidate.file_name}</p>
                                </div>
                                <button
                                  onClick={() => handleCandidateDetailsClick(candidate)}
                                  className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-lg hover:from-primary/20 hover:to-secondary/20 transition-all text-xs flex-shrink-0"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Details</span>
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3">
                                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-2">
                                  <p className="text-xs text-blue-700 mb-1">AI Fit Score</p>
                                  <p className="text-base sm:text-lg font-bold text-blue-900">{candidate.ai_fit_score}%</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-2">
                                  <p className="text-xs text-green-700 mb-1">Skill Match</p>
                                  <p className="text-base sm:text-lg font-bold text-green-900">{Math.round(candidate.skill_similarity * 100)}%</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-2">
                                  <p className="text-xs text-purple-700 mb-1">Questions</p>
                                  <p className="text-base sm:text-lg font-bold text-purple-900">
                                    {candidate.questions_generated ? candidate.generated_questions.length : 0}
                                  </p>
                                </div>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-700 mb-2 line-clamp-2">{candidate.candidate_summary}</p>
                              
                              {/* Skills */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {candidate.skill_assessment.exact_matches.slice(0, 3).map((skill) => (
                                  <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skill_assessment.transferable_skills.slice(0, 2).map((skill) => (
                                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skill_assessment.exact_matches.length + candidate.skill_assessment.transferable_skills.length > 5 && (
                                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                    +{candidate.skill_assessment.exact_matches.length + candidate.skill_assessment.transferable_skills.length - 5} more
                                  </span>
                                )}
                              </div>

                              {/* Gaps */}
                              {candidate.gaps.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-slate-600 mb-1">Key Gaps:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {candidate.gaps.slice(0, 2).map((gap, gapIndex) => (
                                      <span key={gapIndex} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                                        {gap}
                                      </span>
                                    ))}
                                    {candidate.gaps.length > 2 && (
                                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                        +{candidate.gaps.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-glass border border-white/50 p-4 sm:p-6 flex items-center justify-center h-80 sm:h-96">
                  <div className="text-center">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">Select a Screening Run</h3>
                    <p className="text-slate-600 text-sm sm:text-base">Choose a screening run from the left to view detailed results.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {showJobModal && selectedRun && (
          <ScreeningJobDetailsModal
            jobRole={selectedRun.job_role}
            jobDescription={selectedRun.job_description}
            onClose={() => setShowJobModal(false)}
          />
        )}

        {showCandidateModal && selectedCandidate && (
          <ScreeningCandidateModal
            candidate={selectedCandidate}
            onClose={() => setShowCandidateModal(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ScreeningHistoryPage;
