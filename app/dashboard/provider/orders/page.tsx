import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProviderOrders } from "@/features/provider/actions/provider.action";
import ProviderOrdersTable from "@/features/provider/components/ProviderOrdersTable";
import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function ManageIncomingOrdersPage() {
    const res = await getProviderOrders();
    const orders = res.data || [];
    const pendingOrders = orders.filter((order) => order.status === "PLACED").length;

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <Button asChild variant="ghost" className="mb-6 rounded-md">
                    <Link href="/dashboard/provider">
                        <ArrowLeft className="size-4" strokeWidth={1.8} />
                        Back to overview
                    </Link>
                </Button>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Provider orders</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Incoming rental orders</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Confirm bookings, mark paid rentals as picked up, and close returned rentals.</p>
                    </div>
                    <Button asChild variant="outline" className="rounded-md">
                        <Link href="/dashboard/provider/gear/new">Add more gear</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <span className="flex size-11 items-center justify-center rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300">
                                <ClipboardList className="size-5" strokeWidth={1.8} />
                            </span>
                            <div>
                                <CardTitle>Orders requiring attention</CardTitle>
                                <CardDescription>{pendingOrders} placed order{pendingOrders === 1 ? "" : "s"} waiting for provider confirmation.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {orders.length > 0 ? (
                            <ProviderOrdersTable orders={orders} />
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center">
                                <ClipboardList className="mx-auto size-10 text-muted-foreground" strokeWidth={1.8} />
                                <p className="mt-4 text-base font-semibold">No incoming orders right now</p>
                                <p className="mt-1 text-sm text-muted-foreground">New customer requests will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
