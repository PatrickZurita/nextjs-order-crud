"use client";

import { OrderTable } from "@/components/orders/order-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useOrders } from "@/hooks/useFetchOrders";

export default function Home() {
  const { orders, setOrders, loading, error } = useOrders();

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Orders</h1>
        <Link href="/new" className={buttonVariants({ variant: "secondary" })}>
          Create Order
        </Link>
      </div>

      <OrderTable orders={orders} setOrders={setOrders} />
    </div>
  );
}
