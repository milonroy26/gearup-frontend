import { IRentalOrder, OrderStatus } from "@/types";

const ORDER_STATUSES: OrderStatus[] = [
    "PLACED",
    "CONFIRMED",
    "PAID",
    "PICKED_UP",
    "RETURNED",
    "CANCELLED",
];

const statusLabels: Record<OrderStatus, string> = {
    PLACED: "Placed",
    CONFIRMED: "Confirmed",
    PAID: "Paid",
    PICKED_UP: "Picked Up",
    RETURNED: "Returned",
    CANCELLED: "Cancelled",
};

function shortDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

export function buildStatusChartData(orders: IRentalOrder[]) {
    return ORDER_STATUSES.map((status) => ({
        label: statusLabels[status],
        value: orders.filter((order) => order.status === status).length,
    }));
}

export function buildOrderActivityChartData(orders: IRentalOrder[], value: "count" | "revenue" = "count") {
    const totals = new Map<string, number>();

    orders.forEach((order) => {
        const sourceDate = order.createdAt || order.startDate;
        const key = shortDate(sourceDate);
        const current = totals.get(key) || 0;
        totals.set(key, current + (value === "revenue" ? order.totalPrice : 1));
    });

    return Array.from(totals.entries())
        .slice(-7)
        .map(([label, total]) => ({
            label,
            value: total,
        }));
}

export function buildMetricChartData(metrics: Array<{ label: string; value: number }>) {
    return metrics.map((metric) => ({
        label: metric.label,
        value: Number.isFinite(metric.value) ? metric.value : 0,
    }));
}
