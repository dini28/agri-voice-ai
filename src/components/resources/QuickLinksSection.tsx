import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const QuickLinksSection = () => {
    const quickLinks = [
        {
            name: 'Soil Testing Centers',
            category: 'Testing',
            image: 'https://images.unsplash.com/photo-1618158807378-35769f30af82?q=80&w=1074&auto=format'
        },
        {
            name: 'Agricultural Universities',
            category: 'Education',
            image: 'https://images.unsplash.com/photo-1605535839586-68f3358463a1?q=80&w=1170&auto=format'
        },
        {
            name: 'Agricultural Loans',
            category: 'Finance',
            image: 'https://images.unsplash.com/photo-1565373679107-344d38dbf734?q=80&w=1170&auto=format'
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Quick Links
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Important agricultural contacts and resources
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {quickLinks.map((link, index) => (
                        <Card key={index} className="overflow-hidden bg-card border-border shadow-natural hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                            {/* Image Header */}
                            <div className="relative h-32 overflow-hidden">
                                <img
                                    src={link.image}
                                    alt={link.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h4 className="font-medium text-white text-lg text-center drop-shadow-md px-2">{link.name}</h4>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">{link.category}</Badge>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickLinksSection;