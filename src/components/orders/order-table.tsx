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
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">ID</TableHead>
          <TableHead className="text-left">Order #</TableHead>
          <TableHead className="text-left">Date</TableHead>
          <TableHead className="text-center"># Products</TableHead>
          <TableHead className="text-center">Final Price</TableHead>
          <TableHead className="text-center">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.order_number}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-center">{order.products?.length || 0}</TableCell>
              <TableCell className="text-center">${order.final_price}</TableCell>
              <TableCell className="flex justify-center gap-2">
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
