import { Button } from "@/components/ui/button";
import { IGearItem } from "@/types";
import { ArrowRight, CalendarCheck, MapPin, PackageCheck, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = ["650+ items", "24h pickup", "Deposit safe"];

function getRatingLabel(gear: IGearItem) {
    const rawRating = gear.averageRating ?? gear.rating;
    const rating = typeof rawRating === "number" ? rawRating : rawRating ? Number(rawRating) : null;

    if (rating !== null && Number.isFinite(rating)) {
        return `${Math.min(Math.max(rating, 0), 5).toFixed(1)} rating`;
    }

    return "New listing";
}

const Hero = ({ featuredGear }: { featuredGear?: IGearItem }) => {
    const categoryName = featuredGear?.category?.name || "Gear";

    const featureTiles = featuredGear
        ? [
            { icon: ShieldCheck, text: "Verified provider" },
            { icon: CalendarCheck, text: `${featuredGear.stock} available` },
            { icon: Star, text: getRatingLabel(featuredGear) },
        ]
        : [
            { icon: ShieldCheck, text: "Verified providers" },
            { icon: CalendarCheck, text: "Live availability" },
            { icon: Star, text: "Reviews enabled" },
        ];

    return (
        <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(135deg,#f7fee7_0%,#ecfeff_48%,#fff7ed_100%)] dark:bg-[linear-gradient(135deg,#07130d_0%,#10211b_52%,#20180b_100%)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/70 to-transparent" aria-hidden />
            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.04fr_0.96fr] md:py-24 lg:px-8">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/25 bg-background/75 px-4 py-2 text-xs font-semibold uppercase text-emerald-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-emerald-300">
                        <MapPin className="size-4" strokeWidth={1.8} />
                        Sports gear rentals near you
                    </span>
                    <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold leading-[1.03] text-foreground md:text-7xl">
                        Rent the gear.
                        <span className="block text-emerald-700 dark:text-emerald-300">Own the game.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                        Book cricket kits, cycles, camping gear, cleats, and training equipment for the days you need them. Clean checkout, verified providers, and simple returns keep your game moving.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild variant="flag" size="lg" className="rounded-md px-5">
                            <Link href="/gear">
                                Browse gear <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-md bg-background/70 px-5">
                            <Link href="/register">List your gear</Link>
                        </Button>
                    </div>
                    <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
                        {stats.map((item) => (
                            <div key={item} className="rounded-md border border-border/70 bg-background/65 px-3 py-3 text-center font-medium text-foreground shadow-sm backdrop-blur dark:bg-white/5">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-border/80 bg-card/85 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur dark:bg-card/70 dark:shadow-black/30">
                    <div className="rounded-md bg-[#123927] p-5 text-white">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs uppercase text-emerald-100/80">Featured kit</p>
                                <h2 className="mt-2 line-clamp-2 font-heading text-3xl font-bold">
                                    {featuredGear?.title || "Gear listings coming soon"}
                                </h2>
                            </div>
                            {featuredGear && (
                                <div className="shrink-0 rounded-md bg-emerald-300 px-3 py-2 text-sm font-bold text-emerald-950">
                                    BDT {featuredGear.pricePerDay}/day
                                </div>
                            )}
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.72fr]">
                            <div className="relative min-h-56 overflow-hidden rounded-md border border-white/20 bg-emerald-900/40">
                                {featuredGear?.image ? (
                                    <Image
                                        src={featuredGear.image}
                                        alt={featuredGear.title}
                                        fill
                                        sizes="(min-width: 768px) 420px, 100vw"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="flex h-full min-h-56 items-center justify-center bg-emerald-500/10">
                                        <PackageCheck className="size-20 text-emerald-200" strokeWidth={1.4} />
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-emerald-950/90 to-transparent p-4">
                                    <p className="text-xs font-semibold uppercase text-emerald-100/80">
                                        {categoryName}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-sm text-emerald-50">
                                        {featuredGear?.description || "Providers are preparing fresh rental gear for the marketplace."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {featureTiles.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.text} className="rounded-md bg-white/10 p-3 text-sm">
                                            <Icon className="mb-2 size-5 text-emerald-200" strokeWidth={1.8} />
                                            {item.text}
                                        </div>
                                    );
                                })}

                                <Link
                                    href={featuredGear ? `/gear/${featuredGear.id}` : "/gear"}
                                    className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-200"
                                >
                                    {featuredGear ? "View details" : "Explore gear"}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
