import { OrderForm } from "@/app/new/order-form";

export type paramsType = Promise<{ id: number }>;

export default async function OrderPageEdit(props: { params: paramsType }) {
    const { id } = await props.params;

    return (
        <div className="flex justify-center items-center h-screen">
            <OrderForm orderId={id}/>
        </div>
    )
}