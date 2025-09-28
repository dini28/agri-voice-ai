// pages/Index.tsx - Home page
import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

import CtaSection from '@/components/sections/CtaSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="bg-gradient-sky min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;