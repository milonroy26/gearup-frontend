import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaymentButton from "@/features/payment/components/PaymentButton";
import { getMyOrders } from "@/features/rental/actions/rental.action";
import { getRentalOrderAction, getRentalStatusUi } from "@/features/rental/utils/rental-status-ui";
import { cn } from "@/lib/utils";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default async function CustomerOrdersPage() {
    const res = await getMyOrders();
    const orders = res.data || [];

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Customer orders</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">My rental orders</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Track requested sports gear rentals, payment state, and return progress.</p>
                    </div>
                    <Button asChild variant="outline" className="rounded-md">
                        <Link href="/gear">Browse more gear</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>{orders.length} rental request{orders.length === 1 ? "" : "s"} found.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Gear</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => {
                                        const gearTitle = order.orderItems?.[0]?.gearItem?.title || "Rental gear";
                                        const statusUi = getRentalStatusUi(order.status);
                                        const customerAction = getRentalOrderAction(order.status, "CUSTOMER");

                                        return (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-mono text-xs">#{order.id.slice(0, 8)}</TableCell>
                                                <TableCell className="font-medium">{gearTitle}</TableCell>
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
                                                    {order.status === "CONFIRMED" ? (
                                                        <PaymentButton rentalOrderId={order.id} />
                                                    ) : customerAction ? (
                                                        <Button type="button" variant="outline" size="sm" disabled className="rounded-md">
                                                            {customerAction}
                                                        </Button>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">No action</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center">
                                <PackageSearch className="mx-auto size-10 text-muted-foreground" strokeWidth={1.8} />
                                <p className="mt-4 text-base font-semibold">No rental orders found</p>
                                <p className="mt-1 text-sm text-muted-foreground">Browse gear and place your first rental request.</p>
                                <Button asChild variant="flag" className="mt-5 rounded-md">
                                    <Link href="/gear">Find gear</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
