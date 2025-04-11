import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { availableProducts } from "@/lib/utils";

interface AddProductDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    newProductId: number | null;
    setNewProductId: (id: number | null) => void;
    newQuantity: number;
    setNewQuantity: (quantity: number) => void;
    addProductToOrder: () => void;
}

export function AddProductDialog({
    isOpen,
    setIsOpen,
    newProductId,
    setNewProductId,
    newQuantity,
    setNewQuantity,
    addProductToOrder,
}: AddProductDialogProps) {

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (value < 1) {
            value = 1;
        }
        setNewQuantity(value);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>{newProductId ? "Add Product" : "Add Product"}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Select Product</DialogTitle>
                <Select onValueChange={(value) => setNewProductId(Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableProducts.map((product) => (
                            <SelectItem key={product.id} value={String(product.id)}>
                                {product.name} - ${product.price}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Label>Quantity</Label>
                <Input
                    type="number"
                    value={newQuantity}
                    onChange={handleQuantityChange}
                    min={1}
                    className="w-16"
                />

                <Button onClick={addProductToOrder}>Confirm</Button>
            </DialogContent>
        </Dialog>
    );
}
