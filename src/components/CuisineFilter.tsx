import React from 'react';
import {
  Pizza,
  Fish,
  Beef,
  Salad,
  Soup,
  Sandwich,
  Wheat,
  IceCream,
  UtensilsCross
} from 'lucide-react';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Define the structure for a cuisine item
type Cuisine = {
  value: string;
  label: string;
  icon: React.ElementType;
};

// A predefined list of cuisines with associated icons
const cuisines: Cuisine[] = [
  { value: 'pizza', label: 'Pizza', icon: Pizza },
  { value: 'sushi', label: 'Sushi', icon: Fish },
  { value: 'burgers', label: 'Burgers', icon: Beef },
  { value: 'salads', label: 'Salads', icon: Salad },
  { value: 'soups', label: 'Soups', icon: Soup },
  { value: 'sandwiches', label: 'Sandwiches', icon: Sandwich },
  { value: 'pasta', label: 'Pasta', icon: Wheat },
  { value: 'desserts', label: 'Desserts', icon: IceCream },
  { value: 'asian', label: 'Asian', icon: UtensilsCross },
];

interface CuisineFilterProps {
  /**
   * Callback function that receives an array of the selected cuisine values.
   */
  onFilterChange: (selectedCuisines: string[]) => void;
  /**
   * Optional default selected values for the filter.
   */
  defaultValue?: string[];
}

/**
 * A horizontal scrolling filter for food cuisines.
 */
const CuisineFilter: React.FC<CuisineFilterProps> = ({ onFilterChange, defaultValue = [] }) => {
  console.log('CuisineFilter loaded');

  return (
    <div className="w-full py-2">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-2 p-1">
          <ToggleGroup
            type="multiple"
            variant="outline"
            className="justify-start"
            onValueChange={onFilterChange}
            defaultValue={defaultValue}
          >
            {cuisines.map((cuisine) => (
              <ToggleGroupItem
                key={cuisine.value}
                value={cuisine.value}
                aria-label={`Filter by ${cuisine.label}`}
                className="flex h-10 items-center gap-2 px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <cuisine.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{cuisine.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </div>
  );
};

export default CuisineFilter;