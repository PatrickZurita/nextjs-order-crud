"use client";

import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { deleteOrder } from "@/services/orderService";
import { OrderButtonDeleteProps } from "@/types/order";

export function OrderButtonDelete({
  orderId,
  setOrders,
}: OrderButtonDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete order #${orderId}?`)) return;

    setLoading(true);

    try {
      await deleteOrder(orderId);
      console.log(`Order ${orderId} deleted successfully`);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className={buttonVariants({ variant: "secondary" })} variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
