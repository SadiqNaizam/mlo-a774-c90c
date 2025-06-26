import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import CuisineFilter from '@/components/CuisineFilter';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

const popularRestaurants = [
  {
    slug: 'the-gourmet-kitchen',
    name: 'The Gourmet Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
    cuisines: ['Italian', 'Pasta'],
    rating: 4.7,
    deliveryTime: '25-35 min',
  },
  {
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=60',
    cuisines: ['Japanese', 'Sushi'],
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
  {
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60',
    cuisines: ['American', 'Burgers'],
    rating: 4.5,
    deliveryTime: '20-30 min',
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=60',
    cuisines: ['Mexican', 'Tacos'],
    rating: 4.6,
    deliveryTime: '25-35 min',
  },
];

const newRestaurants = [
    {
        slug: 'pizza-palace',
        name: 'Pizza Palace',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=60',
        cuisines: ['Pizza', 'Italian'],
        rating: 4.8,
        deliveryTime: '35-45 min',
    },
    {
        slug: 'the-salad-spot',
        name: 'The Salad Spot',
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=60',
        cuisines: ['Healthy', 'Salads'],
        rating: 4.4,
        deliveryTime: '15-25 min',
    },
    {
        slug: 'pho-king-good',
        name: 'Pho King Good',
        imageUrl: 'https://images.unsplash.com/photo-1585523382368-15d233c06849?auto=format&fit=crop&w=800&q=60',
        cuisines: ['Vietnamese', 'Noodles'],
        rating: 4.7,
        deliveryTime: '30-40 min',
    },
    {
        slug: 'curry-corner',
        name: 'Curry Corner',
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c7373094?auto=format&fit=crop&w=800&q=60',
        cuisines: ['Indian', 'Curry'],
        rating: 4.5,
        deliveryTime: '40-50 min',
    }
]

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('HomePage loaded');
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[225px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-muted/20">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80"
                alt="A table spread with various delicious food dishes"
                className="w-full h-full object-cover"
            />
          <div className="container relative z-20 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl drop-shadow-lg">
                Your Next Meal, Delivered.
              </h1>
              <p className="mt-4 text-gray-200 md:text-xl drop-shadow-md">
                Craving something delicious? Find your favorite restaurants and get it delivered fast.
              </p>
              <div className="relative mt-8 max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Find a restaurant..."
                  className="w-full pl-12 h-12 rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Cuisine Filter Section */}
            <section className="mb-12">
                <CuisineFilter onFilterChange={(cuisines) => console.log('Selected cuisines:', cuisines)} />
            </section>

            {/* Popular Restaurants Section */}
            <section id="restaurants" className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Popular Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {loading
                ? renderSkeletons()
                : popularRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.slug} {...restaurant} />
                    ))}
            </div>
            </section>

            {/* New Restaurants Section */}
            <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">New on FlavorFlow</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {loading
                ? renderSkeletons()
                : newRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.slug} {...restaurant} />
                    ))}
            </div>
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;