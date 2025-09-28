import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageCircle,
  Brain,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Ask Your Question',
      description: 'Simply ask your farming question in your preferred language - text or voice. Our AI understands natural language and regional dialects.'
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your question using vast agricultural knowledge, current data, and expert insights to provide the most accurate answer.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Get Smart Solutions',
      description: 'Receive comprehensive, actionable advice tailored to your specific farming conditions, crop type, and regional requirements.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Improve Your Yields',
      description: 'Apply the recommendations and see significant improvements in your crop yields, pest control, and overall farming efficiency.'
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform makes agricultural expertise accessible to every farmer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 bg-card border-border shadow-natural text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                {step.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;