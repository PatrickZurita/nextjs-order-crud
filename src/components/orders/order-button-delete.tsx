"use client";

import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { deleteOrder } from "@/services/orderService";
import { OrderButtonDeleteProps } from "@/types/order";
import { notifySuccess, notifyError } from "@/lib/toast";
import { ConfirmDialog } from "../shared/confirm-dialog";

export function OrderButtonDelete({
  orderId,
  setOrders,
}: OrderButtonDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteOrder(orderId);
      notifySuccess("Order deleted", `Order ${orderId} was deleted successfully.`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
      notifyError("Error", "Something went wrong while deleting the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmDialog
      title="Delete Order"
      description={`Are you sure you want to delete order ${orderId}?`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleDelete}
      trigger={
        <Button
          className={buttonVariants({ variant: "secondary" })}
          variant="destructive"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      }
    />
  );
}
