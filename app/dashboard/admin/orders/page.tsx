import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminAllRentals } from "@/features/admin/actions/admin.action";
import AdminFilters from "@/features/admin/components/AdminFilters";
import AdminPagination from "@/features/admin/components/AdminPagination";
import { normalizePaginatedData } from "@/features/admin/utils/admin-data";
import { getRentalStatusUi } from "@/features/rental/utils/rental-status-ui";
import { cn } from "@/lib/utils";
import { IOrderItem, OrderStatus } from "@/types";
import Link from "next/link";

const RENTAL_STATUSES: OrderStatus[] = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED", "CANCELLED"];

type AdminOrdersSearchParams = Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
}>;

function getValidNumber(value: string | undefined, fallback: number) {
    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function getGearSummary(orderItems?: IOrderItem[]) {
    if (!orderItems?.length) return "Gear item unavailable";

    return orderItems
        .map((item) => {
            const title = item.gearItem?.title || "Gear item";

            return `${title} x${item.quantity}`;
        })
        .join(", ");
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: AdminOrdersSearchParams }) {
    const query = await searchParams;
    const page = getValidNumber(query.page, 1);
    const limit = getValidNumber(query.limit, 10);
    const status = RENTAL_STATUSES.includes(query.status as OrderStatus) ? (query.status as OrderStatus) : undefined;
    const search = query.search?.trim() || undefined;
    const res = await getAdminAllRentals({ page, limit, search, status });
    const { items: orders, meta } = normalizePaginatedData(res);

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <Link href="/dashboard/admin" className="text-xs text-muted-foreground hover:underline">
                    Back to Overview
                </Link>

                <div>
                    <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Content moderation</p>
                    <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Rental orders</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Inspect rental transactions and status across the platform.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Filter rental orders by gear, customer, provider, or rental status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AdminFilters
                            basePath="/dashboard/admin/orders"
                            search={search}
                            status={status}
                            limit={limit}
                            statusOptions={RENTAL_STATUSES}
                            searchPlaceholder="Search rentals..."
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>{orders.length} rental order{orders.length === 1 ? "" : "s"} shown.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Gear</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Provider</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => {
                                        const statusUi = getRentalStatusUi(order.status);

                                        return (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-mono text-xs">#{order.id.slice(0, 8)}</TableCell>
                                                <TableCell className="min-w-64 font-medium">{getGearSummary(order.orderItems)}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {order.customer?.name || order.customer?.email || order.customerId || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {order.provider?.name || order.provider?.email || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDate(order.startDate)} to {formatDate(order.endDate)}
                                                </TableCell>
                                                <TableCell className="font-semibold">BDT {Number(order.totalPrice || 0).toLocaleString("en-US")}</TableCell>
                                                <TableCell>
                                                    <span className={cn("inline-flex rounded-md px-2.5 py-1 text-xs font-semibold", statusUi.badgeClassName)}>
                                                        {statusUi.label}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="rounded-md border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
                                No rental orders matched the current filters.
                            </div>
                        )}
                    </CardContent>
                    <AdminPagination
                        basePath="/dashboard/admin/orders"
                        meta={meta}
                        itemCount={orders.length}
                        params={{
                            page: String(page),
                            limit: String(limit),
                            search,
                            status,
                        }}
                    />
                </Card>
            </div>
        </section>
    );
}
