import { DashboardBarChart, DashboardPieChart } from "@/components/shared/charts/DashboardCharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyOrders } from "@/features/rental/actions/rental.action";
import { getRentalStatusUi } from "@/features/rental/utils/rental-status-ui";
import { buildMetricChartData, buildStatusChartData } from "@/lib/dashboard-chart-data";
import { cn } from "@/lib/utils";
import { CalendarCheck, ClipboardList, PackageSearch, WalletCards } from "lucide-react";
import Link from "next/link";

export default async function CustomerDashboardPage() {
    const res = await getMyOrders();
    const orders = res.data || [];
    const activeOrders = orders.filter((order) => !["RETURNED", "CANCELLED"].includes(order.status)).length;
    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const completedOrders = orders.filter((order) => ["RETURNED", "CANCELLED"].includes(order.status)).length;
    const latestOrders = orders.slice(0, 3);
    const chartMetrics = buildMetricChartData([
        { label: "Orders", value: orders.length },
        { label: "Active", value: activeOrders },
        { label: "Completed", value: completedOrders },
        { label: "Spend (k)", value: Math.round(totalSpent / 1000) },
    ]);

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Customer dashboard</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Your rental command center</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Track bookings, continue browsing, and keep every rental in one place.</p>
                    </div>
                    <Button asChild variant="flag" className="rounded-md">
                        <Link href="/gear">Browse Gear</Link>
                    </Button>
                </div>

                {/*Dashboard stats*/}
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                        { label: "Total Orders", value: orders.length, icon: ClipboardList },
                        { label: "Active Rentals", value: activeOrders, icon: CalendarCheck },
                        { label: "Total Spend", value: `BDT ${totalSpent}`, icon: WalletCards },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.label}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                    <CardDescription>{item.label}</CardDescription>
                                    <Icon className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.8} />
                                </CardHeader>
                                <CardContent>
                                    <p className="font-heading text-3xl font-bold">{item.value}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <DashboardBarChart
                        title="Rental Summary"
                        description="Your live rental totals and spending snapshot."
                        data={chartMetrics}
                    />
                    <DashboardPieChart
                        title="Order Status"
                        description="Your rentals by current order status."
                        data={buildStatusChartData(orders)}
                    />
                </div>

                {/* <div className="mt-6">
                    <DashboardLineChart
                        title="Spending Activity"
                        description="Recent rental spending by order date."
                        data={buildOrderActivityChartData(orders, "revenue")}
                        valuePrefix="BDT "
                    />
                </div> */}

                {/* Latest orders */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent orders</CardTitle>
                            <CardDescription>Your latest rental requests and payment status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {latestOrders.length > 0 ? (
                                latestOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
                                        <div>
                                            <p className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</p>
                                            <p className="mt-1 text-sm font-semibold">{new Date(order.startDate).toLocaleDateString()} to {new Date(order.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={cn("rounded-md px-2.5 py-1 text-xs font-semibold", getRentalStatusUi(order.status).badgeClassName)}>
                                            {getRentalStatusUi(order.status).label}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-md border border-dashed border-border p-8 text-center">
                                    <PackageSearch className="mx-auto size-8 text-muted-foreground" strokeWidth={1.8} />
                                    <p className="mt-3 text-sm font-semibold">No orders yet</p>
                                    <p className="mt-1 text-xs text-muted-foreground">Start with a gear item and place your first rental.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-[linear-gradient(135deg,#ecfdf5,#fefce8)] dark:bg-[linear-gradient(135deg,#092017,#241f08)]">
                        <CardHeader>
                            <CardTitle>Ready for your next game?</CardTitle>
                            <CardDescription>Find available gear and reserve it by date.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild variant="flag" className="w-full rounded-md">
                                <Link href="/gear">Find gear</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full rounded-md bg-background/70">
                                <Link href="/dashboard/customer/orders">View all orders</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
