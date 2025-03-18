"use client";

import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/order-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const { orders, setOrders, loading, error } = useOrders();

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Link href="/new" className={buttonVariants({ variant: "secondary" })}>
          Create Order
        </Link>
      </div>

      <OrderTable orders={orders} setOrders={setOrders} />
    </div>
  );
}
