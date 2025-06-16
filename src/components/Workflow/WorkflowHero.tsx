
import React from 'react';

export const WorkflowHero: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-purple-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl lg:text-6xl font-bold font-inter text-slate-900 mb-6 animate-fade-in">
          How <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex</span> Works
        </h1>
        <p className="text-xl text-slate-600 font-ibm max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          From resume upload to final candidate selection - see how our AI streamlines your entire hiring process
        </p>
      </div>
    </section>
  );
};
