import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import ResourceCard from './ResourceCard';

const ResourceCategory = ({ category }) => {
    return (
        <div id={category.id}>
            <Card className="overflow-hidden bg-card border-border shadow-natural">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground">
                                {category.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
                                <p className="text-lg text-muted-foreground mt-1">{category.description}</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                            {category.count}
                        </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {category.resources.map((resource, idx) => (
                            <ResourceCard
                                key={idx}
                                resource={resource}
                                categoryId={category.id}
                            />
                        ))}
                    </div>

                    <Button variant="outline" className="border-border hover:bg-muted">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View All {category.title}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ResourceCategory;
