"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateOrderStatus } from "@/features/provider/actions/provider.action";
import { getRentalStatusUi } from "@/features/rental/utils/rental-status-ui";
import { cn } from "@/lib/utils";
import { IRentalOrder, OrderStatus } from "@/types";
import { CheckCircle2, PackageCheck, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const providerActions: Partial<Record<OrderStatus, { label: string; nextStatus: OrderStatus; icon: typeof CheckCircle2 }>> = {
    PLACED: { label: "Confirm", nextStatus: "CONFIRMED", icon: CheckCircle2 },
    PAID: { label: "Mark Picked Up", nextStatus: "PICKED_UP", icon: PackageCheck },
    PICKED_UP: { label: "Mark Returned", nextStatus: "RETURNED", icon: RotateCcw },
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function ProviderOrdersTable({ orders }: { orders: IRentalOrder[] }) {
    const router = useRouter();
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        setUpdatingId(orderId);
        try {
            const res = await updateOrderStatus(orderId, newStatus);

            if (res.success) {
                toast.success("Order Updated");
                router.refresh();
            } else {
                toast.error(res.message || "Failed to update order");
            }
        } catch {
            toast.error("Error updating order");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Gear</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => {
                    const statusUi = getRentalStatusUi(order.status);
                    const action = providerActions[order.status];
                    const ActionIcon = action?.icon;
                    const orderItems = order.orderItems || [];

                    return (
                        <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">#{order.id.slice(0, 8)}</TableCell>
                            <TableCell className="min-w-64">
                                {orderItems.length > 0 ? (
                                    <div className="space-y-3">
                                        {orderItems.map((item) => (
                                            <div key={item.id} className="rounded-md border border-border bg-muted/30 p-3">
                                                <p className="font-medium">{item.gearItem?.title || "Gear item unavailable"}</p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {item.gearItem?.brand || "Unknown brand"}
                                                    {item.gearItem?.category?.name ? ` / ${item.gearItem.category.name}` : ""}
                                                </p>
                                                <p className="mt-1 text-xs font-semibold">Quantity: {item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground">Gear item unavailable</span>
                                )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {formatDate(order.startDate)} to {formatDate(order.endDate)}
                            </TableCell>
                            <TableCell className="font-semibold">BDT {order.totalPrice}</TableCell>
                            <TableCell>
                                <span className={cn("inline-flex rounded-md px-2.5 py-1 text-xs font-semibold", statusUi.badgeClassName)}>
                                    {statusUi.label}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end">
                                    {action && ActionIcon ? (
                                        <Button
                                            type="button"
                                            variant={order.status === "PLACED" ? "flag" : "outline"}
                                            size="sm"
                                            disabled={updatingId === order.id}
                                            onClick={() => handleStatusChange(order.id, action.nextStatus)}
                                            className="rounded-md"
                                        >
                                            <ActionIcon className="size-4" strokeWidth={1.8} />
                                            {updatingId === order.id ? "Updating..." : action.label}
                                        </Button>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">No action</span>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
