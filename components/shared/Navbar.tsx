"use client";

import { useTheme } from "@/components/shared/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Backpack, LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Browse Gear", href: "/gear" },
    { label: "About", href: "/about" },
];

const ROLE_HOME = {
    ADMIN: "/dashboard/admin",
    PROVIDER: "/dashboard/provider",
    CUSTOMER: "/dashboard/customer",
} as const;

const navLinkClass = "text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground";

function isActiveLink(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
    const { user, isAuthenticated, logout, isLoading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const dashboardHref = user ? ROLE_HOME[user.role] : "/dashboard";
    const firstName = user?.name.split(" ")[0] ?? "Your";

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-card/95 text-card-foreground shadow-sm shadow-black/5 backdrop-blur supports-backdrop-filter:bg-card/85 dark:border-emerald-200/20 dark:bg-[#0f1812]/95 dark:shadow-black/30 dark:supports-backdrop-filter:bg-[#0f1812]/85">

            <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 font-heading text-xl font-bold tracking-normal text-foreground"
                >
                    <span className="flex size-10 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                        <Backpack className="size-5" strokeWidth={1.8} />
                    </span>
                    <span>GearUp</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                navLinkClass,
                                isActiveLink(pathname, item.href) && "text-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {isLoading ? null : isAuthenticated && user ? (
                        <>
                            <Link
                                href={dashboardHref}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                            >
                                <LayoutDashboard className="size-4" strokeWidth={1.8} />
                                {firstName}&apos;s Dashboard
                            </Link>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={logout}
                                className="rounded-md"
                            >
                                <LogOut className="size-4" strokeWidth={1.8} />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="rounded-md"
                            >
                                <Link href="/login">
                                    <LogIn className="size-4" strokeWidth={1.8} />
                                    Sign In
                                </Link>
                            </Button>
                            <Button asChild variant="flag" size="sm" className="rounded-md">
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={toggleTheme}
                        className="rounded-md"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="size-4" strokeWidth={1.8} />
                        ) : (
                            <Moon className="size-4" strokeWidth={1.8} />
                        )}
                    </Button>
                </div>

                <button
                    type="button"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted md:hidden"
                    onClick={() => setMobileOpen((open) => !open)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="size-6" strokeWidth={1.8} />
                    ) : (
                        <Menu className="size-6" strokeWidth={1.8} />
                    )}
                </button>
            </nav>

            {mobileOpen && (
                <div className="border-t border-border px-4 py-4 shadow-lg md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground",
                                    isActiveLink(pathname, item.href) && "bg-muted text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {isAuthenticated && user ? (
                            <>
                                <Link
                                    href={dashboardHref}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setMobileOpen(false);
                                        void logout();
                                    }}
                                    className="w-full rounded-md"
                                >
                                    <LogOut className="size-4" strokeWidth={1.8} />
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    Sign In
                                </Link>
                                <Button asChild variant="flag" size="sm" className="w-full rounded-md">
                                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                                        Get Started
                                    </Link>
                                </Button>
                            </>
                        )}

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-full rounded-md"
                        >
                            {theme === "dark" ? (
                                <Sun className="size-4" strokeWidth={1.8} />
                            ) : (
                                <Moon className="size-4" strokeWidth={1.8} />
                            )}
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
