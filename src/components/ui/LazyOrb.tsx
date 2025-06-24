
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';

const Orb = lazy(() => import('./Orb'));

interface LazyOrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

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
        <Suspense fallback={<div className="w-full h-full" />}>
          <Orb {...props} />
        </Suspense>
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  );
};

export default LazyOrb;
