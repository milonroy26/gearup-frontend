import { RotateCcw, ShieldCheck, Tag } from "lucide-react";

const HOW_IT_WORKS = [
    {
        icon: Tag,
        title: "Claim your gear",
        body: "Book by date range. The listing locks to you the moment checkout clears, so there are no double bookings.",
    },
    {
        icon: ShieldCheck,
        title: "Play with a paper trail",
        body: "Every order runs through a real payment ledger, so providers and renters both have proof of the deal.",
    },
    {
        icon: RotateCcw,
        title: "Return it, get your deposit back",
        body: "Hand the gear back, the provider marks it returned, and your security deposit clears automatically.",
    },
];

const HowItWork = () => {
    return (
        <section className="border-y border-border bg-slate-50 py-16 dark:bg-[#111827]">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <p className="mb-3 text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                    The rental lifecycle
                </p>
                <h2 className="mb-10 max-w-2xl font-heading text-3xl font-bold text-foreground md:text-4xl">
                    From booking to return, every step stays clear.
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {HOW_IT_WORKS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.title} className="rounded-md border border-border bg-background p-6 shadow-sm">
                                <div className="flex size-12 items-center justify-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                    <Icon className="size-6" strokeWidth={1.8} />
                                </div>
                                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                                    {i + 1}. {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWork;
