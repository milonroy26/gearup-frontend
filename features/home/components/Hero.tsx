import { Button } from "@/components/ui/button";
import HeroFeaturedSlider from "@/features/home/components/HeroFeaturedSlider";
import { IGearItem } from "@/types";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const stats = ["650+ items", "24h pickup", "Deposit safe"];

const Hero = ({ featuredGears }: { featuredGears: IGearItem[] }) => {
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

                <HeroFeaturedSlider featuredGears={featuredGears} />
            </div>
        </section>
    );
};

export default Hero;
