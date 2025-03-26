import { OrderForm } from "./order-form";

function NewPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <OrderForm orderId={undefined}/>
        </div>
    )
}

export default NewPage