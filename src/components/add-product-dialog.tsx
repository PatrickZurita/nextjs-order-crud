import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
                <Label>Select Product</Label>
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
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-16"
                />

                <Button onClick={addProductToOrder}>Confirm</Button>
            </DialogContent>
        </Dialog>
    );
}
