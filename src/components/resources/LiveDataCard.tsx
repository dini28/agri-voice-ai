import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveDataCard = ({ data }) => {
    return (
        <Card className="overflow-hidden bg-card border-border shadow-natural hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                        {data.icon}
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white text-lg drop-shadow-md">{data.title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-muted-foreground mb-4">{data.description}</p>
                <div className="flex items-center justify-between">
                    <Badge
                        variant={data.status === 'Live Data' ? 'default' : 'secondary'}
                        className={data.status === 'Live Data' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                        {data.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{data.update}</span>
                </div>
            </div>
        </Card>
    );
};

export default LiveDataCard;