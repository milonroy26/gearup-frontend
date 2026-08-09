import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Backpack,
    CalendarCheck,
    CircleDollarSign,
    Handshake,
    ShieldCheck,
    Star,
    Users,
} from "lucide-react";
import Link from "next/link";

const missionItems = [
    {
        icon: Backpack,
        title: "Access without ownership",
        body: "Players can get match-ready equipment for a weekend, a practice block, or a short trip without buying gear they rarely use.",
    },
    {
        icon: CircleDollarSign,
        title: "More value from every kit",
        body: "Providers can keep useful gear earning between games while renters pay only for the days they need.",
    },
    {
        icon: ShieldCheck,
        title: "A clearer rental record",
        body: "Bookings, payments, returns, and reviews stay connected so both sides know exactly what happened.",
    },
];

const audiences = [
    {
        icon: Users,
        title: "Players and teams",
        body: "Find cricket kits, bikes, camping gear, cleats, and training tools without chasing group chats or last-minute favors.",
    },
    {
        icon: Handshake,
        title: "Local providers",
        body: "Publish inventory, receive rental requests, manage stock, and build trust through completed orders and reviews.",
    },
    {
        icon: CalendarCheck,
        title: "Weekend plans",
        body: "Book the right gear for the exact dates you need, then return it when the game, ride, or trip is done.",
    },
];

const processSteps = [
    {
        icon: Star,
        title: "Choose trusted listings",
        body: "Browse clear item details, availability, stock, price, category, and rating signals before making a decision.",
    },
    {
        icon: ShieldCheck,
        title: "Pay through the platform",
        body: "A structured checkout keeps the rental request, payment status, and order history in one place.",
    },
    {
        icon: CalendarCheck,
        title: "Return and review",
        body: "After the rental is complete, customers can return the item and leave feedback for the next renter.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
            <section className="border-b border-border bg-[linear-gradient(135deg,#f7fee7_0%,#ecfeff_48%,#fff7ed_100%)] dark:bg-[linear-gradient(135deg,#07130d_0%,#10211b_52%,#20180b_100%)]">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:px-8">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/25 bg-background/75 px-4 py-2 text-xs font-semibold uppercase text-emerald-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-emerald-300">
                            About GearUp
                        </span>
                        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-5xl">
                            GearUp helps players rent better gear without buying everything.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                            We connect renters with local providers so sports equipment can move where it is needed most. Less idle gear, fewer expensive purchases, and a cleaner rental flow from booking to return.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button asChild variant="flag" size="lg" className="rounded-md px-5">
                                <Link href="/gear">
                                    Browse gear <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-md bg-background/70 px-5">
                                <Link href="/register">Become a provider</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="border border-border/80 bg-card/85 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur dark:bg-card/70 dark:shadow-black/30">
                        <div className="border border-emerald-500/20 bg-emerald-500/10 p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">
                                        Platform snapshot
                                    </p>
                                    <h2 className="mt-2 font-heading text-3xl font-bold">
                                        Rent. Play. Return.
                                    </h2>
                                </div>
                                <span className="flex size-12 items-center justify-center rounded-md bg-emerald-400 text-emerald-950">
                                    <Backpack className="size-6" strokeWidth={1.8} />
                                </span>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                {["Verified gear", "Secure payment", "Simple returns"].map((item) => (
                                    <div key={item} className="border border-border bg-background/80 p-4 text-sm font-semibold shadow-sm dark:bg-white/5">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <p className="mb-3 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">
                        Our mission
                    </p>
                    <h2 className="max-w-2xl font-heading text-3xl font-bold md:text-4xl">
                        Make sports gear easier to access, easier to trust, and easier to share.
                    </h2>
                    <div className="mt-9 grid gap-5 md:grid-cols-3">
                        {missionItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="border border-border bg-card p-6 shadow-sm">
                                    <div className="flex size-12 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                        <Icon className="size-6" strokeWidth={1.8} />
                                    </div>
                                    <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-slate-50 py-16 dark:bg-[#111827]">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                                Who it helps
                            </p>
                            <h2 className="font-heading text-3xl font-bold md:text-4xl">
                                Built for the people around every game.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                GearUp keeps the marketplace practical: renters need fast access, providers need simple management, and everyone needs a clear record.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {audiences.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="border border-border bg-background p-6 shadow-sm">
                                        <Icon className="size-7 text-sky-700 dark:text-sky-300" strokeWidth={1.8} />
                                        <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <p className="mb-3 text-xs font-semibold uppercase text-amber-700 dark:text-amber-300">
                        Trust and flow
                    </p>
                    <h2 className="max-w-2xl font-heading text-3xl font-bold md:text-4xl">
                        Every rental has a path from discovery to feedback.
                    </h2>
                    <div className="mt-9 grid gap-5 md:grid-cols-3">
                        {processSteps.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="border border-border bg-card p-6 shadow-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="flex size-12 items-center justify-center rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300">
                                            <Icon className="size-6" strokeWidth={1.8} />
                                        </span>
                                        <span className="font-heading text-3xl font-bold text-muted-foreground/35">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[linear-gradient(135deg,#fff7ed_0%,#fefce8_50%,#ecfdf5_100%)] py-16 text-center dark:bg-[linear-gradient(135deg,#241407_0%,#1f1d0b_52%,#072016_100%)]">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold md:text-5xl">
                        Ready to rent better and play more?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                        Start with the marketplace, or create an account to list equipment that deserves more time in the game.
                    </p>
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button asChild variant="flag" size="lg" className="rounded-md px-5">
                            <Link href="/gear">
                                Find gear <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-md bg-background/70 px-5">
                            <Link href="/register">List your gear</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
