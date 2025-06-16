
import React from 'react';
import { FileText, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Candidate } from '../../store/dashboardStore';

interface ResumeViewerProps {
  candidate: Candidate;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ candidate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-glass border border-white/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl font-bold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-inter mb-2">{candidate.name}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{candidate.mobile_number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4 flex items-center space-x-2">
              <User className="w-6 h-6 text-primary" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-slate-700 font-ibm leading-relaxed bg-slate-50 p-4 rounded-lg">
              {candidate.summary}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">Skills & Expertise</h2>
            <div className="space-y-4">
              {candidate.skills.exact_matches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.exact_matches.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {candidate.skills.transferable.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Transferable Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.transferable.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">Experience Highlights</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-700 font-ibm leading-relaxed">{candidate.experience_highlights}</p>
              </div>
            </div>
          )}

          {/* Education */}
          {candidate.education_highlights && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">Education</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-700 font-ibm leading-relaxed">{candidate.education_highlights}</p>
              </div>
            </div>
          )}

          {/* Full Resume Content */}
          {candidate.resume_content && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary" />
                <span>Complete Resume</span>
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                  {candidate.resume_content}
                </pre>
              </div>
            </div>
          )}

          {/* AI Assessment */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">AI Assessment</h2>
            <p className="text-slate-700 font-ibm leading-relaxed">{candidate.justification}</p>
            <div className="mt-4 flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{candidate.fitScore.toFixed(1)}%</div>
                <div className="text-sm text-slate-600">Fit Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{(candidate.overall_similarity * 100).toFixed(1)}%</div>
                <div className="text-sm text-slate-600">Similarity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
