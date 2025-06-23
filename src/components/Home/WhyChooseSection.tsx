import React from 'react';
import { FeatureCards } from '../ui/feature-cards';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Reduced geometric background textures for better performance */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-16 right-24 w-5 h-5 border-2 border-primary/20 rotate-45"></div>
        <div className="absolute top-32 left-16 w-3 h-3 bg-secondary/15 rounded-full"></div>
        <div className="absolute bottom-40 right-16 w-4 h-4 border-l-4 border-t-4 border-purple-300/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-10 bg-primary/10 rounded-full rotate-12"></div>
      </div>

      {/* Optimized background decorations with GPU acceleration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/10 to-purple-300/10 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '3s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-inter text-slate-900 mb-6">
            Why Choose Kandidex?
          </h2>
          <p className="text-lg-thin text-slate-600 font-open-sans-thin font-thin max-w-3xl mx-auto">
            Experience the future of recruitment with our AI-powered platform that transforms how you find and hire top talent
          </p>
        </div>

        <FeatureCards />
      </div>
    </section>
  );
};
