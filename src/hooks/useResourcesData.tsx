import {
  BookOpen,
  Video,
  Calendar,
  Lightbulb,
} from 'lucide-react';

export const useResourcesData = () => {
  const resourceCategories = [
    {
      id: 'guides',
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Farming Guides',
      description: 'Comprehensive guides for different crops and farming techniques',
      count: '50+ Guides',
      resources: [
        {
          name: 'Rice Cultivation Guide',
          type: 'PDF',
          size: '2.5MB',
          image: 'https://images.unsplash.com/photo-1677142713811-1ed7964e875d?q=80&w=687&auto=format'
        },
        {
          name: 'Wheat Farming Manual',
          type: 'PDF',
          size: '3.1MB',
          image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Organic Farming Basics',
          type: 'PDF',
          size: '1.8MB',
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Pest Control Methods',
          type: 'PDF',
          size: '2.2MB',
          image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1296&auto=format'
        }
      ]
    },
    {
      id: 'videos',
      icon: <Video className="h-8 w-8" />,
      title: 'Training Videos',
      description: 'Video tutorials on modern farming techniques and practices',
      count: '100+ Videos',
      resources: [
        {
          name: 'Modern Irrigation Techniques',
          duration: '15:30',
          views: '25K',
          image: 'https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?q=80&w=1170&auto=format'
        },
        {
          name: 'Soil Testing Methods',
          duration: '12:45',
          views: '18K',
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Crop Disease Identification',
          duration: '20:15',
          views: '32K',
          image: 'https://images.unsplash.com/photo-1744282728788-5a001de64f76?q=80&w=687&auto=format'
        },
        {
          name: 'Fertilizer Application Guide',
          duration: '18:20',
          views: '22K',
          image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&auto=format'
        }
      ]
    },
    {
      id: 'calendar',
      icon: <Calendar className="h-8 w-8" />,
      title: 'Crop Calendar',
      description: 'Seasonal farming calendar with planting and harvesting schedules',
      count: 'All Seasons',
      resources: [
        {
          name: 'Kharif Season Calendar',
          season: 'Jun-Oct',
          crops: '12 Crops',
          image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Rabi Season Calendar',
          season: 'Nov-Apr',
          crops: '15 Crops',
          image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Summer Crops Calendar',
          season: 'Mar-Jun',
          crops: '8 Crops',
          image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Vegetable Growing Calendar',
          season: 'Year Round',
          crops: '25 Vegetables',
          image: 'https://images.unsplash.com/photo-1489450278009-822e9be04dff?w=600&auto=format'
        }
      ]
    },
    {
      id: 'tips',
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Farming Tips',
      description: 'Quick tips and best practices for successful farming',
      count: '200+ Tips',
      resources: [
        {
          name: 'Water Conservation Tips',
          category: 'Water Management',
          image: 'https://images.unsplash.com/photo-1650048612173-aef50e27884d?q=80&w=1170&auto=format'
        },
        {
          name: 'Cost Reduction Strategies',
          category: 'Economics',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Yield Improvement Methods',
          category: 'Productivity',
          image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&auto=format'
        },
        {
          name: 'Post-Harvest Management',
          category: 'Storage',
          image: 'https://images.unsplash.com/photo-1758533696874-587c4e62940c?q=80&w=1170&auto=format'
        }
      ]
    }
  ];

  return { resourceCategories };
};