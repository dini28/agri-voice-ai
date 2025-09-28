import React from 'react';
import LiveDataCard from './LiveDataCard';
import {
    CloudRain,
    TrendingUp,
    FileText,
} from 'lucide-react';

const LiveDataSection = () => {
    const liveData = [
        {
            icon: <CloudRain className="h-6 w-6" />,
            title: 'Weather Forecast',
            description: 'Real-time weather updates for farming decisions',
            status: 'Live Data',
            update: 'Updated every hour',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop&auto=format'
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: 'Market Prices',
            description: 'Current commodity prices from major markets',
            status: 'Live Data',
            update: 'Updated daily',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format'
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: 'Government Notifications',
            description: 'Latest announcements and scheme updates',
            status: 'Updated',
            update: 'As available',
            image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1074&auto=format'
        }
    ];

    return (
        <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Live Agricultural Data
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Real-time information to help make informed farming decisions
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {liveData.map((data, index) => (
                        <LiveDataCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveDataSection;
