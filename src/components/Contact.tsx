import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    Globe,
    Users,
    AlertCircle,
    Facebook,
    Twitter,
    Instagram,
    Youtube
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        language: 'english'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert("Message Sent Successfully! We'll get back to you within 24 hours.");

        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            category: '',
            message: '',
            language: 'english'
        });
        setIsSubmitting(false);
    };

    const contactMethods = [
        {
            icon: <MessageCircle className="h-6 w-6" />,
            title: 'Chat Support',
            description: 'Instant help through AgriBot',
            value: 'Available 24/7',
            action: 'Start Chat',
            href: '/',
            primary: true
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: 'Phone Support',
            description: 'Speak with our agricultural experts',
            value: '1800-123-456 (Toll Free)',
            action: 'Call Now',
            href: 'tel:+911800123456'
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: 'Email Support',
            description: 'Get detailed written responses',
            value: 'support@agribot.com',
            action: 'Send Email',
            href: 'mailto:support@agribot.com'
        }
    ];

    const officeInfo = [
        {
            icon: <MapPin className="h-5 w-5" />,
            label: 'Address',
            value: 'Agricultural Technology Hub, Krishi Bhawan, New Delhi - 110001, India'
        },
        {
            icon: <Clock className="h-5 w-5" />,
            label: 'Office Hours',
            value: 'Monday - Friday: 9:00 AM - 6:00 PM IST'
        },
        {
            icon: <Globe className="h-5 w-5" />,
            label: 'Languages Supported',
            value: 'Hindi, English, Tamil, Telugu, Kannada, Marathi'
        },
        {
            icon: <Users className="h-5 w-5" />,
            label: 'Support Team',
            value: '50+ Agricultural Experts & Tech Support Specialists'
        }
    ];

    const faqQuick = [
        {
            question: 'How do I start using AgriBot?',
            answer: 'Simply visit our homepage and start typing your farming questions in the chat interface.'
        },
        {
            question: 'Is AgriBot free to use?',
            answer: 'Yes, AgriBot is completely free for all farmers and agricultural professionals.'
        },
        {
            question: 'Which languages are supported?',
            answer: 'We support Hindi, English, Tamil, Telugu, Kannada, and Marathi languages.'
        },
        {
            question: 'How accurate is the agricultural advice?',
            answer: 'Our advice is based on verified agricultural research and reviewed by expert agronomists.'
        }
    ];

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', color: 'text-blue-500' },
        { name: 'Twitter', icon: Twitter, href: '#', color: 'text-blue-400' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'text-pink-500' },
        { name: 'YouTube', icon: Youtube, href: '#', color: 'text-red-500' },
    ];

    const handleLinkClick = (href) => {
        if (href.startsWith('mailto:') || href.startsWith('tel:')) {
            window.location.href = href;
        } else if (href.startsWith('#')) {
            console.log('Social media link clicked:', href);
        } else {
            console.log('Navigate to:', href);
        }
    };

    return (
        <div className="bg-gradient-sky">
            {/* Hero Section */}
            <section
                className="h-screen relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                            Contact Us
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
                            Get Expert Agricultural Support
                        </p>
                        <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto drop-shadow">
                            Our team is always ready to help you. Contact us for any agricultural questions or technical support.
                            We're here to empower your farming journey with expert guidance and advanced technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            How Can We Help You?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose the best way to reach us. Our agricultural experts are ready to assist you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
                        {contactMethods.map((method, index) => (
                            <Card key={index} className={`p-6 bg-card border-border shadow-natural hover:shadow-lg transition-shadow ${method.primary ? 'ring-2 ring-primary/20' : ''}`}>
                                <div className="text-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${method.primary ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                                        {method.icon}
                                    </div>
                                    {method.primary && (
                                        <Badge className="mb-3 bg-gradient-primary hover:opacity-90">Most Popular</Badge>
                                    )}
                                    <h3 className="text-xl font-bold text-foreground mb-3">{method.title}</h3>
                                    <p className="text-muted-foreground mb-4">{method.description}</p>
                                    <div className="mb-6">
                                        <p className="font-medium text-foreground">{method.value}</p>
                                    </div>
                                    <Button
                                        onClick={() => handleLinkClick(method.href)}
                                        className={method.primary ? 'bg-gradient-primary hover:opacity-90 w-full' : 'w-full'}
                                        variant={method.primary ? 'default' : 'outline'}
                                    >
                                        <div className="flex items-center gap-2 justify-center">
                                            {method.primary ? <MessageCircle className="h-4 w-4" /> :
                                                method.title.includes('Phone') ? <Phone className="h-4 w-4" /> :
                                                    <Mail className="h-4 w-4" />}
                                            {method.action}
                                        </div>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Office Information */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Office Information
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Find out more about our location, working hours, and support capabilities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {officeInfo.map((info, index) => (
                            <Card key={index} className="p-6 bg-card border-border shadow-natural text-center">
                                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                                    {info.icon}
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{info.label}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{info.value}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick FAQ */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Quick answers to common questions about AgriBot
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {faqQuick.map((faq, index) => (
                            <Card key={index} className="p-6 bg-card border-border shadow-natural">
                                <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Send Us a Message
                            </h2>
                            <p className="text-muted-foreground">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>

                        <Card className="p-8 bg-card border-border shadow-natural">
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Query Category</Label>
                                        <Select onValueChange={(value) => handleInputChange('category', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="crop-guidance">Crop Guidance</SelectItem>
                                                <SelectItem value="pest-control">Pest Control</SelectItem>
                                                <SelectItem value="soil-health">Soil Health</SelectItem>
                                                <SelectItem value="weather">Weather Information</SelectItem>
                                                <SelectItem value="government-schemes">Government Schemes</SelectItem>
                                                <SelectItem value="technical-support">Technical Support</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        placeholder="Brief subject of your query"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        placeholder="Describe your query in detail..."
                                        rows={5}
                                        required
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-primary hover:opacity-90"
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Send className="h-4 w-4" />
                                            Send Message
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Emergency Support */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Card className="p-8 bg-gradient-primary text-primary-foreground text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <AlertCircle className="h-6 w-6" />
                            <h2 className="text-2xl font-bold">Emergency Agricultural Support</h2>
                        </div>
                        <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                            For urgent crop diseases, pest attacks, or weather-related farming emergencies,
                            get immediate assistance through our 24/7 support channels.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => handleLinkClick('/')}
                                variant="secondary"
                                size="lg"
                                className="text-primary"
                            >
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Emergency Chat Support
                            </Button>
                            <Button
                                onClick={() => handleLinkClick('/')}
                                variant="secondary"
                                size="lg"
                                className="text-primary"
                            >
                                <Phone className="h-5 w-5 mr-2" />
                                Emergency Helpline
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Connect With Us
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Follow us on social media for the latest agricultural tips and updates
                        </p>
                        <div className="flex justify-center gap-4">
                            {socialLinks.map(({ name, icon: Icon, href, color }) => (
                                <Button
                                    key={name}
                                    variant="outline"
                                    size="lg"
                                    onClick={() => handleLinkClick(href)}
                                    className={`${color} hover:bg-muted transition-colors`}
                                >
                                    <Icon className="h-5 w-5 mr-2" />
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;