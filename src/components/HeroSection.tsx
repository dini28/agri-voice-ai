import React from 'react';
import { MessageCircle, Mic, Globe } from 'lucide-react';
import heroImage from '@/assets/agri-hero.jpg';

interface HeroSectionProps {
    className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
    const heroFeatures = [
        { icon: MessageCircle, label: 'AI-Powered Chat' },
        { icon: Mic, label: 'Voice Support' },
        { icon: Globe, label: 'Multi-Language' },
    ];

    return (
        <section className={`relative h-screen overflow-hidden ${className}`}>
            {/* Full height background image */}
            <div
                className="absolute inset-0 h-screen bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <div className="space-y-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Your Smart Agricultural Assistant
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                            Get comprehensive solutions for all your farming needs. Complete information about crops, soil health,
                            pest control, fertilizers, and government schemes.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 pt-8">
                            {heroFeatures.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};