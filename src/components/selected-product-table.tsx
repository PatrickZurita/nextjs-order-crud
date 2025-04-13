import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectedOrderProduct } from "@/types/order";

interface SelectedProductsTableProps {
    selectedProducts: SelectedOrderProduct[];
    updateProductQuantity: (internalId: string, quantity: number) => void;
    removeProductFromOrder: (internalId: string) => void;
}

export function SelectedProductsTable({
    selectedProducts,
    updateProductQuantity,
    removeProductFromOrder,
}: SelectedProductsTableProps) {
    return (
        <div className="mt-6">
            <Label>Selected Products</Label>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedProducts.map((product) => (
                        <TableRow key={product.internalId}>
                            <TableCell>{product.product_id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.unit_price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>${product.unit_price * product.quantity}</TableCell>
                            <TableCell className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Edit Quantity</DialogTitle>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={product.quantity}
                                            onChange={(e) => {
                                                const value = Math.max(1, Number(e.target.value));
                                                updateProductQuantity(product.internalId, value);
                                            }}
                                            className="w-16"
                                        />
                                        <Button>Confirm</Button>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeProductFromOrder(product.internalId)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    );
}
