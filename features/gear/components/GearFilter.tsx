"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const sortByOptions = [
    { label: "Newest", value: "createdAt" },
    { label: "Price", value: "pricePerDay" },
];

const sortOrderOptions = [
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
];

export default function GearFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        const nextValue = value.trim();

        if (nextValue) {
            params.set(key, nextValue);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            const queryString = params.toString();
            router.replace(queryString ? `${pathname}?${queryString}` : pathname);
        });
    };

    const clearFilters = () => {
        startTransition(() => {
            router.replace(pathname);
        });
    };

    const hasFilters = Boolean(searchParams.toString());

    return (
        <section className="border border-border bg-card p-4 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-emerald-600 dark:text-emerald-300" />
                    <h2 className="font-heading text-sm font-bold uppercase tracking-normal">
                        Find Gear
                    </h2>
                </div>
                {isPending && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                        Updating...
                    </span>
                )}
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_120px_120px_150px_140px_auto]">
                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Search
                    </span>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search title, brand, description..."
                            defaultValue={searchParams.get("query")?.toString()}
                            onChange={(event) => updateFilter("query", event.target.value)}
                            className="h-11 rounded-md pl-9 text-sm"
                        />
                    </div>
                </label>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Min Price
                    </span>
                    <Input
                        type="number"
                        min="0"
                        defaultValue={searchParams.get("minPrice")?.toString()}
                        onChange={(event) => updateFilter("minPrice", event.target.value)}
                        className="h-11 rounded-md text-sm"
                    />
                </label>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Max Price
                    </span>
                    <Input
                        type="number"
                        min="0"
                        defaultValue={searchParams.get("maxPrice")?.toString()}
                        onChange={(event) => updateFilter("maxPrice", event.target.value)}
                        className="h-11 rounded-md text-sm"
                    />
                </label>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Sort By
                    </span>
                    <select
                        defaultValue={searchParams.get("sortBy")?.toString() || "createdAt"}
                        onChange={(event) => updateFilter("sortBy", event.target.value)}
                        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring/50"
                    >
                        {sortByOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Order
                    </span>
                    <select
                        defaultValue={searchParams.get("sortOrder")?.toString() || "desc"}
                        onChange={(event) => updateFilter("sortOrder", event.target.value)}
                        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring/50"
                    >
                        {sortOrderOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex items-end">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={clearFilters}
                        disabled={!hasFilters}
                        className="h-11 w-full rounded-md"
                    >
                        <RotateCcw className="size-4" />
                        Clear
                    </Button>
                </div>
            </div>
        </section>
    );
}
