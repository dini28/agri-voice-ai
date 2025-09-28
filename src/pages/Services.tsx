import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Bug,
  Mountain,
  Banknote,
  CloudRain,
  TrendingUp,
  Users,
  Headphones,
  Leaf,
  Shield,
  Zap,
  MessageCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Services = () => {
  const mainServices = [
    {
      id: 'crops',
      icon: <Sprout className="h-8 w-8" />,
      title: 'Crop Guidance',
      description: 'Complete guidance from seed selection to harvesting for all major crops',
      image: 'https://images.unsplash.com/photo-1577381232223-86d8d71e2603?q=80&w=1041&auto=format',
      features: [
        'Seed Selection',
        'Planting Time',
        'Irrigation Schedule',
        'Harvesting Tips'
      ],
      crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits', 'Pulses', 'Spices']
    },
    {
      id: 'pest',
      icon: <Bug className="h-8 w-8" />,
      title: 'Pest & Disease Management',
      description: 'Identify and treat crop pests and diseases with effective solutions',
      image: 'https://images.unsplash.com/photo-1743698210748-42294da79c6f?q=80&w=1163&auto=format',
      features: [
        'Pest Identification',
        'Disease Diagnosis',
        'Treatment Methods',
        'Prevention Tips'
      ],
      pests: ['Aphids', 'Bollworm', 'Fungal Diseases', 'Bacterial Infections', 'Viral Diseases', 'Nematodes']
    },
    {
      id: 'soil',
      icon: <Mountain className="h-8 w-8" />,
      title: 'Soil Health Management',
      description: 'Soil testing, nutrient management, and fertilizer recommendations',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&auto=format',
      features: [
        'Soil Testing',
        'pH Management',
        'Fertilizer Guide',
        'Organic Methods'
      ],
      types: ['Sandy', 'Clay', 'Loamy', 'Black Cotton', 'Red Soil', 'Alluvial']
    },
    {
      id: 'schemes',
      icon: <Banknote className="h-8 w-8" />,
      title: 'Government Schemes',
      description: 'Information about subsidies, loans, and government support for farmers',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format',
      features: [
        'PM-KISAN Scheme',
        'Crop Insurance',
        'KCC Loans',
        'Equipment Subsidy'
      ],
      schemes: ['PM-KISAN', 'PMFBY', 'KCC', 'NABARD', 'State Schemes', 'DBT Schemes']
    }
  ];

  const additionalServices = [
    {
      icon: <CloudRain className="h-6 w-6" />,
      title: 'Weather Updates',
      description: 'Real-time weather forecasts and farming advisories'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Market Prices',
      description: 'Current market rates for crops and commodities'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Consultation',
      description: 'Connect with agricultural experts for personalized advice'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance in multiple languages'
    }
  ];

  const benefits = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: 'Sustainable Farming',
      description: 'Eco-friendly practices for long-term soil health'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Reliable Information',
      description: 'Verified content from agricultural experts'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Quick Solutions',
      description: 'Instant answers to your farming questions'
    }
  ];

  return (
    <div className="bg-gradient-sky">
      <Header />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=1080&fit=crop&auto=format"
            alt="Agricultural field background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Our Services
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-6 drop-shadow-md">
              Complete Agricultural Solutions
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Comprehensive farming solutions from crop guidance to government schemes.
              Everything you need for successful agriculture in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {mainServices.map((service, index) => (
              <div key={service.id} id={service.id}>
                <Card className="overflow-hidden bg-card border-border shadow-natural">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={service.image}
                        alt={`${service.title} illustration`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:from-transparent lg:via-black/20 lg:to-black/60"></div>
                      <div className="absolute bottom-4 left-4 lg:top-4 lg:right-4 lg:bottom-auto lg:left-auto">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-10">
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-foreground mb-3">{service.title}</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {service.description}
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-lg">Key Features:</h3>
                          <ul className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-lg">
                            {service.id === 'crops' ? 'Supported Crops:' :
                              service.id === 'pest' ? 'Common Issues:' :
                                service.id === 'soil' ? 'Soil Types:' : 'Available Schemes:'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {(service.crops || service.pests || service.types || service.schemes)?.map((item, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Card className="p-4 bg-muted/50 border-border/50">
                          <h4 className="font-medium text-foreground mb-2">Sample Questions:</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            {service.id === 'crops' && (
                              <>
                                <p>• "What is the best time to plant wheat in winter?"</p>
                                <p>• "Which rice variety gives the highest yield?"</p>
                              </>
                            )}
                            {service.id === 'pest' && (
                              <>
                                <p>• "How to identify and treat aphids in cotton?"</p>
                                <p>• "What are the symptoms of fungal disease in tomatoes?"</p>
                              </>
                            )}
                            {service.id === 'soil' && (
                              <>
                                <p>• "How to improve soil pH for better crop growth?"</p>
                                <p>• "Which fertilizer is best for black cotton soil?"</p>
                              </>
                            )}
                            {service.id === 'schemes' && (
                              <>
                                <p>• "How to apply for PM-KISAN scheme?"</p>
                                <p>• "What is the eligibility criteria for crop insurance?"</p>
                              </>
                            )}
                          </div>
                        </Card>

                        <Button asChild className="bg-gradient-primary hover:opacity-90">
                          <Link to="/" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Ask AgriBot
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground">
              More ways we support your farming journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card key={index} className="p-6 bg-card border-border shadow-natural text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of farmers across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;