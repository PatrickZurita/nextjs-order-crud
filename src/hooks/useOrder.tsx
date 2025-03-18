import { useEffect, useState } from "react";
import { getOrderById, createOrder, updateOrder } from "@/services/orderService";
import { Order, OrderPayload } from "@/types/order";
import { useRouter } from "next/navigation";

export function useOrder(orderId?: number) {
    const router = useRouter();
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<Order["products"]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const orderData = await getOrderById(orderId);
                console.log("📥 Order fetched:", orderData);

                setOrderNumber(orderData.order_number);
                setSelectedProducts(orderData.products);
            } catch (error) {
                console.error("❌ Error fetching order:", error);
                setErrorMessage("Error loading order data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleSubmit = async () => {
        setErrorMessage(null);

        const orderData: OrderPayload = {
            order_number: orderNumber,
            date: new Date().toISOString().split("T")[0],
            final_price: selectedProducts.reduce((sum, p) => sum + p.unit_price * p.quantity, 0),
            products: selectedProducts,
        };

        console.log("🚀 Sending order:", orderData);

        try {
            if (orderId) {
                await updateOrder(orderId, orderData);
                console.log(`✅ Order ${orderId} updated successfully`);
            } else {
                await createOrder(orderData);
                console.log("✅ Order created successfully");
            }

            router.push("/");
        } catch (error) {
            console.error("❌ Error sending order:", error);
            setErrorMessage(`Error ${orderId ? "updating" : "creating"} order.`);
        }
    };

    return {
        orderNumber,
        setOrderNumber,
        selectedProducts,
        setSelectedProducts,
        isLoading,
        errorMessage,
        handleSubmit,
    };
}
