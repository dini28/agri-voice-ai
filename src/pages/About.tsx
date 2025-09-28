import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, Users, Target, Award, Brain, Leaf, Globe, Shield } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const About = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced artificial intelligence to provide accurate agricultural guidance'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Multilingual Support',
      description: 'Communicate in Hindi, English, Tamil, Telugu, Kannada, and Marathi'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Sustainable Farming',
      description: 'Promoting eco-friendly and sustainable agricultural practices'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trusted Information',
      description: 'Verified agricultural knowledge from expert sources'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Agricultural Expert',
      expertise: 'Crop Science & Soil Health',
      experience: '15+ years'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Plant Pathologist',
      expertise: 'Pest & Disease Management',
      experience: '12+ years'
    },
    {
      name: 'Prof. Arun Patel',
      role: 'Agricultural Engineer',
      expertise: 'Farm Technology & Equipment',
      experience: '18+ years'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Farmers Helped' },
    { number: '25+', label: 'Crop Types' },
    { number: '6', label: 'Languages' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <div className="bg-gradient-sky">
      <Header />
      {/* Hero Section */}
      <section
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2589&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About AgriNova
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Revolutionizing Indian Agriculture with AI
            </p>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto drop-shadow">
              AgriNova is a revolutionary AI-powered agricultural assistant for Indian farmers. Our mission is to
              empower farmers through advanced technology and promote sustainable agriculture practices across India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-card border-border shadow-natural">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize agricultural knowledge by providing every farmer with access to expert guidance,
                modern farming techniques, and government resources through AI-powered technology. We believe that
                every farmer deserves access to the best agricultural knowledge and tools to maximize their yields
                and ensure sustainable farming practices.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border shadow-natural">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted agricultural assistant, empowering millions of farmers with
                knowledge and technology for sustainable and profitable farming. We envision a future where
                technology bridges the gap between traditional farming wisdom and modern agricultural science.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose AgriNova?
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

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Making a real difference in the lives of farmers across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Expert Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced agricultural professionals ensuring accurate and reliable guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="p-6 bg-card border-border shadow-natural text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                <p className="text-sm text-muted-foreground mb-2">{member.expertise}</p>
                <p className="text-xs text-muted-foreground">{member.experience} experience</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-gradient-primary text-primary-foreground text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Join thousands of farmers who are already using AgriNova to improve their agricultural practices
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
      <Footer />
    </div>
  );
};

export default About;