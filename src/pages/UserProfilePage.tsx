import React from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Icons
import { Package, Home, CreditCard, Pencil, Trash2, PlusCircle } from 'lucide-react';

// Placeholder Data
const pastOrders = [
  {
    id: "ORD-001",
    date: "2024-05-15",
    total: "$45.50",
    status: "Delivered",
    restaurant: "Sushi Palace",
    items: [
      { name: "Dragon Roll", quantity: 2, price: "$25.00" },
      { name: "Miso Soup", quantity: 1, price: "$5.50" },
      { name: "Edamame", quantity: 1, price: "$5.00" },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-04-22",
    total: "$22.00",
    status: "Delivered",
    restaurant: "Pizza Heaven",
    items: [
      { name: "Large Pepperoni Pizza", quantity: 1, price: "$18.00" },
    ],
  },
];

const savedAddresses = [
  {
    id: "ADDR-1",
    type: "Home",
    address: "123 Maple St, Springfield, IL 62704",
    isDefault: true,
  },
  {
    id: "ADDR-2",
    type: "Work",
    address: "456 Oak Ave, Capital City, IL 62701",
    isDefault: false,
  },
];

const paymentMethods = [
  {
    id: "PAY-1",
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your orders, addresses, and payment methods.</p>
          </header>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
              <TabsTrigger value="orders"><Package className="h-4 w-4 mr-2" />Order History</TabsTrigger>
              <TabsTrigger value="addresses"><Home className="h-4 w-4 mr-2" />Addresses</TabsTrigger>
              <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-2" />Payment</TabsTrigger>
            </TabsList>

            {/* Order History Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Past Orders</CardTitle>
                  <CardDescription>Here are the orders you've placed with FlavorFlow.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {pastOrders.map((order) => (
                      <AccordionItem key={order.id} value={order.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex justify-between w-full pr-4 text-sm">
                            <span className="font-medium">{order.id} - {order.restaurant}</span>
                            <span className="text-muted-foreground">{order.date}</span>
                            <span>{order.total}</span>
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-muted/30 p-4 rounded-md">
                          <ul className="space-y-2 text-sm">
                            {order.items.map(item => (
                                <li key={item.name} className="flex justify-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>{item.price}</span>
                                </li>
                            ))}
                          </ul>
                          <div className="border-t mt-4 pt-4 flex justify-end">
                            <Button size="sm">Reorder</Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses.</CardDescription>
                  </div>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Address</Button>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {savedAddresses.map((addr) => (
                    <Card key={addr.id} className="flex flex-col">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-medium">{addr.type}</CardTitle>
                          {addr.isDefault && <Badge variant="secondary">Default</Badge>}
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{addr.address}</p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm"><Pencil className="mr-2 h-3 w-3" />Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-50 border-red-200 hover:border-red-500/50"><Trash2 className="mr-2 h-3 w-3" />Delete</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment options.</CardDescription>
                  </div>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method</Button>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                   {paymentMethods.map((pm) => (
                    <Card key={pm.id} className="flex flex-col">
                      <CardHeader className="pb-2">
                         <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">{pm.type}</CardTitle>
                            {pm.isDefault && <Badge variant="secondary">Default</Badge>}
                         </div>
                         <p className="text-muted-foreground text-sm pt-2">Ending in **** {pm.last4}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm">Expires: {pm.expiry}</p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm"><Pencil className="mr-2 h-3 w-3" />Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-50 border-red-200 hover:border-red-500/50"><Trash2 className="mr-2 h-3 w-3" />Delete</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;