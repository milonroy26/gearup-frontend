import { IGearItem } from "@/types";
import { ArrowUpRight, PackageCheck, PackageX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GearCardProps {
    gear: IGearItem;
}

export default function GearCard({ gear }: GearCardProps) {
    const isAvailable = gear.isAvailable && gear.stock > 0;
    const categoryName = gear.category?.name;

    return (
        <article className="group flex min-h-72 flex-col justify-between overflow-hidden border border-border bg-card text-card-foreground shadow-sm transition-colors hover:border-emerald-500/45 dark:hover:border-emerald-300/45">
            <div>
                <div className="relative aspect-4/3 overflow-hidden border-b border-border bg-muted">
                    {gear.image ? (
                        <Image
                            src={gear.image}
                            alt={gear.title}
                            fill
                            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                            {isAvailable ? (
                                <PackageCheck className="size-20" strokeWidth={1.4} />
                            ) : (
                                <PackageX className="size-20 text-red-500 dark:text-red-300" strokeWidth={1.4} />
                            )}
                        </div>
                    )}

                    <div className="absolute left-3 top-3 flex size-10 items-center justify-center border border-white/30 bg-background/90 text-emerald-600 shadow-sm backdrop-blur dark:text-emerald-300">
                        {isAvailable ? (
                            <PackageCheck className="size-5" strokeWidth={1.7} />
                        ) : (
                            <PackageX className="size-5 text-red-500 dark:text-red-300" strokeWidth={1.7} />
                        )}
                    </div>

                    <div className="absolute right-3 top-3 flex max-w-[calc(100%-4rem)] flex-col items-end gap-2">
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

                <div className="p-5">
                    <h3 className="font-heading text-xl font-bold tracking-normal transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                        {gear.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {gear.description}
                    </p>
                </div>
            </div>

            <div className="mx-5 mb-5 mt-3 border-t border-border pt-4">
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
