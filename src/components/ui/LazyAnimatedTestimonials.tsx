
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

export const LazyAnimatedTestimonials: React.FC<LazyAnimatedTestimonialsProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <Suspense fallback={<div className="h-96" />}>
          <AnimatedTestimonials {...props} />
        </Suspense>
      ) : (
        <div className="h-96" />
      )}
    </div>
  );
};

export default LazyAnimatedTestimonials;
