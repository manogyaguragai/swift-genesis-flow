
import React from 'react';
import { HeroSection } from '../components/Home/HeroSection';
import { TestimonialsSection } from '../components/Home/TestimonialsSection';
import { WhyChooseSection } from '../components/Home/WhyChooseSection';
import SolutionSummarySection from '../components/Home/SolutionSummarySection';

const HomePage: React.FC = () => {
  return (
    <div className="font-open-sans">
      <HeroSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <SolutionSummarySection />
    </div>
  );
};

export default HomePage;
