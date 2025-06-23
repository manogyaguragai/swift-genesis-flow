
import React from 'react';
import { LazyAnimatedTestimonials } from '../ui/LazyAnimatedTestimonials';

const testimonials = [
  {
    quote: "Kandidex has completely transformed our hiring process. What used to take weeks now takes days. The AI-powered screening is incredibly accurate and saves us countless hours.",
    name: "Sarah Johnson",
    designation: "Senior HR Manager at TechCorp",
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "The interview question generator is a game-changer. It creates personalized questions based on each candidate's experience. Our interview quality has improved dramatically.",
    name: "Michael Chen",
    designation: "Talent Acquisition Lead at StartupXYZ",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "I love how Kandidex provides backup candidate suggestions. When our top choice declined, we immediately had qualified alternatives. No more starting from scratch!",
    name: "Emily Rodriguez",
    designation: "Head of Recruitment at Global Innovations",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "The skill matching accuracy is phenomenal. Kandidex understands not just keywords but actual competencies. It's like having an AI recruiting expert on our team.",
    name: "David Thompson",
    designation: "HR Director at Fortune Tech",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=faces&auto=format",
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Reduced geometric background textures */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-12 left-20 w-4 h-4 border-2 border-secondary/20 rotate-45"></div>
        <div className="absolute top-28 right-32 w-3 h-3 bg-primary/15 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 border-l-4 border-t-4 border-secondary/20 rotate-45"></div>
        <div className="absolute top-1/3 right-20 w-2 h-8 bg-primary/10 rounded-full rotate-45"></div>
      </div>

      {/* Optimized background decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-purple-300/20 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-inter text-slate-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600 font-ibm max-w-3xl mx-auto">
            Join HR professionals who have transformed their hiring process with Kandidex
          </p>
        </div>

        <LazyAnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
};
