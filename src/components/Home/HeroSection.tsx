
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LazyOrb } from '../ui/LazyOrb';
import { FlipWords } from '../ui/flip-words';

export const HeroSection: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isOrbHovered, setIsOrbHovered] = useState(false);
  
  const flipWords = ["Smarter", "Faster", "Inclusively"];

  useEffect(() => {
    const sequence = [
      { delay: 1000, phase: 1 },
      { delay: 2000, phase: 2 },
      { delay: 3000, phase: 3 },
    ];

    sequence.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Reduced geometric background textures for better performance */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-10 w-4 h-4 border-l-4 border-t-4 border-primary/20 rotate-45"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-secondary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary/10 rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 border-r-4 border-b-4 border-primary/15 rotate-12"></div>
      </div>

      {/* Optimized background decorations with GPU acceleration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-purple-300/20 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold font-inter text-slate-900 leading-tight">
                <span className="text-slate-900">Hire </span>
                <FlipWords 
                  words={flipWords} 
                  duration={1500}
                />
                <br />
                <span className="text-slate-900">using </span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="text-xl text-slate-600 font-ibm mt-6 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Transform your recruitment process with intelligent resume screening, instant candidate ranking, and AI-generated interview questions. Make hiring decisions faster, smarter, and more accurate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/workflow"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold font-inter rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group will-change-transform"
              >
                <span>Explore Our Features</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/screen-candidates"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-primary/20 text-primary font-semibold font-inter rounded-xl hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 will-change-transform"
              >
                <span>Start Your Free Trial</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold font-inter text-primary">90%</div>
                <div className="text-sm text-slate-600 font-ibm">Faster Screening</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold font-inter text-secondary">High</div>
                <div className="text-sm text-slate-600 font-ibm">Accuracy Rate</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold font-inter text-purple-600">24/7</div>
                <div className="text-sm text-slate-600 font-ibm">AI Assistant</div>
              </div>
            </div>
          </div>

          {/* Right Content - Lazy Loaded Orb */}
          <div className="relative animate-scale-in flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-96 h-96 max-w-full">
              {/* Orb Container */}
              <div 
                className="absolute inset-0 rounded-full overflow-hidden"
                onMouseEnter={() => setIsOrbHovered(true)}
                onMouseLeave={() => setIsOrbHovered(false)}
              >
                <LazyOrb
                  hue={0}
                  hoverIntensity={1.9}
                  rotateOnHover={true}
                  forceHoverState={false}
                />
              </div>
              
              {/* Kandidex Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img 
                  src="/gradient.png" 
                  alt="Kandidex Logo"
                  className={`h-28 w-auto object-contain transition-all duration-500 will-change-transform ${
                    isOrbHovered 
                      ? 'drop-shadow-[0_0_20px_rgba(37,99,235,0.6)] filter brightness-110' 
                      : 'drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]'
                  }`}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
