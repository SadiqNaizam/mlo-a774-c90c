import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import LiveMapView from '@/components/LiveMapView';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const orderStatuses = ['Order Placed', 'In the Kitchen', 'Out for Delivery', 'Delivered'] as const;
type OrderStatus = typeof orderStatuses[number];

const OrderStatusPage = () => {
  console.log('OrderStatusPage loaded');
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Order Placed');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prevStatus => {
        const currentIndex = orderStatuses.indexOf(prevStatus);
        // Stop updating once the order is delivered
        if (currentIndex >= orderStatuses.length - 1) {
          clearInterval(interval);
          return prevStatus;
        }
        return orderStatuses[currentIndex + 1];
      });
    }, 8000); // Update status every 8 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-lg">
                <CardHeader className="bg-muted/20">
                    <CardTitle className="text-2xl font-bold">Your Order is on its way!</CardTitle>
                    <CardDescription>Order #FF-123456 • Est. delivery: 7:45 PM</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    {/* Order Tracker */}
                    <section>
                        <OrderTracker currentStatus={currentStatus} />
                    </section>
                    
                    {currentStatus === 'Delivered' && (
                        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle>Delivered!</AlertTitle>
                            <AlertDescription>
                                Your order has been successfully delivered. Enjoy your meal!
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Live Map View */}
                    <section>
                        <LiveMapView />
                    </section>

                     {/* Order Summary */}
                    <section>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>1x Spicy Tuna Roll</span>
                                        <span>$12.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>2x Miso Soup</span>
                                        <span>$6.00</span>
                                    </div>
                                    <hr className="my-2"/>
                                    <div className="flex justify-between font-semibold text-foreground">
                                        <span>Total</span>
                                        <span>$18.00</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatusPage;