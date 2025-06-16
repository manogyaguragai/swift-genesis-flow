
import React from 'react';
import { Feature } from './types';
import { FeatureCard } from './FeatureCard';
import { defaultFeatures } from './defaultFeatures';

interface FeatureCardsProps {
  features?: Feature[];
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  const featuresToRender = features || defaultFeatures;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      {featuresToRender.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          animationDelay={feature.animationDelay}
          cardIndex={index}
        />
      ))}
    </div>
  );
};
