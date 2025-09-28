import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  MessageCircle,
  Globe,
  Award,
  Clock
} from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: '50,000+',
      label: 'Active Farmers',
      description: 'Farmers using AgriBot daily'
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      value: '2M+',
      label: 'Questions Answered',
      description: 'Agricultural queries resolved'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: '6',
      label: 'Languages Supported',
      description: 'Regional languages covered'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: '35%',
      label: 'Yield Increase',
      description: 'Average crop yield improvement'
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: '98%',
      label: 'Accuracy Rate',
      description: 'Correct agricultural advice'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: '< 3s',
      label: 'Response Time',
      description: 'Average response speed'
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by farmers nationwide with measurable results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card border-border shadow-natural text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
              <h4 className="font-semibold text-foreground mb-2">{stat.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border-border shadow-natural rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join the Agricultural Revolution
            </h3>
            <p className="text-muted-foreground text-lg">
              Every day, thousands of farmers across India rely on AgriBot for expert agricultural guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Real-time Support
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Expert Knowledge
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Always Learning
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;