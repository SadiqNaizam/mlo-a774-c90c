import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price }) => {
  const [quantity, setQuantity] = useState(0);

  console.log('MenuItem loaded for:', name);

  const handleAddToCart = () => {
    setQuantity(1);
    toast.success(`${name} added to cart!`);
    // In a real app, you would also dispatch an action to a global state manager (e.g., Redux, Zustand)
    console.log(`Added item ${id} to cart.`);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    console.log(`Increased quantity for item ${id}.`);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    console.log(`Decreased quantity for item ${id}.`);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex-1 pr-4">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold text-gray-900 mt-2">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-end w-32">
        {quantity === 0 ? (
          <Button variant="outline" size="sm" onClick={handleAddToCart}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-center w-8 text-lg">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;