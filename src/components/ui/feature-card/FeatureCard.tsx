
import React from 'react';
import { FeatureCardProps } from './types';
import { Card, CardTitle, CardDescription, CardSkeletonContainer } from './CardComponents';
import { FeatureSkeleton } from './FeatureSkeleton';

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  animationDelay = 0, 
  cardIndex 
}) => {
  return (
    <Card>
      <CardSkeletonContainer>
        <FeatureSkeleton icon={icon} animationDelay={animationDelay} cardIndex={cardIndex} />
      </CardSkeletonContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};
