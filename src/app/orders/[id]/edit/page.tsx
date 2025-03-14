import { OrderForm } from "@/app/new/order-form";

export default function OrderPageEdit({params} : {
    params: {
        id: number
    }
}) {
    return (
        <div className="flex justify-center items-center h-screen">
            <OrderForm orderId={params.id}/>
        </div>
    )
}