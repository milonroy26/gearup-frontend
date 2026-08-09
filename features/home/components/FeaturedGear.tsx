import { Button } from "@/components/ui/button";
import GearCard from "@/features/gear/components/GearCard";
import { IGearItem } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedGear({ gears }: { gears: IGearItem[] }) {
    return (
        <section className="border-t border-border bg-background py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">
                            Featured rentals
                        </p>
                        <h2 className="max-w-2xl font-heading text-3xl font-bold text-foreground md:text-4xl">
                            Popular gear ready for your next game.
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                            Fresh picks from local providers, ready to book for practice sessions, weekend plans, and match days.
                        </p>
                    </div>
                </div>

                {gears.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {gears.map((gear) => (
                            <GearCard key={gear.id} gear={gear} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-40 flex-col items-center justify-center border border-border bg-card px-6 py-10 text-center">
                        <p className="font-heading text-lg font-bold uppercase tracking-normal">
                            No Featured Gear Yet
                        </p>
                        <p className="mt-2 max-w-md text-sm text-muted-foreground">
                            New rental items will appear here as soon as providers publish available gear.
                        </p>
                    </div>
                )}

                <div className="mt-9 flex justify-center">
                    <Button asChild variant="flag" size="lg" className="rounded-md px-5">
                        <Link href="/gear">
                            Explore More <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
