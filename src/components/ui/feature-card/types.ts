
export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  animationDelay: number;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  animationDelay?: number;
  cardIndex: number;
}
