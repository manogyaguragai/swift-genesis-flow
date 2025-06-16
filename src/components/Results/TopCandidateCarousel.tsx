
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Target, Mail, Crown, Trophy } from 'lucide-react';
import { Candidate } from '../../store/dashboardStore';
import { EmailModal } from './EmailModal';

interface TopCandidateCarouselProps {
  candidates: Candidate[];
}

export const TopCandidateCarousel: React.FC<TopCandidateCarouselProps> = ({ candidates }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCandidateForEmail, setSelectedCandidateForEmail] = useState<Candidate | null>(null);

  const nextCandidate = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.min(candidates.length, 3));
  };

  const prevCandidate = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.min(candidates.length, 3)) % Math.min(candidates.length, 3));
  };

  if (candidates.length === 0) {
    return null;
  }

  const topThree = candidates.slice(0, 3);
  const currentCandidate = topThree[currentIndex];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-yellow-100';
    return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 shadow-red-100';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500 animate-pulse" />;
    if (index === 1) return <Award className="w-5 h-5 text-gray-400" />;
    return <Award className="w-5 h-5 text-orange-600" />;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600 shadow-yellow-200';
    if (index === 1) return 'from-gray-300 to-gray-500 shadow-gray-200';
    return 'from-orange-400 to-orange-600 shadow-orange-200';
  };

  const getRankTitle = (index: number) => {
    if (index === 0) return 'Champion';
    if (index === 1) return 'Runner-up';
    return 'Top Contender';
  };

  return (
    <>
      <div className="space-y-4 sticky top-32">
        {/* Header with Navigation Above Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white animate-pulse" />
            </div> */}
            <div>
              {/* <h3 className="text-xl font-bold font-inter text-slate-900">
                Elite Candidates
              </h3> */}
              <div className="px-10 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20">
                <span className="text-large font-semibold text-primary">Top 3 Candidates</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          {topThree.length > 1 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={prevCandidate}
                className="w-10 h-10 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 rounded-xl transition-all duration-300 hover:scale-110 border border-primary/20 group flex items-center justify-center shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-primary group-hover:animate-pulse" />
              </button>
              
              <div className="flex space-x-2">
                {topThree.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCandidate}
                className="w-10 h-10 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 rounded-xl transition-all duration-300 hover:scale-110 border border-primary/20 group flex items-center justify-center shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-primary group-hover:animate-pulse" />
              </button>
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden animate-fade-in">
          <div className="space-y-8 transition-all duration-500">
            {/* Enhanced candidate info */}
            <div className="text-center relative">
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br ${getRankColor(currentIndex)} rounded-full flex items-center justify-center shadow-xl border-2 border-white z-10`}>
                <span className="text-white font-bold text-sm">#{currentIndex + 1}</span>
              </div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30 relative ring-4 ring-white">
                <span className="text-3xl font-bold text-white">
                  {currentCandidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <h4 className="text-2xl font-bold font-inter text-slate-900 mb-3">
                {currentCandidate.name}
              </h4>
              <div className="flex items-center justify-center space-x-3 mb-2">
                {getRankIcon(currentIndex)}
                <span className="text-lg font-semibold text-slate-600">
                  {getRankTitle(currentIndex)}
                </span>
              </div>
              <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block">
                {currentCandidate.file_name}
              </div>
            </div>

            {/* Enhanced scores */}
            <div className="grid grid-cols-1 gap-6">
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${getScoreBg(currentCandidate.fitScore)}`}>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold text-slate-700">AI Fit Score</span>
                </div>
                <div className="text-center">
                  <span className={`text-4xl font-bold ${getScoreColor(currentCandidate.fitScore)}`}>
                    {currentCandidate.fitScore.toFixed(1)}%
                  </span>
                  <div className="text-sm text-slate-500 mt-2 font-medium">Perfect Match Rating</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                  <span className="text-lg font-bold text-slate-700">Job Similarity</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-blue-600">
                    {(currentCandidate.overall_similarity * 100).toFixed(1)}%
                  </span>
                  <div className="text-sm text-slate-500 mt-2 font-medium">Role Alignment</div>
                </div>
              </div>
            </div>

            {/* Enhanced skills */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold text-slate-700">Core Expertise</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentCandidate.skills.exact_matches.slice(0, 4).map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-success/10 to-emerald-50 text-success text-sm font-medium rounded-full border border-success/20 hover:scale-105 transition-transform shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
                {currentCandidate.skills.exact_matches.length > 4 && (
                  <span className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-sm font-medium rounded-full hover:from-slate-200 hover:to-slate-300 transition-all cursor-pointer shadow-sm">
                    +{currentCandidate.skills.exact_matches.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced email action */}
            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => setSelectedCandidateForEmail(currentCandidate)}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-2xl text-lg font-bold hover:from-secondary hover:to-primary transition-all hover:scale-105 shadow-2xl shadow-primary/30 flex items-center justify-center space-x-3 group border border-primary/20"
              >
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                <span>Contact Candidate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
