import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/MenuItem';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Icons
import { Star, MapPin, Clock, ShoppingCart } from 'lucide-react';

// Placeholder data for the restaurant menu
const restaurantData = {
  name: "Sushi Masa",
  imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1974&auto=format&fit=crop",
  cuisine: "Japanese",
  rating: 4.8,
  reviews: 320,
  address: "123 Cherry Blossom Lane, Foodie City",
  openingHours: "11:00 AM - 10:00 PM",
};

const menuData = [
  {
    category: "Appetizers",
    items: [
      { id: 1, name: "Edamame", description: "Steamed young soybeans, lightly salted.", price: 5.50 },
      { id: 2, name: "Gyoza", description: "Pan-fried pork and vegetable dumplings.", price: 7.00 },
      { id: 3, name: "Agedashi Tofu", description: "Deep-fried tofu in a savory dashi broth.", price: 6.50 },
    ],
  },
  {
    category: "Signature Rolls",
    items: [
      { id: 4, name: "Dragon Roll", description: "Eel and cucumber topped with avocado and eel sauce.", price: 15.00 },
      { id: 5, name: "Spicy Tuna Roll", description: "Tuna, spicy mayo, and cucumber.", price: 12.50 },
      { id: 6, name: "Rainbow Roll", description: "Crab stick, avocado, cucumber, topped with assorted fish.", price: 16.00 },
      { id: 7, name: "Volcano Roll", description: "California roll topped with baked spicy crab and scallop mix.", price: 17.50 },
    ],
  },
  {
    category: "Nigiri & Sashimi",
    items: [
      { id: 8, name: "Tuna (Maguro) Nigiri", description: "A slice of fresh tuna over pressed vinegar rice. 2 pieces.", price: 8.00 },
      { id: 9, name: "Salmon (Sake) Sashimi", description: "Thick slices of fresh Atlantic salmon. 5 pieces.", price: 14.00 },
      { id: 10, name: "Yellowtail (Hamachi) Nigiri", description: "A slice of fresh yellowtail over pressed vinegar rice. 2 pieces.", price: 9.00 },
    ],
  },
];


const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const totalItemsInCart = 3; // Placeholder

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Restaurant Banner Image */}
        <div className="h-64 md:h-80 w-full overflow-hidden">
          <img
            src={restaurantData.imageUrl}
            alt={`${restaurantData.name} restaurant banner`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 -mt-16">
          {/* Restaurant Details Card */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">{restaurantData.cuisine}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold">{restaurantData.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{restaurantData.rating} ({restaurantData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurantData.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurantData.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Menu Section */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  {menuData.map((category) => (
                    <section key={category.category} className="mb-8 last:mb-0">
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">{category.category}</h2>
                      <div className="divide-y">
                        {category.items.map((item) => (
                          <MenuItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      <div className="sticky bottom-6 container mx-auto px-4 md:px-6 flex justify-end">
        <Button asChild size="lg" className="rounded-full shadow-lg">
          <Link to="/checkout">
            <ShoppingCart className="mr-2 h-5 w-5" />
            View Cart ({totalItemsInCart})
          </Link>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;