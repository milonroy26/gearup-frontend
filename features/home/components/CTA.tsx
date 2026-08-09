import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, CalendarCheck, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

const trustPoints = [
    {
        icon: ShieldCheck,
        title: "Secure payments",
        body: "Keep orders and checkout records in one clear flow.",
    },
    {
        icon: BadgeCheck,
        title: "Verified providers",
        body: "Rent from local owners with visible listings and stock.",
    },
    {
        icon: CalendarCheck,
        title: "Easy returns",
        body: "Finish the rental, return the gear, and leave a review.",
    },
];

const CTA = () => {
    return (
        <section className="bg-[linear-gradient(135deg,#fff7ed_0%,#fefce8_50%,#ecfdf5_100%)] py-16 dark:bg-[linear-gradient(135deg,#241407_0%,#1f1d0b_52%,#072016_100%)] md:py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/25 bg-background/75 px-4 py-2 text-xs font-semibold uppercase text-emerald-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-emerald-300">
                        <PackageCheck className="size-4" strokeWidth={1.8} />
                        Ready when you are
                    </span>
                    <h2 className="mt-6 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                        Your next match doesn&apos;t need a shopping cart.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                        Rent what you need for the exact days you need it, or turn idle equipment into a reliable local rental listing.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Button asChild variant="flag" size="lg" className="h-11 rounded-md px-5">
                            <Link href="/gear">
                                Browse Gear <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-11 rounded-md bg-background/70 px-5">
                            <Link href="/register">List Your Gear</Link>
                        </Button>
                    </div>
                </div>

                <div className="border border-border/80 bg-card/85 p-5 text-card-foreground shadow-xl shadow-emerald-950/10 backdrop-blur dark:bg-card/70 dark:shadow-black/30">
                    <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                        <div>
                            <p className="text-xs font-semibold uppercase text-amber-700 dark:text-amber-300">
                                GearUp advantage
                            </p>
                            <h3 className="mt-2 font-heading text-2xl font-bold">
                                Book with confidence.
                            </h3>
                        </div>
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-emerald-400 text-emerald-950">
                            <ShieldCheck className="size-6" strokeWidth={1.8} />
                        </span>
                    </div>

                    <div className="mt-5 space-y-3">
                        {trustPoints.map((point) => {
                            const Icon = point.icon;

                            return (
                                <div key={point.title} className="flex gap-4 border border-border bg-background/80 p-4 dark:bg-white/5">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                        <Icon className="size-5" strokeWidth={1.8} />
                                    </span>
                                    <div>
                                        <h4 className="font-heading text-sm font-bold">{point.title}</h4>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{point.body}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
