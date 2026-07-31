import { OrderStatus, UserRole } from "@/types";

type RentalStatusUi = {
    label: string;
    badgeClassName: string;
    customerAction?: string;
    providerAction?: string;
};

export const rentalStatusUi: Record<OrderStatus, RentalStatusUi> = {
    PLACED: {
        label: "Placed",
        badgeClassName: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300",
        providerAction: "Confirm",
    },
    CONFIRMED: {
        label: "Confirmed",
        badgeClassName: "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20 dark:text-sky-300",
        customerAction: "Pay Now",
    },
    PAID: {
        label: "Paid",
        badgeClassName: "bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20 dark:text-purple-300",
        providerAction: "Mark Picked Up",
    },
    PICKED_UP: {
        label: "Picked Up",
        badgeClassName: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300",
        providerAction: "Mark Returned",
    },
    RETURNED: {
        label: "Returned",
        badgeClassName: "bg-muted text-muted-foreground ring-1 ring-border",
        customerAction: "Leave Review",
    },
    CANCELLED: {
        label: "Cancelled",
        badgeClassName: "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:text-red-300",
    },
};

export function getRentalStatusUi(status: OrderStatus) {
    return rentalStatusUi[status];
}

export function getRentalOrderAction(status: OrderStatus, role: Extract<UserRole, "CUSTOMER" | "PROVIDER">) {
    const statusUi = getRentalStatusUi(status);

    return role === "CUSTOMER" ? statusUi.customerAction : statusUi.providerAction;
}
