
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';

const AnimatedTestimonials = lazy(() => import('./animated-testimonials').then(module => ({ default: module.AnimatedTestimonials })));

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface LazyAnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

// Optimized fallback component that matches the layout
const TestimonialsFallback = () => (
  <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
    <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
      {/* Image placeholder */}
      <div className="relative">
        <div className="h-80 w-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl animate-pulse"></div>
      </div>
      {/* Text placeholder */}
      <div className="flex flex-col justify-between py-4">
        <div className="space-y-4">
          <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
          <div className="space-y-2 mt-8">
            <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
          </div>
        </div>
        <div className="flex gap-4 pt-12 md:pt-0">
          <div className="h-7 w-7 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="h-7 w-7 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export const LazyAnimatedTestimonials: React.FC<LazyAnimatedTestimonialsProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' // Start loading when element is 50px away from viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <Suspense fallback={<TestimonialsFallback />}>
          <AnimatedTestimonials {...props} />
        </Suspense>
      ) : (
        <TestimonialsFallback />
      )}
    </div>
  );
};

export default LazyAnimatedTestimonials;
