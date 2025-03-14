"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderButtonDelete } from "@/components/order-button-delete";

export default function Home() {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener órdenes");
        }
        return response.json();
      })
      .then((data) => {
        console.log("📌 Órdenes obtenidas:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("❌ Error en la carga de órdenes:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">Error loading orders.</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Link href="/new" className={buttonVariants({ variant: "secondary" })}>
          Create Order
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead># Products</TableHead>
            <TableHead>Final Price</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.products?.length || 0}</TableCell>
                <TableCell>${order.final_price}</TableCell>
                <TableCell className="flex gap-2">
                  <Link
                    href={`/orders/${order.id}/edit`}
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    Edit
                  </Link>
                  <OrderButtonDelete orderId={order.id} setOrders={setOrders} />
                  </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
