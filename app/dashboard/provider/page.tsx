import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProviderGears, getProviderOrders } from "@/features/provider/actions/provider.action";
import ProviderInventoryTable from "@/features/provider/components/ProviderInventoryTable";
import { CalendarCheck, ClipboardList, PackagePlus, PackageSearch, Store } from "lucide-react";
import Link from "next/link";

export default async function ProviderDashboardOverview() {
    const [gearsRes, ordersRes] = await Promise.all([
        getProviderGears(),
        getProviderOrders(),
    ]);

    const gears = gearsRes.data || [];
    const orders = ordersRes.data || [];
    const totalGearListed = gears.length;
    const activeRentals = orders.filter((order) => ["CONFIRMED", "PAID", "PICKED_UP"].includes(order.status)).length;
    const pendingOrders = orders.filter((order) => order.status === "PLACED").length;
    const availableGear = gears.filter((gear) => gear.isAvailable && gear.stock > 0).length;

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Provider dashboard</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Manage your rental business</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Track inventory, incoming orders, and rentals ready for customer pickup.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="outline" className="rounded-md">
                            <Link href="/dashboard/provider/orders">
                                <ClipboardList className="size-4" strokeWidth={1.8} />
                                Incoming Orders ({pendingOrders})
                            </Link>
                        </Button>
                        <Button asChild variant="flag" className="rounded-md">
                            <Link href="/dashboard/provider/gear/new">
                                <PackagePlus className="size-4" strokeWidth={1.8} />
                                Add Gear
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Total Gear Listed", value: totalGearListed, icon: Store, tone: "text-emerald-600 dark:text-emerald-300" },
                        { label: "Available Gear", value: availableGear, icon: PackageSearch, tone: "text-sky-600 dark:text-sky-300" },
                        { label: "Active Rentals", value: activeRentals, icon: CalendarCheck, tone: "text-purple-600 dark:text-purple-300" },
                        { label: "Pending Orders", value: pendingOrders, icon: ClipboardList, tone: "text-amber-600 dark:text-amber-300" },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card key={item.label}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                    <CardDescription>{item.label}</CardDescription>
                                    <Icon className={item.tone} size={20} strokeWidth={1.8} />
                                </CardHeader>
                                <CardContent>
                                    <p className="font-heading text-3xl font-bold">{item.value}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Inventory management</CardTitle>
                            <CardDescription>Add, edit, remove, price, stock, and availability controls for your gear.</CardDescription>
                        </div>
                        <Button asChild variant="outline" className="rounded-md">
                            <Link href="/dashboard/provider/gear/new">Add new item</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {gears.length > 0 ? (
                            <ProviderInventoryTable gears={gears} />
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center">
                                <PackageSearch className="mx-auto size-10 text-muted-foreground" strokeWidth={1.8} />
                                <p className="mt-4 text-base font-semibold">No gear items found</p>
                                <p className="mt-1 text-sm text-muted-foreground">Add your first item and start accepting rental requests.</p>
                                <Button asChild variant="flag" className="mt-5 rounded-md">
                                    <Link href="/dashboard/provider/gear/new">Add your first gear</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
