import Link from "next/link";
import { OrderButtonDelete } from "./order-button-delete";
import { OrderTableProps } from "@/types/order";

export function OrderTable({ orders, setOrders }: OrderTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Order #</th>
                    <th>Date</th>
                    <th># Products</th>
                    <th>Final Price</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.order_number}</td>
                        <td>{order.date}</td>
                        <td>{order.products?.length || 0}</td>
                        <td>${order.final_price}</td>
                        <td>
                            <Link href={`/orders/${order.id}/edit`}>Edit</Link>
                            <OrderButtonDelete orderId={order.id} setOrders={setOrders} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
