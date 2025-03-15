"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface OrderProduct {
  product_id: number;
  unit_price: number;
  quantity: number;
}

const availableProducts = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

export function OrderForm({ orderId }: { orderId?: number }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [orderNumber, setOrderNumber] = React.useState<string>("");
  const [selectedProducts, setSelectedProducts] = React.useState<
    { product_id: number; name: string; unit_price: number; quantity: number }[]
  >([]);
  const [newProductId, setNewProductId] = React.useState<number | null>(null);
  const [newQuantity, setNewQuantity] = React.useState<number>(1);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(`http://127.0.0.1:8000/orders/${orderId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch order. Status: ${response.status}`);
        }

        const orderData = await response.json();
        console.log("Get order by id:", orderData);

        setOrderNumber(orderData.order_number);

        if (Array.isArray(orderData.products)) {
          setSelectedProducts(
            orderData.products.map((p: OrderProduct) => ({
              product_id: p.product_id,
              name:
                availableProducts.find((ap) => ap.id === p.product_id)?.name ||
                "Unknown",
              unit_price: p.unit_price,
              quantity: p.quantity,
            }))
          );
        } else {
          setSelectedProducts([]);
        }
      } catch (error) {
        console.error("Error getting order:", error);
        setErrorMessage("Error loading order data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading order data...</p>;
  }

  const addProductToOrder = () => {
    if (newProductId === null) return;
    const product = availableProducts.find((p) => p.id === newProductId);
    if (product) {
      setSelectedProducts((prev) => {
        if (prev.some((p) => p.product_id === newProductId)) return prev;
        const newProducts = [
          ...prev,
          {
            product_id: product.id,
            name: product.name,
            unit_price: product.price,
            quantity: newQuantity,
          },
        ];
        console.log("Product added:", newProducts);
        return newProducts;
      });
      setIsAddModalOpen(false);
      setNewProductId(null);
      setNewQuantity(1);
    }
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    setSelectedProducts((prev) => {
      const updatedProducts = prev.map((p) =>
        p.product_id === productId
          ? { ...p, quantity: Math.max(1, quantity) }
          : p
      );
      console.log("Updated products:", updatedProducts);
      return updatedProducts;
    });
  };

  const removeProductFromOrder = (productId: number) => {
    setSelectedProducts((prev) => {
      const updatedProducts = prev.filter((p) => p.product_id !== productId);
      console.log("Deleted product:", updatedProducts);
      return updatedProducts;
    });
  };

  const handleSubmit = async () => {
    setErrorMessage(null);

    const orderData = {
      order_number: orderNumber,
      date: currentDate,
      final_price: selectedProducts.reduce(
        (sum, p) => sum + p.unit_price * p.quantity,
        0
      ),
      products: selectedProducts.map(({ name, ...rest }) => rest),
    };

    console.log("Sent order:", orderData);

    try {
      const url = orderId
        ? `http://127.0.0.1:8000/orders/${orderId}`
        : "http://127.0.0.1:8000/orders";
      const method = orderId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(
          `Error ${orderId ? "updating" : "creating"} order`
        );
      }

      console.log(`Order ${orderId ? "updated" : "created"} successfully`);
      router.push("/");
    } catch (error) {
      console.error("Error sent order: ", error);
      setErrorMessage(
        `Error ${orderId ? "updating" : "creating"
        } order: ${error}`
      );
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{orderId ? "Edit Order" : "Add Order"}</CardTitle>
        <CardDescription>
          Fill the form and add products to the order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="order-number"># Order</Label>
              <Input
                id="order-number"
                placeholder="Enter order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="order-date">Date</Label>
              <Input id="order-date" value={currentDate} disabled />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="total-products"># Products</Label>
              <Input
                id="total-products"
                value={selectedProducts.reduce((sum, p) => sum + p.quantity, 0)}
                disabled
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="final-price">Final Price</Label>
              <Input
                id="final-price"
                value={`$${selectedProducts.reduce(
                  (sum, p) => sum + p.unit_price * p.quantity,
                  0
                )}`}
                disabled
              />
            </div>
          </div>

          <div className="mt-4">
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>Add Product</Button>
              </DialogTrigger>
              <DialogContent>
                <Label>Select Product</Label>
                <Select
                  onValueChange={(value) => setNewProductId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={String(product.id)}>
                        {product.name} - ${product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  className="w-16"
                />

                <Button onClick={addProductToOrder}>Confirm</Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6">
            <Label>Selected Products</Label>
            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.unit_price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      ${product.unit_price * product.quantity}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <Label>Edit Quantity</Label>
                          <Input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              updateProductQuantity(
                                product.product_id,
                                Number(e.target.value)
                              )
                            }
                            className="w-16"
                          />
                          <Button
                            onClick={() =>
                              console.log("Product edited: ", product)
                            }
                          >
                            Confirm
                          </Button>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          removeProductFromOrder(product.product_id)
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {orderId ? "Edit Order" : "Save Order"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
