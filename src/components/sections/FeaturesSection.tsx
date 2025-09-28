import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Brain,
  Mic,
  Globe,
  Shield,
  Smartphone,
  BarChart3,
  Clock,
  Users
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced AI technology provides accurate agricultural guidance and recommendations based on real-time data and expert knowledge.'
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: 'Voice Interaction',
      description: 'Speak naturally in your preferred language. Our voice recognition technology understands regional accents and dialects.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Multi-Language Support',
      description: 'Available in Hindi, English, Tamil, Telugu, Kannada, and Marathi to serve farmers across India.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Reliable & Secure',
      description: 'Your data is protected with enterprise-grade security. All conversations are encrypted and privacy-focused.'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Optimized',
      description: 'Works seamlessly on all devices. Access AgriBot from your smartphone, tablet, or computer anywhere.'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Data-Driven Insights',
      description: 'Get actionable insights based on weather patterns, soil conditions, and market trends for better decision making.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Availability',
      description: 'Get instant answers to your farming questions anytime, anywhere. No waiting for office hours or expert appointments.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Support',
      description: 'Connect with other farmers and agricultural experts. Share experiences and learn from the farming community.'
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose AgriBot?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced features designed specifically for Indian agriculture and farming needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card border-border shadow-natural text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;