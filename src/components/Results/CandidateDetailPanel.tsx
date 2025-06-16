import React, { useState } from 'react';
import { X, Mail, Award, Target, Zap, FileText, Star, Brain, ExternalLink } from 'lucide-react';
import { Candidate } from '../../store/dashboardStore';
import { EmailModal } from './EmailModal';

interface CandidateDetailPanelProps {
  candidate: Candidate;
  onClose: () => void;
}

export const CandidateDetailPanel: React.FC<CandidateDetailPanelProps> = ({ candidate, onClose }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const openResumeInNewTab = () => {
    const resumeWindow = window.open('', '_blank');
    if (resumeWindow) {
      resumeWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${candidate.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; }
            .font-ibm { font-family: 'IBM Plex Sans', sans-serif; }
          </style>
        </head>
        <body class="bg-gradient-to-br from-slate-50 to-blue-50 p-8">
          <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div class="flex items-center space-x-6">
                <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span class="text-3xl font-bold">${candidate.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div class="flex-1">
                  <h1 class="text-3xl font-bold mb-2">${candidate.name}</h1>
                  <div class="flex flex-wrap gap-4 text-white text-opacity-90">
                    <span>📧 ${candidate.email}</span>
                    <span>📱 ${candidate.mobile_number}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Professional Summary</h2>
                <p class="text-slate-700 font-ibm leading-relaxed bg-slate-50 p-4 rounded-lg">${candidate.summary}</p>
              </div>
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-2">Core Skills</h3>
                    <div class="flex flex-wrap gap-2">
                      ${candidate.skills.exact_matches.map(skill => `<span class="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-medium">${skill}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
              ${candidate.experience_highlights ? `
                <div class="mb-8">
                  <h2 class="text-2xl font-bold text-slate-900 mb-4">Experience Highlights</h2>
                  <div class="bg-slate-50 p-4 rounded-lg">
                    <p class="text-slate-700 font-ibm leading-relaxed">${candidate.experience_highlights}</p>
                  </div>
                </div>
              ` : ''}
              ${candidate.education_highlights ? `
                <div class="mb-8">
                  <h2 class="text-2xl font-bold text-slate-900 mb-4">Education</h2>
                  <div class="bg-slate-50 p-4 rounded-lg">
                    <p class="text-slate-700 font-ibm leading-relaxed">${candidate.education_highlights}</p>
                  </div>
                </div>
              ` : ''}
              ${candidate.resume_content ? `
                <div class="mb-8">
                  <h2 class="text-2xl font-bold text-slate-900 mb-4">Complete Resume</h2>
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <pre class="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">${candidate.resume_content}</pre>
                  </div>
                </div>
              ` : ''}
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <h2 class="text-2xl font-bold text-slate-900 mb-4">AI Assessment</h2>
                <p class="text-slate-700 font-ibm leading-relaxed">${candidate.justification}</p>
                <div class="mt-4 flex space-x-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${candidate.fitScore.toFixed(1)}%</div>
                    <div class="text-sm text-slate-600">Fit Score</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-purple-600">${(candidate.overall_similarity * 100).toFixed(1)}%</div>
                    <div class="text-sm text-slate-600">Similarity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      resumeWindow.document.close();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-glass border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-inter text-slate-900">{candidate.name}</h2>
                <p className="text-slate-600 font-ibm mt-1">Detailed Candidate Profile</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Scores and Contact */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-glass">
                  <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-slate-600">Email</p>
                        <a href={`mailto:${candidate.email}`} className="text-primary hover:underline font-medium">
                          {candidate.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scores */}
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border backdrop-blur-sm ${getScoreBg(candidate.fitScore)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-slate-600">AI Fit Score</span>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColor(candidate.fitScore)}`}>
                      {candidate.fitScore.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl border bg-blue-50/80 border-blue-200 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium text-slate-600">Overall Similarity</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {(candidate.overall_similarity * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border bg-purple-50/80 border-purple-200 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-slate-600">LLM Fit Score</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                      {candidate.llm_fit_score.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold font-inter text-slate-900">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={openResumeInNewTab}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-xl font-medium text-center hover:from-secondary hover:to-primary transition-all hover:scale-105 shadow-glow-blue flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Full Resume</span>
                    </button>
                    <button 
                      onClick={() => setShowEmailModal(true)}
                      className="w-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary py-2 px-4 rounded-xl font-medium text-center hover:bg-primary/10 transition-all hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Candidate Summary</span>
                  </h3>
                  <p className="text-slate-700 font-ibm leading-relaxed">{candidate.summary}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Skills Assessment</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">Exact Matches ({candidate.skills.exact_matches.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.exact_matches.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-success/10 text-success text-sm rounded-full font-ibm border border-success/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {candidate.skills.transferable.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Transferable Skills ({candidate.skills.transferable.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.transferable.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-ibm border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {candidate.skills.non_technical.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Non-Technical Skills ({candidate.skills.non_technical.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.non_technical.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full font-ibm border border-purple-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience */}
                {candidate.experience_highlights && (
                  <div>
                    <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3">Experience Highlights</h3>
                    <p className="text-slate-700 font-ibm leading-relaxed">{candidate.experience_highlights}</p>
                  </div>
                )}

                {/* Education */}
                {candidate.education_highlights && (
                  <div>
                    <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3">Education Highlights</h3>
                    <p className="text-slate-700 font-ibm leading-relaxed">{candidate.education_highlights}</p>
                  </div>
                )}

                {/* AI Justification */}
                <div>
                  <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>AI Assessment Justification</span>
                  </h3>
                  <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-slate-700 font-ibm leading-relaxed">{candidate.justification}</p>
                  </div>
                </div>

                {/* Resume Content Preview */}
                {candidate.resume_content && (
                  <div>
                    <h3 className="text-lg font-semibold font-inter text-slate-900 mb-3 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <span>Resume Content Preview</span>
                    </h3>
                    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 max-h-40 overflow-y-auto backdrop-blur-sm">
                      <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{candidate.resume_content.substring(0, 500)}...</pre>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Click "View Full Resume" for complete details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          candidate={candidate}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </>
  );
};
