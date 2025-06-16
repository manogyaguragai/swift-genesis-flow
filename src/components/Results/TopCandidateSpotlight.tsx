
import React from 'react';
import { Candidate } from '../../store/dashboardStore';
import { Trophy, Star, Mail, Phone, MessageSquare, Award, Target, Zap } from 'lucide-react';

interface TopCandidateSpotlightProps {
  candidate: Candidate;
}

export const TopCandidateSpotlight: React.FC<TopCandidateSpotlightProps> = ({ candidate }) => {
  if (!candidate) return null;

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

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 border-b border-amber-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold font-inter text-slate-900">Top Candidate</h2>
            <p className="text-sm text-yellow-700 font-ibm">Best match for your role</p>
          </div>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="p-6 space-y-6">
        {/* Name and Contact */}
        <div className="text-center">
          <h3 className="text-2xl font-bold font-inter text-slate-900 mb-2">{candidate.name}</h3>
          <div className="flex justify-center space-x-4 mb-4">
            <a 
              href={`mailto:${candidate.email}`}
              className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{candidate.email}</span>
            </a>
            <a 
              href={`tel:${candidate.mobile_number}`}
              className="flex items-center space-x-1 text-success hover:text-success/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{candidate.mobile_number}</span>
            </a>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border text-center ${getScoreBg(candidate.fitScore)}`}>
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-slate-600">Fit Score</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(candidate.fitScore)}`}>
              {candidate.fitScore.toFixed(1)}%
            </div>
          </div>
          
          <div className="p-4 rounded-lg border text-center bg-blue-50 border-blue-200">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-slate-600">Similarity</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {(candidate.overall_similarity * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3 flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Key Skills</span>
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Exact Matches</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.exact_matches.slice(0, 6).map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-success/10 text-success text-sm rounded-full font-ibm border border-success/20"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.exact_matches.length > 6 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-ibm">
                    +{candidate.skills.exact_matches.length - 6} more
                  </span>
                )}
              </div>
            </div>
            
            {candidate.skills.transferable.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Transferable Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.transferable.slice(0, 4).map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-ibm border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.transferable.length > 4 && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full font-ibm">
                      +{candidate.skills.transferable.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3">Summary</h4>
          <p className="text-sm text-slate-600 font-ibm leading-relaxed">{candidate.summary}</p>
        </div>

        {/* Experience Highlights */}
        {candidate.experience_highlights && (
          <div>
            <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3">Experience Highlights</h4>
            <p className="text-sm text-slate-600 font-ibm leading-relaxed">{candidate.experience_highlights}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-slate-200">
          <a 
            href={`mailto:${candidate.email}`}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Contact via Email
          </a>
          <a 
            href={`tel:${candidate.mobile_number}`}
            className="flex-1 bg-success text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-success/90 transition-all hover:scale-105 shadow-lg"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};
