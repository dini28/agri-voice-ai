import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="p-8 bg-gradient-primary text-primary-foreground text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-primary-foreground/80 mb-6 leading-relaxed">
            Join thousands of farmers who are already using AgriBot to improve their agricultural practices
            and increase their yields. Experience the power of AI-driven farming guidance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="secondary" className="text-base px-6 py-2">
              Free to Use
            </Badge>
            <Badge variant="secondary" className="text-base px-6 py-2">
              24/7 Available
            </Badge>
            <Badge variant="secondary" className="text-base px-6 py-2">
              Expert Guidance
            </Badge>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CtaSection;