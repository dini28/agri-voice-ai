import React from 'react';
import HeroSection from '@/components/resources/HeroSection';
import ResourceCategory from '@/components/resources/ResourceCategory';
import LiveDataSection from '@/components/resources/LiveDataSection';
import QuickLinksSection from '@/components/resources/QuickLinksSection';
import { useResourcesData } from '@/hooks/useResourcesData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Resources = () => {
  const { resourceCategories } = useResourcesData();

  return (
    <div className="bg-gradient-sky">
      <Header />
      <HeroSection />
      {/* Resource Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {resourceCategories.map((category) => (
              <ResourceCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <LiveDataSection />
      <QuickLinksSection />
      <Footer />
    </div>
  );
};

export default Resources;