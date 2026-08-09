import { DashboardBarChart, DashboardLineChart, DashboardPieChart } from "@/components/shared/charts/DashboardCharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminAllRentals, getAdminDashboardMetrics } from "@/features/admin/actions/admin.action";
import { IPaginatedData } from "@/features/admin/types/admin.type";
import { buildMetricChartData, buildOrderActivityChartData, buildStatusChartData } from "@/lib/dashboard-chart-data";
import { IRentalOrder } from "@/types";
import { ClipboardList, PackageSearch, Users, WalletCards } from "lucide-react";
import Link from "next/link";

function formatCurrency(value?: number) {
    return `BDT ${Number(value || 0).toLocaleString("en-US")}`;
}

function extractItems<T>(data: T[] | IPaginatedData<T> | { data?: T[] } | null | undefined) {
    if (Array.isArray(data)) return data;
    if (data && "items" in data && Array.isArray(data.items)) return data.items;
    if (data && "data" in data && Array.isArray(data.data)) return data.data;
    return [];
}

export default async function AdminDashboardPage() {
    const [res, rentalsRes] = await Promise.all([
        getAdminDashboardMetrics(),
        getAdminAllRentals(),
    ]);
    const summary = res.data?.summary;
    const rentals = extractItems<IRentalOrder>(rentalsRes.data);

    const totalUsers = summary?.totalUsers ?? summary?.totalCustomers ?? 0;
    const activeGear = summary?.activeGear ?? summary?.totalProducts ?? 0;
    const totalRentals = summary?.totalRentals ?? summary?.totalOrders ?? 0;

    const metrics = [
        { label: "Total Users", value: totalUsers, icon: Users, tone: "text-emerald-600 dark:text-emerald-300" },
        { label: "Active Gear", value: activeGear, icon: PackageSearch, tone: "text-sky-600 dark:text-sky-300" },
        { label: "Total Rentals", value: totalRentals, icon: ClipboardList, tone: "text-purple-600 dark:text-purple-300" },
        { label: "Revenue", value: formatCurrency(summary?.totalRevenue), icon: WalletCards, tone: "text-amber-600 dark:text-amber-300" },
    ];
    const metricChartData = buildMetricChartData([
        { label: "Users", value: totalUsers },
        { label: "Gear", value: activeGear },
        { label: "Rentals", value: totalRentals },
        { label: "Revenue (k)", value: Math.round((summary?.totalRevenue || 0) / 1000) },
    ]);

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Admin dashboard</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Platform overview</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Track platform health, users, gear listings, and rental activity.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="outline" className="rounded-md">
                            <Link href="/dashboard/admin/users">Manage users</Link>
                        </Button>
                        <Button asChild variant="flag" className="rounded-md">
                            <Link href="/dashboard/admin/orders">Review rentals</Link>
                        </Button>
                    </div>
                </div>

                {!res.success ? (
                    <Card>
                        <CardContent className="py-6 text-sm text-destructive">{res.message || "Failed to load admin metrics."}</CardContent>
                    </Card>
                ) : null}

                <div className="grid gap-4 md:grid-cols-4">
                    {metrics.map((item) => {
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

                <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <DashboardBarChart
                        title="Platform Metrics"
                        description="Core marketplace totals from live admin data."
                        data={metricChartData}
                    />
                    <DashboardPieChart
                        title="Rental Status"
                        description="Current distribution of rental orders."
                        data={buildStatusChartData(rentals)}
                    />
                </div>

                <DashboardLineChart
                    title="Rental Activity"
                    description="Recent rental order volume by date."
                    data={buildOrderActivityChartData(rentals)}
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Admin tools</CardTitle>
                        <CardDescription>Moderate the core areas of the GearUp marketplace.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-3">
                        {[
                            { label: "User Management", href: "/dashboard/admin/users", icon: Users },
                            { label: "Gear Moderation", href: "/dashboard/admin/gears", icon: PackageSearch },
                            { label: "Rental Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <Button key={item.href} asChild variant="outline" className="h-12 justify-start rounded-md">
                                    <Link href={item.href}>
                                        <Icon className="size-4" strokeWidth={1.8} />
                                        {item.label}
                                    </Link>
                                </Button>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

