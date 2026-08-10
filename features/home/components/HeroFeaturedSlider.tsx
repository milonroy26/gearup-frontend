"use client";

import { IGearItem } from "@/types";
import { ArrowRight, CalendarCheck, PackageCheck, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

function getRatingLabel(gear: IGearItem) {
    const rawRating = gear.averageRating ?? gear.rating;
    const rating = typeof rawRating === "number" ? rawRating : rawRating ? Number(rawRating) : null;

    if (rating !== null && Number.isFinite(rating)) {
        return `${Math.min(Math.max(rating, 0), 5).toFixed(1)} rating`;
    }

    return "New listing";
}

export default function HeroFeaturedSlider({ featuredGears }: { featuredGears: IGearItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [isPaused, setIsPaused] = useState(false);
    const hasSlides = featuredGears.length > 0;
    const slideCount = featuredGears.length;
    const safeActiveIndex = slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;
    const featuredGear = featuredGears[safeActiveIndex];
    const categoryName = featuredGear?.category?.name || "Gear";

    const featureTiles = useMemo(() => (
        featuredGear
            ? [
                { icon: ShieldCheck, text: "Verified provider" },
                { icon: CalendarCheck, text: `${featuredGear.stock} available` },
                { icon: Star, text: getRatingLabel(featuredGear) },
            ]
            : [
                { icon: ShieldCheck, text: "Verified providers" },
                { icon: CalendarCheck, text: "Live availability" },
                { icon: Star, text: "Reviews enabled" },
            ]
    ), [featuredGear]);

    const goToSlide = useCallback((nextIndex: number, nextDirection: "next" | "prev" = "next") => {
        if (slideCount <= 0) return;

        setDirection(nextDirection);
        setActiveIndex(((nextIndex % slideCount) + slideCount) % slideCount);
    }, [slideCount]);

    useEffect(() => {
        if (slideCount <= 1 || isPaused) return;

        const intervalId = window.setInterval(() => {
            goToSlide(safeActiveIndex + 1, "next");
        }, 4500);

        return () => window.clearInterval(intervalId);
    }, [goToSlide, isPaused, safeActiveIndex, slideCount]);

    return (
        <div
            className="h-full rounded-lg border border-border/80 bg-card/85 p-3 shadow-2xl shadow-emerald-950/10 backdrop-blur dark:bg-card/70 dark:shadow-black/30"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Featured gear"
        >
            <div className="flex min-h-160 flex-col rounded-md bg-[#123927] p-4 text-white sm:min-h-113.75">
                <div
                    key={featuredGear?.id || "gear-fallback"}
                    className={`flex flex-1 flex-col ${direction === "next" ? "animate-[gearup-slide-next_380ms_ease-out]" : "animate-[gearup-slide-prev_380ms_ease-out]"}`}
                >
                    <div className="relative flex min-h-6 items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs uppercase text-emerald-100/80">
                                Featured kit
                            </p>
                            <h2 className="mt-2 line-clamp-2 font-heading text-2xl font-bold leading-tight">
                                {featuredGear?.title || "Gear listings coming soon"}
                            </h2>
                        </div>
                        {featuredGear && (
                            <div className="max-w-32 shrink-0 rounded-md bg-emerald-300 px-3 py-2 text-center text-sm font-bold leading-tight text-emerald-950">
                                BDT {featuredGear.pricePerDay}/day
                            </div>
                        )}
                    </div>

                    <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-[1fr_0.72fr]">
                        <div className="relative aspect-4/3 h-full min-h-64 overflow-hidden rounded-md border border-white/20 bg-emerald-900/40 sm:aspect-auto">
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
                                <div className="flex h-full min-h-64 items-center justify-center bg-emerald-500/10">
                                    <PackageCheck className="size-20 text-emerald-200" strokeWidth={1.4} />
                                </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 min-h-24 bg-linear-to-t from-emerald-950/90 to-transparent p-4">
                                <p className="text-xs font-semibold uppercase text-emerald-100/80">
                                    {categoryName}
                                </p>
                                <p className="mt-1 line-clamp-2 text-sm leading-5 text-emerald-50">
                                    {featuredGear?.description || "Providers are preparing fresh rental gear for the marketplace."}
                                </p>
                            </div>
                        </div>

                        <div className="flex min-h-full flex-col gap-3">
                            {featureTiles.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.text} className="min-h-20 rounded-md bg-white/10 p-3 text-sm leading-5">
                                        <Icon className="mb-2 size-5 text-emerald-200" strokeWidth={1.8} />
                                        <span className="line-clamp-2">{item.text}</span>
                                    </div>
                                );
                            })}

                            <div className="mt-auto grid min-h-10 gap-2">
                                <Link
                                    href={featuredGear ? `/gear/${featuredGear.id}` : "/gear"}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-200"
                                >
                                    {featuredGear ? "View details" : "Explore gear"}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex min-h-2 items-center justify-center gap-2">
                    {hasSlides && slideCount > 1 && (
                        featuredGears.map((gear, index) => (
                            <button
                                key={gear.id}
                                type="button"
                                onClick={() => goToSlide(index, index >= safeActiveIndex ? "next" : "prev")}
                                aria-label={`Show ${gear.title}`}
                                aria-current={safeActiveIndex === index ? "true" : undefined}
                                className={`h-2 rounded-full transition-all ${safeActiveIndex === index
                                    ? "w-7 bg-emerald-300"
                                    : "w-2 bg-white/35 hover:bg-white/60"
                                    }`}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
