import { apiClient } from "./apiClient";
import { Order, OrderPayload } from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
    return apiClient("/orders");
};

export const getOrderById = async (orderId: number): Promise<Order> => {
    return apiClient(`/orders/${orderId}`);
};

export const createOrder = async (orderData: OrderPayload): Promise<Order> => {
    return apiClient("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });
};

export const updateOrder = async (orderId: number, orderData: OrderPayload): Promise<Order> => {
    return apiClient(`/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify(orderData),
    });
};

export const deleteOrder = async (orderId: number): Promise<void> => {
    await apiClient(`/orders/${orderId}`, { method: "DELETE" });
};
