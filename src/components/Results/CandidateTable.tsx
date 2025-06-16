import React, { useState } from 'react';
import { useDashboardStore, Candidate } from '../../store/dashboardStore';
import { ChevronDown, ChevronUp, Mail, Eye, Star, Brain, Trophy, Award } from 'lucide-react';
import { InterviewQuestionsModal } from './InterviewQuestionsModal';
import { EmailModal } from './EmailModal';

interface CandidateTableProps {
  candidates: Candidate[];
  onCandidateClick: (candidate: any) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates, onCandidateClick }) => {
  const [selectedCandidateForQuestions, setSelectedCandidateForQuestions] = useState<string | null>(null);
  const [selectedCandidateForEmail, setSelectedCandidateForEmail] = useState<Candidate | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 shadow-emerald-200';
    if (score >= 60) return 'bg-amber-500 shadow-amber-200';
    return 'bg-red-500 shadow-red-200';
  };

  const getRankBadgeStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-xl shadow-yellow-200 ring-2 ring-yellow-300';
      case 1: return 'bg-gradient-to-r from-slate-300 to-slate-500 shadow-xl shadow-slate-200 ring-2 ring-slate-300';
      case 2: return 'bg-gradient-to-r from-amber-500 to-amber-700 shadow-xl shadow-amber-200 ring-2 ring-amber-300';
      default: return 'bg-gradient-to-r from-slate-200 to-slate-400 shadow-lg';
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-3 h-3 text-yellow-100 animate-pulse" />;
    if (index === 1) return <Award className="w-3 h-3 text-slate-100" />;
    if (index === 2) return <Award className="w-3 h-3 text-amber-100" />;
    return null;
  };

  if (candidates.length === 0) {
    return null;
  }

  const tableCandidates = candidates

  return (
    <>
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-8 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-inter text-slate-900 animate-slide-in-right flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span>Top {tableCandidates.length} Candidates</span>
              </h2>
              {/* <p className="text-slate-500 font-ibm mt-2 animate-fade-in text-lg">
                Top {tableCandidates.length} candidates ranked by AI analysis
              </p> */}
            </div>
            {/* <div className="flex items-center space-x-3 animate-scale-in">
              <div className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20">
                <span className="text-sm font-semibold text-primary flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Elite Matches</span>
                </span>
              </div>
            </div> */}
          </div>
        </div>

        <div className="w-full">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm border-b border-slate-200/50">
              <tr>
                <th className="text-left p-6 text-sm font-bold font-inter text-slate-700 w-24">
                  <div className="flex items-center space-x-2">
                    {/* <Trophy className="w-4 h-4 text-primary" /> */}
                    <span>Rank</span>
                  </div>
                </th>
                <th className="text-left p-6 text-sm font-bold font-inter text-slate-700 w-80">
                  <div className="flex items-center space-x-2 ">
                    <span>Candidate Name</span>
                  </div>
                </th>
                <th className="text-left p-6 text-sm font-bold font-inter text-slate-700 w-40">
                  {/* <div className="flex items-center space-x-2 group cursor-pointer"> */}
                    <span>AI Fit Score</span>
                    {/* <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" /> */}
                  {/* </div> */}
                </th>
                <th className="text-left p-6 text-sm font-bold font-inter text-slate-700 flex-1 ">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-emerald-500" />
                    <span>Exact Skill Matches</span>
                  </div>
                </th>
                <th className="text-left p-6 text-sm font-bold font-inter text-slate-700 w-44 text-center">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100/50">
              {tableCandidates.map((candidate, index) => (
                <tr 
                  key={candidate.id} 
                  className="hover:bg-gradient-to-r hover:from-slate-50/60 hover:to-blue-50/40 transition-all duration-300 group animate-fade-in backdrop-blur-sm border-b border-slate-50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="p-6 align-middle">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white transform transition-all hover:scale-110 ${getRankBadgeStyle(index)} relative`}>
                        <span className="relative z-10">{index + 1}</span>
                        {getRankIcon(index) && (
                          <div className="absolute -top-1 -right-1">
                            {getRankIcon(index)}
                          </div>
                        )}
                      </div>
                      {index < 3 && (
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                          <div className="text-xs font-semibold text-yellow-600">TOP</div>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-6 align-middle">
                    <div className="group-hover:translate-x-1 transition-transform">
                      <p className="font-bold font-inter text-slate-900 text-lg leading-tight">{candidate.name}</p>
                      <p className="text-sm text-slate-500 font-ibm mt-1 bg-slate-50 px-2 py-1 rounded-lg inline-block">{candidate.file_name}</p>
                    </div>
                  </td>
                  
                  <td className="p-6 align-middle">
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105 shadow-lg ${getScoreColor(candidate.fitScore)}`}>
                        {candidate.fitScore.toFixed(1)}%
                      </div>
                      {/* <div className={`w-4 h-4 rounded-full transition-all hover:scale-125 shadow-lg ${getScoreBadgeColor(candidate.fitScore)}`}></div> */}
                    </div>
                  </td>
                  
                  <td className="p-6 align-middle">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.exact_matches.slice(0, 8).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all hover:scale-105 animate-scale-in shadow-sm"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.exact_matches.length > 8 && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-sm font-medium rounded-full border border-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all cursor-pointer">
                          +{candidate.skills.exact_matches.length - 8} more
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-6 align-middle">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onCandidateClick(candidate)}
                        className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110 border border-slate-200 hover:border-primary/30"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setSelectedCandidateForQuestions(candidate.id)}
                        className="p-2.5 bg-gradient-to-r from-secondary to-purple-600 text-white hover:from-purple-600 hover:to-secondary rounded-xl transition-all hover:scale-110 shadow-lg hover:shadow-xl border border-purple-300"
                        title="Generate Interview Questions"
                      >
                        <Brain className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setSelectedCandidateForEmail(candidate)}
                        className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110 border border-slate-200 hover:border-primary/30"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interview Questions Modal */}
      <InterviewQuestionsModal
        candidateId={selectedCandidateForQuestions || ''}
        isOpen={!!selectedCandidateForQuestions}
        onClose={() => setSelectedCandidateForQuestions(null)}
      />

      {/* Email Modal */}
      {selectedCandidateForEmail && (
        <EmailModal
          candidate={selectedCandidateForEmail}
          onClose={() => setSelectedCandidateForEmail(null)}
        />
      )}
    </>
  );
};
