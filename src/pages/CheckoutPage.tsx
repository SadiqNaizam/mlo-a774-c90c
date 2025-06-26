import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

import { CreditCard, Home, Tag } from 'lucide-react';

// Define the validation schema with Zod
const checkoutFormSchema = z.object({
  deliveryAddress: z.string().min(1, { message: "Please select a delivery address." }),
  paymentMethod: z.string().min(1, { message: "Please select a payment method." }),
  promoCode: z.string().optional(),
});

// Placeholder data
const orderItems = [
  { id: 1, name: 'Spicy Tuna Roll', quantity: 2, price: 8.99 },
  { id: 2, name: 'Miso Soup', quantity: 1, price: 2.50 },
  { id: 3, name: 'Edamame', quantity: 1, price: 4.00 },
];
const deliveryFee = 5.00;
const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const total = subtotal + deliveryFee;

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      deliveryAddress: 'address-1',
      paymentMethod: 'card-1',
      promoCode: '',
    },
  });

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log('Form submitted with values:', values);
    toast({
        title: "Order Placed!",
        description: "We've received your order and are preparing it now.",
    });
    navigate('/order-status');
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Form Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Home className="h-5 w-5" /> Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            <Label htmlFor="address-1" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                              <RadioGroupItem value="address-1" id="address-1" />
                              <div>
                                <p className="font-semibold">Home</p>
                                <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA 12345</p>
                              </div>
                            </Label>
                             <Label htmlFor="address-2" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                              <RadioGroupItem value="address-2" id="address-2" />
                              <div>
                                <p className="font-semibold">Work</p>
                                <p className="text-sm text-muted-foreground">456 Oak Ave, Business City, USA 67890</p>
                              </div>
                            </Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                           <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            <Label htmlFor="card-1" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                              <RadioGroupItem value="card-1" id="card-1" />
                              <div>
                                <p className="font-semibold">Visa ending in 1234</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                              </div>
                            </Label>
                            <Label htmlFor="card-2" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                              <RadioGroupItem value="card-2" id="card-2" />
                              <div>
                                <p className="font-semibold">Mastercard ending in 5678</p>
                                <p className="text-sm text-muted-foreground">Expires 08/2026</p>
                              </div>
                            </Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity} x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                   <FormField
                        control={form.control}
                        name="promoCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Promo Code</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2">
                                        <Input placeholder="Enter code" {...field} />
                                        <Button type="button" variant="outline">Apply</Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                  <Separator />
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg">
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;