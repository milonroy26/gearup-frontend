import { IGearItem } from "@/types";
import { ArrowUpRight, PackageCheck, PackageX } from "lucide-react";
import Link from "next/link";

interface GearCardProps {
    gear: IGearItem;
}

export default function GearCard({ gear }: GearCardProps) {
    const isAvailable = gear.isAvailable && gear.stock > 0;
    const categoryName = gear.category?.name;

    return (
        <article className="group flex min-h-72 flex-col justify-between border border-border bg-card p-5 text-card-foreground shadow-sm transition-colors hover:border-emerald-500/45 dark:hover:border-emerald-300/45">
            <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                        {isAvailable ? (
                            <PackageCheck className="size-6" strokeWidth={1.7} />
                        ) : (
                            <PackageX className="size-6 text-red-500 dark:text-red-300" strokeWidth={1.7} />
                        )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                            {gear.brand}
                        </span>
                        {categoryName && (
                            <span className="border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-emerald-600 dark:text-emerald-300">
                                {categoryName}
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="font-heading text-xl font-bold tracking-normal transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                    {gear.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {gear.description}
                </p>
            </div>

            <div className="mt-8 border-t border-border pt-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                        className={`text-xs font-semibold uppercase tracking-normal ${isAvailable ? "text-emerald-600 dark:text-emerald-300" : "text-red-500 dark:text-red-300"
                            }`}
                    >
                        {isAvailable ? `${gear.stock} available` : "Out of stock"}
                    </span>
                    <div className="text-right">
                        <span className="font-heading text-2xl font-bold">
                            BDT {gear.pricePerDay}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground"> / day</span>
                    </div>
                </div>

                <Link
                    href={`/gear/${gear.id}`}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-400 px-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300"
                >
                    View Details
                    <ArrowUpRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}
