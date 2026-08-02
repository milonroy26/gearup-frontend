import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const stats = ["650+ items", "24h pickup", "Deposit safe"];

const Hero = () => {
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
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase text-emerald-100/80">Featured kit</p>
                                <h2 className="mt-2 font-heading text-3xl font-bold">Weekend Cricket Set</h2>
                            </div>
                            <div className="rounded-md bg-emerald-300 px-3 py-2 text-sm font-bold text-emerald-950">💳50/day</div>
                        </div>
                        <div className="mt-8 grid grid-cols-[1fr_0.7fr] gap-4">
                            <div className="min-h-48 rounded-md bg-[linear-gradient(160deg,#d9f99d,#34d399_54%,#0f766e)] p-4">
                                <div className="h-full rounded-md border border-white/30 bg-white/20 p-4 shadow-inner">
                                    <div className="h-28 rounded-md bg-white/75" />
                                    <div className="mt-4 h-3 w-24 rounded-full bg-white/70" />
                                    <div className="mt-2 h-3 w-32 rounded-full bg-white/45" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { icon: ShieldCheck, text: "Verified provider" },
                                    { icon: CalendarCheck, text: "Jul 31 available" },
                                    { icon: Star, text: "4.9 rating" },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.text} className="rounded-md bg-white/10 p-3 text-sm">
                                            <Icon className="mb-2 size-5 text-emerald-200" strokeWidth={1.8} />
                                            {item.text}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
