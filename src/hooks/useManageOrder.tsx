import { createOrder, updateOrder } from "@/services/orderService";
import { Order, OrderPayload } from "@/types/order";
import { useRouter } from "next/router";
import { useState } from "react";

export function useManageOrder(orderId?: number) {
    const router = useRouter();
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<Order["products"]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        setErrorMessage(null);

        const orderData: OrderPayload = {
            order_number: orderNumber,
            date: new Date().toISOString().split("T")[0],
            final_price: selectedProducts.reduce((sum, p) => sum + p.unit_price * p.quantity, 0),
            products: selectedProducts,
        };

        console.log("Sending order:", orderData);

        try {
            if (orderId) {
                await updateOrder(orderId, orderData);
                console.log(`Order ${orderId} updated successfully`);
            } else {
                await createOrder(orderData);
                console.log("Order created successfully");
            }

            router.push("/");
        } catch (error) {
            console.error("Error sending order:", error);
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
