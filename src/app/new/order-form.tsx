"use client";

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
import { useRouter } from "next/navigation";
import { availableProducts } from "@/lib/utils";
import { AddProductDialog } from "@/components/orders/add-product-dialog";
import { SelectedProductsTable } from "@/components/orders/selected-product-table";
import { useOrder } from "@/hooks/useOrder";
import { v4 as uuidv4 } from "uuid";

export function OrderForm({ orderId }: { orderId?: number }) {
  const router = useRouter();
  const [newProductId, setNewProductId] = React.useState<number | null>(null);
  const [newQuantity, setNewQuantity] = React.useState<number>(1);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const {
    orderNumber,
    setOrderNumber,
    selectedProducts,
    setSelectedProducts,
    isLoading,
    errorMessage,
    handleSubmit,
  } = useOrder(orderId);

  const addProductToOrder = () => {
    if (newProductId === null) return;

    const product = availableProducts.find((p) => p.id === newProductId);
    if (!product) return;

    setSelectedProducts((prev) => {
      const existingProduct = prev.find((p) => p.product_id === product.id);

      if (existingProduct) {
        return prev.map((p) =>
          p.product_id === product.id
            ? { ...p, quantity: p.quantity + newQuantity }
            : p
        );
      } else {
        return [
          ...prev,
          {
            internalId: uuidv4(),
            product_id: product.id,
            name: product.name,
            unit_price: product.price,
            quantity: newQuantity,
          },
        ];
      }
    });

    setIsAddModalOpen(false);
    setNewProductId(null);
    setNewQuantity(1);
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading order data...</p>;
  }

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

            <div className="flex flex-col space-y-1.5 mb-4">
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

          <AddProductDialog
            isOpen={isAddModalOpen}
            setIsOpen={setIsAddModalOpen}
            newProductId={newProductId}
            setNewProductId={setNewProductId}
            newQuantity={newQuantity}
            setNewQuantity={setNewQuantity}
            addProductToOrder={addProductToOrder}
          />

          <SelectedProductsTable
            selectedProducts={selectedProducts}
            updateProductQuantity={(internalId, qty) =>
              setSelectedProducts((prev) =>
                prev.map((p) => (p.internalId === internalId ? { ...p, quantity: qty } : p))
              )
            }

            removeProductFromOrder={(internalId) =>
              setSelectedProducts((prev) => prev.filter((p) => p.internalId !== internalId))
            }
          />
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
