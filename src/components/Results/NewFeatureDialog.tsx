
import React from 'react';
import { X, Brain, MessageSquare, Users, Target, Clock, Zap } from 'lucide-react';

interface NewFeatureDialogProps {
  onClose: () => void;
}

export const NewFeatureDialog: React.FC<NewFeatureDialogProps> = ({ onClose }) => {
  const features = [
    {
      icon: Brain,
      title: "AI Interview Questions",
      description: "Generate personalized interview questions based on candidate profiles and job requirements.",
      status: "New"
    },
    {
      icon: MessageSquare,
      title: "Smart Email Templates",
      description: "Send selection, rejection, or custom emails with AI-crafted professional templates.",
      status: "New"
    },
    {
      icon: Users,
      title: "Candidate Comparison",
      description: "Side-by-side candidate analysis with detailed skill and experience breakdowns.",
      status: "Coming Soon"
    },
    {
      icon: Target,
      title: "Advanced Filtering",
      description: "Filter candidates by specific skills, experience levels, and custom criteria.",
      status: "Coming Soon"
    },
    {
      icon: Clock,
      title: "Interview Scheduling",
      description: "Integrated calendar system for seamless interview coordination and reminders.",
      status: "Coming Soon"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Share candidate insights with your team and make collaborative hiring decisions.",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border-b border-white/50 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-inter text-slate-900">
                  🎉 New Features Unlocked!
                </h2>
                <p className="text-slate-600 font-ibm">
                  Discover the latest AI-powered hiring tools
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors group"
            >
              <X className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-glass border border-white/50 hover:shadow-glass-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold font-inter text-slate-900">{feature.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        feature.status === 'New' 
                          ? 'bg-success/10 text-success border border-success/20' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-ibm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
            <div className="text-center">
              <h3 className="text-lg font-bold font-inter text-slate-900 mb-2">
                Ready to explore these features?
              </h3>
              <p className="text-slate-600 font-ibm mb-4">
                Start using the new AI interview questions and email templates right away!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:from-secondary hover:to-primary transition-all duration-300 hover:scale-105 shadow-glow-blue"
              >
                Let's Get Started!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
