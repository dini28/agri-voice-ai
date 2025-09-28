import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Download,
    Calendar,
    Play,
    Lightbulb,
    Clock,
} from 'lucide-react';

const ResourceCard = ({ resource, categoryId }) => {
    const getIcon = () => {
        switch (categoryId) {
            case 'guides':
                return (
                    <div className="bg-red-500 text-white p-1 rounded text-xs flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        PDF
                    </div>
                );
            case 'videos':
                return (
                    <div className="bg-red-600 text-white p-2 rounded-full">
                        <Play className="h-4 w-4" />
                    </div>
                );
            case 'calendar':
                return (
                    <div className="bg-blue-500 text-white p-1 rounded text-xs flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        CAL
                    </div>
                );
            case 'tips':
                return (
                    <div className="bg-yellow-500 text-white p-2 rounded-full">
                        <Lightbulb className="h-4 w-4" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="overflow-hidden bg-muted/50 border-border/50 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            {/* Thumbnail Image */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={resource.image}
                    alt={resource.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-2 right-2">
                    {getIcon()}
                </div>
                {resource.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                    </div>
                )}
            </div>

            <div className="p-4">
                <h4 className="font-medium text-foreground text-sm leading-tight mb-2">
                    {resource.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 flex-wrap">
                        {resource.type && <Badge variant="outline" className="text-xs">{resource.type}</Badge>}
                        {resource.size && <span>{resource.size}</span>}
                        {resource.views && <span>{resource.views} views</span>}
                        {resource.season && <span>{resource.season}</span>}
                        {resource.crops && <span>{resource.crops}</span>}
                        {resource.category && <Badge variant="outline" className="text-xs">{resource.category}</Badge>}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ResourceCard;
