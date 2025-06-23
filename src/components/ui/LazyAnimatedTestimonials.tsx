
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';
import { Skeleton } from './skeleton';

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

const TestimonialsFallback = () => (
  <div className="mx-auto max-w-sm px-4 py-20 md:max-w-4xl md:px-8 lg:px-12">
    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
      <div className="relative h-80 w-full">
        <Skeleton className="h-full w-full rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl animate-pulse" />
      </div>
      <div className="flex flex-col justify-between py-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
        <div className="flex gap-4 pt-12">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export const LazyAnimatedTestimonials: React.FC<LazyAnimatedTestimonialsProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Preload images when component becomes visible
          props.testimonials.forEach(testimonial => {
            const img = new Image();
            img.src = testimonial.src;
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [props.testimonials]);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <Suspense fallback={<TestimonialsFallback />}>
          <AnimatedTestimonials 
            {...props} 
            onLoad={() => setIsLoaded(true)}
          />
        </Suspense>
      ) : (
        <TestimonialsFallback />
      )}
    </div>
  );
};

export default LazyAnimatedTestimonials;
