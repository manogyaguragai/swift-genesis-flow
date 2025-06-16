
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';

const Orb = lazy(() => import('./Orb'));

interface LazyOrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

const OrbFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse" />
);

export const LazyOrb: React.FC<LazyOrbProps> = (props) => {
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
      { threshold: 0.1 }
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
          <Orb {...props} />
        </Suspense>
      ) : (
        <OrbFallback />
      )}
    </div>
  );
};

export default LazyOrb;
