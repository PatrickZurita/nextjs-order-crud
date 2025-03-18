import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderTableProps } from "@/types/order";
import Link from "next/link";
import { OrderButtonDelete } from "./order-button-delete";
import { buttonVariants } from "@/components/ui/button";

export function OrderTable({ orders, setOrders }: OrderTableProps) {
  return (
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
  );
}
