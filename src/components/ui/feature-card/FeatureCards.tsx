
import React, { useState, useRef, useEffect } from 'react';
import { Feature } from './types';
import { FeatureCard } from './FeatureCard';
import { LoadingFeatureCard } from './LoadingFeatureCard';
import { defaultFeatures } from './defaultFeatures';

interface FeatureCardsProps {
  features?: Feature[];
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresToRender = features || defaultFeatures;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simulate loading time for smoother UX
          setTimeout(() => setIsLoaded(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      {isVisible && isLoaded ? (
        featuresToRender.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            animationDelay={feature.animationDelay}
            cardIndex={index}
          />
        ))
      ) : (
        // Show loading cards
        Array.from({ length: featuresToRender.length }).map((_, index) => (
          <LoadingFeatureCard key={`loading-${index}`} />
        ))
      )}
    </div>
  );
};
