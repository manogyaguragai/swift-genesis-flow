
import React from 'react';
import { Brain, MessageSquare, Sparkles, Target, Users, Zap } from 'lucide-react';

export const FeatureHighlight: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-purple-50 rounded-2xl border border-primary/20 p-8 mb-8 relative overflow-hidden animate-fade-in">
      {/* Background decorations */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/10 rounded-full blur-lg"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-semibold font-inter">New Feature Unlocked!</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-slate-900 mb-3">
            AI-Powered Interview Questions
          </h2>
          <p className="text-slate-600 font-ibm text-lg max-w-3xl mx-auto">
            Now generate personalized interview questions for each candidate based on their experience and your job requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-inter text-slate-900 mb-2">Soft Skills Assessment</h3>
            <p className="text-sm text-slate-600 font-ibm">
              Generate questions focused on communication, leadership, and teamwork based on the candidate's background
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-inter text-slate-900 mb-2">Technical Expertise</h3>
            <p className="text-sm text-slate-600 font-ibm">
              Create targeted questions about programming languages, frameworks, and technical skills mentioned in their resume
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-inter text-slate-900 mb-2">Coding Challenges</h3>
            <p className="text-sm text-slate-600 font-ibm">
              Optionally include practical coding problems to assess hands-on programming abilities
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-slate-500 font-ibm bg-white/60 px-4 py-2 rounded-full">
            <MessageSquare className="w-4 h-4" />
            <span>Look for the</span>
            <div className="inline-flex items-center bg-gradient-to-r from-secondary to-purple-600 text-white px-2 py-1 rounded text-xs">
              <Brain className="w-3 h-3 mr-1" />
              Generate
            </div>
            <span>button in the candidate list below</span>
          </div>
        </div>
      </div>
    </div>
  );
};
