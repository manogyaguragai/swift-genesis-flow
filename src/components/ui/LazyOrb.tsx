
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';

const Orb = lazy(() => import('./Orb'));

interface LazyOrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

const OrbFallback = () => (
  <div className="w-full h-full relative">
    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50"></div>
    </div>
  </div>
);

export const LazyOrb: React.FC<LazyOrbProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay to make the loading transition smoother
          setTimeout(() => setIsLoaded(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible ? (
        <Suspense fallback={<OrbFallback />}>
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Orb {...props} />
          </div>
        </Suspense>
      ) : (
        <OrbFallback />
      )}
    </div>
  );
};

export default LazyOrb;
