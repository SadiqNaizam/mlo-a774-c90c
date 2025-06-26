import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChefHat, PackageCheck, Bike, CheckCircle } from 'lucide-react';

// Define the possible statuses for an order in a specific sequence.
const orderStatuses = ['Order Placed', 'In the Kitchen', 'Out for Delivery', 'Delivered'] as const;

// Create a TypeScript type from the array of statuses.
type OrderStatus = typeof orderStatuses[number];

// Define the props for the OrderTracker component.
interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

// Define the structure for each step in the tracker.
const steps = [
  {
    name: 'Order Placed',
    icon: PackageCheck,
  },
  {
    name: 'In the Kitchen',
    icon: ChefHat,
  },
  {
    name: 'Out for Delivery',
    icon: Bike,
  },
  {
    name: 'Delivered',
    icon: CheckCircle,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStatusIndex = orderStatuses.indexOf(currentStatus);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStatusIndex;
            const isActive = index === currentStatusIndex;

            return (
              <React.Fragment key={step.name}>
                {/* Step Item */}
                <div className="flex flex-col items-center gap-2 text-center w-20">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                      isCompleted ? "bg-secondary border-secondary/80 text-secondary-foreground" : "",
                      isActive ? "bg-primary border-primary/80 text-primary-foreground animate-pulse" : "",
                      !isCompleted && !isActive ? "bg-muted border-border text-muted-foreground" : ""
                    )}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p
                    className={cn(
                      "text-xs sm:text-sm font-medium",
                      isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </p>
                </div>

                {/* Connecting Line (not after the last step) */}
                {index < steps.length - 1 && (
                  <div className={cn(
                      "flex-1 h-1 mx-2 rounded-full transition-colors",
                      isCompleted ? "bg-secondary" : "bg-muted"
                  )}/>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;