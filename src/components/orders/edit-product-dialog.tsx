"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectedOrderProduct } from "@/types/order";

interface EditProductDialogProps {
    product: SelectedOrderProduct;
    onConfirm: (internalId: string, newQuantity: number) => void;
}

export function EditProductDialog({ product, onConfirm }: EditProductDialogProps) {
    const [open, setOpen] = useState(false);
    const [tempQty, setTempQty] = useState(product.quantity);

    const handleConfirm = () => {
        onConfirm(product.internalId, tempQty);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Quantity</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <Input
                        type="number"
                        min={1}
                        value={tempQty}
                        onChange={(e) => setTempQty(Math.max(1, Number(e.target.value)))}
                        className="w-24"
                    />
                </div>

                <DialogFooter className="flex justify-end mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
