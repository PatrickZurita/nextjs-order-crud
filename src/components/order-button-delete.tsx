"use client";

import { Button } from "./ui/button";
import { useState } from "react";

export function OrderButtonDelete({
  orderId,
  setOrders,
}: {
  orderId: number;
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete order #${orderId}?`)) return;

    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      console.log(`Order ${orderId} deleted successfully`);

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
