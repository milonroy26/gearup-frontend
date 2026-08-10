import { Backpack, CircleDollarSign, ShieldCheck } from "lucide-react";
import Image from "next/image";

const missionImages = [
    {
        src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
        alt: "Sports equipment ready for players to rent",
        label: "Gear access",
    },
    {
        src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80",
        alt: "Players preparing together before a game",
        label: "Team ready",
    },
    {
        src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
        alt: "Outdoor hiking gear for weekend adventure rental",
        label: "Weekend rentals",
    },
];

const Ourmission = () => {
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
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <p className="mb-3 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">
                    Our mission
                </p>
                <h2 className="max-w-2xl font-heading text-3xl font-bold md:text-4xl">
                    Make sports gear easier to access, easier to trust, and easier to share.
                </h2>

                <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {missionImages.map((image) => (
                        <div key={image.label} className="group relative aspect-4/3 overflow-hidden border border-border bg-muted shadow-sm">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-emerald-950/85 to-transparent p-4">
                                <p className="font-heading text-lg font-bold text-white">
                                    {image.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

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
    )
}

export default Ourmission
