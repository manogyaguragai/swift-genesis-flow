
import React from 'react';
import { X, User, Star, Brain, GraduationCap, Briefcase, AlertTriangle } from 'lucide-react';
import { ScreeningCandidate } from '../../services/api';

interface ScreeningCandidateModalProps {
  candidate: ScreeningCandidate;
  onClose: () => void;
}

export const ScreeningCandidateModal: React.FC<ScreeningCandidateModalProps> = ({
  candidate,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-glass border border-white/50 w-full max-w-6xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-inter text-slate-900">{candidate.candidate_name}</h2>
              <p className="text-sm text-slate-600">{candidate.file_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Scores */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">AI Fit Score</h3>
                </div>
                <div className="text-2xl font-bold text-blue-900">{candidate.ai_fit_score}%</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-green-900">Skill Match</h3>
                </div>
                <div className="text-2xl font-bold text-green-900">{Math.round(candidate.skill_similarity * 100)}%</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Questions Generated</h3>
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {candidate.questions_generated ? candidate.generated_questions.length : 0}
                </div>
              </div>
            </div>

            {/* Middle Column - Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-slate-900">Summary</h3>
                </div>
                <p className="text-sm text-slate-700 bg-white/50 p-3 rounded-xl">
                  {candidate.candidate_summary}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                  <h3 className="font-semibold text-slate-900">Education</h3>
                </div>
                <p className="text-sm text-slate-700 bg-white/50 p-3 rounded-xl">
                  {candidate.education_highlights}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-slate-900">Experience</h3>
                </div>
                <p className="text-sm text-slate-700 bg-white/50 p-3 rounded-xl">
                  {candidate.experience_highlights}
                </p>
              </div>
            </div>

            {/* Right Column - Skills and Gaps */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Skills Assessment</h3>
                
                {candidate.skill_assessment.exact_matches.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-green-700 mb-2 font-medium">Exact Matches</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skill_assessment.exact_matches.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {candidate.skill_assessment.transferable_skills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-blue-700 mb-2 font-medium">Transferable Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skill_assessment.transferable_skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {candidate.skill_assessment.non_technical_skills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-purple-700 mb-2 font-medium">Non-Technical Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skill_assessment.non_technical_skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {candidate.gaps.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <h3 className="font-semibold text-slate-900">Key Gaps</h3>
                  </div>
                  <div className="space-y-2">
                    {candidate.gaps.map((gap, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">AI Justification</h3>
                <p className="text-sm text-slate-700 bg-gradient-to-br from-slate-50 to-blue-50 p-3 rounded-xl border border-white/50">
                  {candidate.ai_justification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
