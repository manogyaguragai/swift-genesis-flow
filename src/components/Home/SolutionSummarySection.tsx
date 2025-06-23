
import React from 'react';
import { Check, Users, Brain, Target, Zap } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import { GlareCard } from '../ui/glare-card';

const SolutionSummarySection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Resume Screening",
      description: "AI analyzes and ranks candidates based on job requirements"
    },
    {
      icon: Brain,
      title: "Intelligent Matching",
      description: "Advanced algorithms find the perfect candidate-job fit"
    },
    {
      icon: Target,
      title: "Precision Hiring",
      description: "Data-driven decisions for better recruitment outcomes"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process hundreds of resumes in minutes, not hours"
    }
  ];

  const benefits = [
    "95% reduction in screening time",
    "80% improvement in candidate quality",
    "Eliminate unconscious bias",
    "Scalable for any team size",
    "Seamless integration with existing workflows"
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Reduced geometric background textures */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-24 left-12 w-5 h-5 border-2 border-primary/20 rotate-45"></div>
        <div className="absolute top-40 right-28 w-3 h-3 bg-secondary/15 rounded-full"></div>
        <div className="absolute bottom-28 right-12 w-4 h-4 border-l-4 border-t-4 border-primary/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/5 w-2 h-12 bg-secondary/10 rounded-full rotate-12"></div>
      </div>

      {/* Optimized background decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-purple-300/20 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-inter text-slate-900 mb-6">
            Complete HR Solution with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex</span>
          </h2>
          <p className="text-lg-thin text-slate-600 font-open-sans-thin font-thin max-w-3xl mx-auto leading-relaxed">
            Transform your hiring process with our comprehensive AI-powered platform that handles everything from resume screening to candidate recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Features Grid with GlareCard */}
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {features.map((feature, index) => (
              <div key={index} className="h-48 animate-scale-in will-change-transform" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <GlareCard>
                  <div className="p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-300 will-change-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-inter text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 font-open-sans-thin font-thin text-sm-thin leading-relaxed flex-1">{feature.description}</p>
                  </div>
                </GlareCard>
              </div>
            ))}
          </div>

          {/* Benefits List - Updated with SpotlightCard and proper Check icons */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <SpotlightCard 
              className="p-8" 
              spotlightColor="rgba(37, 99, 235, 0.2)"
            >
              <h3 className="text-2xl font-bold font-inter text-slate-900 mb-6">Why Choose Kandidex?</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-slide-in-right will-change-transform" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-blue">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-open-sans-thin font-thin text-base-thin">{benefit}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10 shadow-glass">
            <h3 className="text-2xl font-bold font-inter text-slate-900 mb-4">
              Ready to revolutionize your hiring process?
            </h3>
            <p className="text-slate-600 font-open-sans-thin font-thin text-base-thin mb-6 max-w-2xl mx-auto">
              Join hundreds of companies that have transformed their recruitment with Kandidex's AI-powered solutions.
            </p>
            <a href="/screen-candidates">
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold font-inter hover:from-secondary hover:to-primary transition-all duration-300 hover:scale-105 shadow-glow-blue will-change-transform">
                Start Your Free Trial
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSummarySection;
