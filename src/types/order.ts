export interface OrderProduct {
    product_id: number;
    name: string;
    unit_price: number;
    quantity: number;
}

export interface Order {
    id: number;
    order_number: string;
    date: string;
    final_price: number;
    products: OrderProduct[];
}


export interface OrderPayload {
    order_number: string;
    date: string;
    final_price: number;
    products: Omit<OrderProduct, "id" | "name">[];
}

export interface OrderButtonDeleteProps {
    orderId: number;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export interface OrderTableProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export interface SelectedOrderProduct extends OrderProduct {
    internalId: string;
}
