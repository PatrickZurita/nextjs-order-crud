import { useEffect, useState } from "react";
import { getOrderById, createOrder, updateOrder } from "@/services/orderService";
import { OrderPayload, SelectedOrderProduct } from "@/types/order";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { availableProducts } from "@/lib/utils";
import { notifyError, notifySuccess } from "@/lib/toast";

export function useOrder(orderId?: number) {
    const router = useRouter();
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<SelectedOrderProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const orderData = await getOrderById(orderId);
                console.log("Order fetched:", orderData);

                setOrderNumber(orderData.order_number);

                const enrichedProducts: SelectedOrderProduct[] = orderData.products.map((p: any) => {
                    const productInfo = availableProducts.find(ap => ap.id === p.product_id);
                    return {
                        ...p,
                        name: productInfo?.name || "(Unknown Product)",
                        internalId: uuidv4(),
                    };
                });

                setSelectedProducts(enrichedProducts);
            } catch (error) {
                console.error("Error fetching order:", error);
                setErrorMessage("Error loading order data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleSubmit = async () => {
        setErrorMessage(null);

        if (!orderNumber.trim()) {
            setErrorMessage("Order number is required.");
            return;
        }

        if (selectedProducts.length === 0) {
            setErrorMessage("At least one product must be selected.");
            return;
        }

        const orderData: OrderPayload = {
            order_number: orderNumber,
            date: new Date().toISOString().split("T")[0],
            final_price: selectedProducts.reduce((sum, p) => sum + p.unit_price * p.quantity, 0),
            products: selectedProducts.map(({ product_id, quantity, unit_price }) => ({
                product_id,
                quantity,
                unit_price,
            })),
        };

        console.log("Sending order:", orderData);

        try {
            if (orderId) {
                await updateOrder(orderId, orderData);
                console.log(`Order ${orderId} updated successfully`);
                notifySuccess("Order updated", `Order #${orderNumber} was updated successfully.`);
            } else {
                await createOrder(orderData);
                console.log("Order created successfully");
                notifySuccess("Order created", `Order #${orderNumber} was created successfully.`);
            }

            router.push("/");
        } catch (error) {
            console.error("Error sending order:", error);
            notifyError("Error", "Something went wrong while saving the order.");
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
