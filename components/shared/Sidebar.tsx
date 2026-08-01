"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { ClipboardList, Gauge, PackagePlus, PackageSearch, Shield, Store, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const roleNav: Record<UserRole, { label: string; href: string; icon: typeof Gauge }[]> = {
    CUSTOMER: [
        { label: "Overview", href: "/dashboard/customer", icon: Gauge },
        { label: "My Orders", href: "/dashboard/customer/orders", icon: ClipboardList },
        { label: "Browse Gear", href: "/gear", icon: PackageSearch },
    ],
    PROVIDER: [
        { label: "Provider Home", href: "/dashboard/provider", icon: Store },
        { label: "Incoming Orders", href: "/dashboard/provider/orders", icon: ClipboardList },
        { label: "Add Gear", href: "/dashboard/provider/gear/new", icon: PackagePlus },
        { label: "Browse Gear", href: "/gear", icon: PackageSearch },
    ],
    ADMIN: [
        { label: "Admin Home", href: "/dashboard/admin", icon: Shield },
        { label: "Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Gear Moderation", href: "/dashboard/admin/gears", icon: PackageSearch },
        { label: "Rental Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
        { label: "Browse Gear", href: "/gear", icon: PackageSearch },
    ],
};

function isActive(pathname: string, href: string) {
    return pathname === href || (href !== "/gear" && pathname.startsWith(`${href}/`));
}

const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useAuth();
    const role = user?.role ?? "CUSTOMER";
    const items = roleNav[role];

    return (
        <aside className="border-b border-border bg-card text-card-foreground md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-72 md:border-b-0 md:border-r">
            <div className="flex h-full flex-col p-4">
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-3">
                        {/* <span className="flex size-10 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                            <Backpack className="size-5" strokeWidth={1.8} />
                        </span> */}
                        <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground">{role.toLowerCase()}</p>
                            <h2 className="font-heading text-lg font-bold">{user?.name ?? "GearUp Member"}</h2>
                        </div>
                    </div>
                </div>

                <nav className="mt-5 grid gap-1">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                                    active && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                )}
                            >
                                <Icon className="size-4" strokeWidth={1.8} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
