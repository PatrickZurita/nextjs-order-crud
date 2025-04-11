import { useEffect, useState } from "react";
import { getOrders } from "@/services/orderService";
import { Order } from "@/types/order";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                console.log("Orders fetched:", data);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Error loading orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return { orders, setOrders, loading, error };
}
