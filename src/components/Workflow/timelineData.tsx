
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Users, Brain, UserCheck, ArrowRight, CheckCircle, FileText, Zap, Target, Users2 } from 'lucide-react';

export const timelineData = [
  {
    title: "Upload Resumes",
    content: (
      <div>
        <div className="mb-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Effortless Resume Processing</h4>
            <p className="text-slate-600 font-ibm">
              Drag and drop PDF files or ZIP archives containing multiple resumes. Our AI instantly processes and extracts key information from your candidate pool.
            </p>
          </div>
        </div>
        
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Support for PDF and ZIP files</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Bulk processing capabilities</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Instant data extraction</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border">
            <FileText className="w-8 h-8 text-primary mb-2" />
            <h5 className="font-semibold text-slate-900 mb-1">PDF Support</h5>
            <p className="text-sm text-slate-600">Individual resume files processed instantly</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border">
            <Zap className="w-8 h-8 text-secondary mb-2" />
            <h5 className="font-semibold text-slate-900 mb-1">Bulk Processing</h5>
            <p className="text-sm text-slate-600">ZIP archives with multiple resumes</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Get Top 10 Candidates",
    content: (
      <div>
        <div className="mb-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">AI-Powered Candidate Ranking</h4>
            <p className="text-slate-600 font-ibm">
              Our AI analyzes resumes against your job description and ranks candidates by skills, experience, and overall fit score to present you with the top 10 matches.
            </p>
          </div>
        </div>
        
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Intelligent skill matching</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Experience evaluation</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Comprehensive scoring system</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border">
            <Target className="w-8 h-8 text-primary mb-2" />
            <h5 className="font-semibold text-slate-900 mb-1">Precision Matching</h5>
            <p className="text-sm text-slate-600">Advanced algorithms for accurate candidate scoring</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border">
            <Users2 className="w-8 h-8 text-secondary mb-2" />
            <h5 className="font-semibold text-slate-900 mb-1">Top 10 Results</h5>
            <p className="text-sm text-slate-600">Curated list of best-fit candidates</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Generate Interview Questions",
    content: (
      <div>
        <div className="mb-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Personalized Interview Questions</h4>
            <p className="text-slate-600 font-ibm">
              Create personalized interview questions based on each candidate's background and your specific requirements to ensure comprehensive evaluation.
            </p>
          </div>
        </div>
        
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Tailored to candidate experience</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Soft and hard skill assessment</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Optional coding challenges</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h5 className="font-bold text-slate-900 mb-4">Sample Generated Questions:</h5>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>"Based on your React experience, how would you optimize component performance?"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-secondary font-bold">•</span>
              <span>"Describe a challenging project from your portfolio and your problem-solving approach."</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>"How do you stay updated with the latest technologies in your field?"</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Get Substitute Candidates",
    content: (
      <div>
        <div className="mb-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Backup Candidate Pool</h4>
            <p className="text-slate-600 font-ibm">
              When your first choice declines, instantly access backup candidates with similar qualifications and skills. Never worry about starting the search from scratch.
            </p>
          </div>
        </div>
        
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Similar skill profiles</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Experience matching</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700">Seamless fallback options</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
          <h5 className="font-bold text-slate-900 mb-3">Ready to Get Started?</h5>
          <p className="text-slate-600 mb-4">
            Experience the complete Kandidex workflow and see how AI can transform your hiring process.
          </p>
          <Link
            to="/screen-candidates"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-glow-blue hover:scale-105 transition-all duration-300 group"
          >
            <span>Try Kandidex Live</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    ),
  },
];
