import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Bike, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveMapView: React.FC = () => {
  console.log('LiveMapView loaded');

  // Define path coordinates for the SVG and the animation
  const path = "M 40 40 Q 150 120 260 210";
  // Restaurant is at start of path, Home is at the end.
  const restaurantPosition = { top: '25px', left: '25px' }; // Corresponds to M 40 40 (approx)
  const homePosition = { top: '200px', left: '250px' }; // Corresponds to 260 210 (approx)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Delivery Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 rounded-lg bg-muted overflow-hidden">
          {/* Static SVG Path for the route */}
          <svg width="100%" height="100%" viewBox="0 0 300 250" className="absolute inset-0">
            <path
              d={path}
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Restaurant Icon */}
          <div 
            className="absolute flex flex-col items-center text-gray-600"
            style={restaurantPosition}
          >
            <Building2 className="h-8 w-8 text-slate-700" />
            <span className="text-xs font-semibold">Restaurant</span>
          </div>

          {/* Home Icon */}
          <div 
            className="absolute flex flex-col items-center text-gray-600"
            style={homePosition}
          >
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xs font-semibold">Your Home</span>
          </div>

          {/* Animated Driver Icon */}
          <motion.div
            className="absolute"
            style={{ offsetPath: `path("${path}")` }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: "linear",
            }}
          >
            <div className="bg-primary rounded-full p-1.5 shadow-lg">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMapView;