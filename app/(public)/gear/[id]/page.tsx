import { getSingleGear } from "@/features/gear/action/gear.action";
import { ArrowLeft, CalendarCheck, PackageCheck, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GearDetailsPageProps {
    params: Promise<{ id: string; }>;
}

export default async function GearDetailsPage({ params }: GearDetailsPageProps) {
    const { id } = await params;
    const res = await getSingleGear(id);

    if (!res.success || !res.data) {
        notFound();
    }

    const gear = res.data;
    const isAvailable = gear.isAvailable && gear.stock > 0;
    const categoryName = gear.category?.name;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href="/gear"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to Browse Gear
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_360px]">
                    <section className="border border-border bg-card p-6 text-card-foreground sm:p-8">
                        <div className="mb-8 flex min-h-64 items-center justify-center border border-emerald-500/20 bg-emerald-500/10">
                            <PackageCheck className="size-24 text-emerald-600 dark:text-emerald-300" strokeWidth={1.4} />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-normal text-emerald-600 dark:text-emerald-300">
                                <Tag className="size-3.5" />
                                {gear.brand}
                            </span>
                            {categoryName && (
                                <span className="border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                                    {categoryName}
                                </span>
                            )}
                            <span
                                className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-normal ${isAvailable
                                    ? "border-emerald-500/25 text-emerald-600 dark:text-emerald-300"
                                    : "border-red-500/25 text-red-500 dark:text-red-300"
                                    }`}
                            >
                                {isAvailable ? "In Stock" : "Unavailable"}
                            </span>
                        </div>

                        <h1 className="mt-5 font-heading text-4xl font-bold uppercase tracking-normal">
                            {gear.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                            {gear.description}
                        </p>

                        <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Stock
                                </p>
                                <p className="mt-2 text-lg font-bold">{gear.stock} items</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Category
                                </p>
                                <p className="mt-2 text-lg font-bold">
                                    {categoryName || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </section>

                    <aside className="h-fit border border-border bg-card p-6 text-card-foreground">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                            Rental Price
                        </p>
                        <div className="mt-3">
                            <span className="font-heading text-4xl font-bold">
                                BDT {gear.pricePerDay}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground"> / day</span>
                        </div>

                        <div className="mt-6 space-y-3 border-y border-border py-5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <CalendarCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                Instant rental request
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                Secure payment flow
                            </div>
                            <div className="flex items-center gap-3">
                                <PackageCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                {isAvailable ? `${gear.stock} units ready` : "Currently not available"}
                            </div>
                        </div>

                        <Link
                            href={`/dashboard/customer/rent/${gear.id}`}
                            className={`mt-6 flex h-12 w-full items-center justify-center rounded-md px-4 text-sm font-bold transition-colors ${isAvailable
                                ? "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                                : "pointer-events-none bg-muted text-muted-foreground"
                                }`}
                            aria-disabled={!isAvailable}
                        >
                            Book Now / Rent
                        </Link>
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Instant confirmation. Secure payment.
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
