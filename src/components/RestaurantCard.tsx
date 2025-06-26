import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  slug: string; // For future dynamic routing, e.g., /restaurant/slug
  name: string;
  imageUrl: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string; // e.g., "25-35 min"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisines,
  rating,
  deliveryTime,
}) => {
  console.log('RestaurantCard loaded for:', name);

  // Note: The link currently points to a static route as per App.tsx.
  // The 'slug' prop is included for future-proofing when routes become dynamic.
  return (
    <Link to="/restaurant-menu" className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 truncate">{name}</h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {cuisines.map((cuisine) => (
              <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-dashed">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;