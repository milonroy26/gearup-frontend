import { getGearReviews, getSingleGear } from "@/features/gear/action/gear.action";
import { IReview } from "@/types";
import { ArrowLeft, CalendarCheck, MessageSquareText, PackageCheck, PackageX, ShieldCheck, Star, Tag, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GearDetailsPageProps {
    params: Promise<{ id: string; }>;
}

function parseRating(value: number | string | null | undefined) {
    const rating = typeof value === "number" ? value : value ? Number(value) : null;

    if (rating !== null && Number.isFinite(rating)) {
        return Math.min(Math.max(rating, 0), 5);
    }

    return null;
}

function formatReviewDate(value?: string) {
    if (!value) return "Recently";

    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function getReviewerName(review: IReview) {
    return review.customer?.name || review.customer?.email || "GearUp customer";
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default async function GearDetailsPage({ params }: GearDetailsPageProps) {
    const { id } = await params;
    const res = await getSingleGear(id);

    if (!res.success || !res.data) {
        notFound();
    }

    const gear = res.data;
    const reviewsRes = await getGearReviews(gear.id);
    const reviews = reviewsRes.data || [];
    const isAvailable = gear.isAvailable && gear.stock > 0;
    const categoryName = gear.category?.name;
    const reviewRatings = reviews
        .map((review) => parseRating(review.rating))
        .filter((reviewRating): reviewRating is number => reviewRating !== null);
    const reviewAverage = reviewRatings.length > 0
        ? reviewRatings.reduce((total, reviewRating) => total + reviewRating, 0) / reviewRatings.length
        : null;
    const rating = reviewAverage ?? parseRating(gear.averageRating ?? gear.rating);
    const reviewCount = reviews.length || gear.reviewCount || gear.reviewsCount || 0;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href="/gear"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to Browse Gear
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_360px]">
                    <section className="border border-border bg-card p-6 text-card-foreground sm:p-8">
                        <div className="relative mb-8 aspect-16/10 overflow-hidden border border-border bg-muted">
                            {gear.image ? (
                                <Image
                                    src={gear.image}
                                    alt={gear.title}
                                    fill
                                    sizes="(min-width: 1024px) 760px, 100vw"
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-emerald-500/10">
                                    {isAvailable ? (
                                        <PackageCheck className="size-24 text-emerald-600 dark:text-emerald-300" strokeWidth={1.4} />
                                    ) : (
                                        <PackageX className="size-24 text-red-500 dark:text-red-300" strokeWidth={1.4} />
                                    )}
                                </div>
                            )}

                            <div className="absolute left-4 top-4 flex size-11 items-center justify-center border border-white/30 bg-background/90 text-emerald-600 shadow-sm backdrop-blur dark:text-emerald-300">
                                {isAvailable ? (
                                    <PackageCheck className="size-5" strokeWidth={1.7} />
                                ) : (
                                    <PackageX className="size-5 text-red-500 dark:text-red-300" strokeWidth={1.7} />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-normal text-emerald-600 dark:text-emerald-300">
                                <Tag className="size-3.5" />
                                {gear.brand}
                            </span>
                            {categoryName && (
                                <span className="border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                                    {categoryName}
                                </span>
                            )}
                            <span
                                className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-normal ${isAvailable
                                    ? "border-emerald-500/25 text-emerald-600 dark:text-emerald-300"
                                    : "border-red-500/25 text-red-500 dark:text-red-300"
                                    }`}
                            >
                                {isAvailable ? "In Stock" : "Unavailable"}
                            </span>
                            <span className="inline-flex items-center gap-2 border border-amber-500/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-normal text-amber-600 dark:text-amber-300">
                                <Star className="size-3.5 fill-current" />
                                {rating !== null ? `${rating.toFixed(1)} Rating` : "New Listing"}
                            </span>
                        </div>

                        <h1 className="mt-5 font-heading text-4xl font-bold uppercase tracking-normal">
                            {gear.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                            {gear.description}
                        </p>

                        <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Rating
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center gap-0.5 text-amber-500">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`size-4 ${rating !== null && index < Math.round(rating) ? "fill-current" : ""}`}
                                                strokeWidth={1.8}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {rating !== null ? rating.toFixed(1) : "New"}
                                    </span>
                                </div>
                                {typeof reviewCount === "number" && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {reviewCount} review{reviewCount === 1 ? "" : "s"}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Stock
                                </p>
                                <p className="mt-2 text-lg font-bold">{gear.stock} items</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Category
                                </p>
                                <p className="mt-2 text-lg font-bold">
                                    {categoryName || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </section>

                    <aside className="h-fit border border-border bg-card p-6 text-card-foreground">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                            Rental Price
                        </p>
                        <div className="mt-3">
                            <span className="font-heading text-4xl font-bold">
                                BDT {gear.pricePerDay}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground"> / day</span>
                        </div>

                        <div className="mt-6 space-y-3 border-y border-border py-5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <CalendarCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                Instant rental request
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                Secure payment flow
                            </div>
                            <div className="flex items-center gap-3">
                                <PackageCheck className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} />
                                {isAvailable ? `${gear.stock} units ready` : "Currently not available"}
                            </div>
                        </div>

                        <Link
                            href={`/dashboard/customer/rent/${gear.id}`}
                            className={`mt-6 flex h-12 w-full items-center justify-center rounded-md px-4 text-sm font-bold transition-colors ${isAvailable
                                ? "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                                : "pointer-events-none bg-muted text-muted-foreground"
                                }`}
                            aria-disabled={!isAvailable}
                        >
                            Book Now / Rent
                        </Link>
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Instant confirmation. Secure payment.
                        </p>
                    </aside>
                </div>

                <section className="mt-8 border border-border bg-card p-6 text-card-foreground sm:p-8">
                    <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-300">
                                Customer Reviews
                            </p>
                            <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-normal">
                                What renters say
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                                Real feedback from customers who returned this gear after their rental.
                            </p>
                        </div>

                        <div className="flex min-w-44 items-center gap-3 rounded-md border border-amber-500/25 bg-amber-500/10 p-4">
                            <Star className="size-6 fill-current text-amber-500" strokeWidth={1.8} />
                            <div>
                                <p className="font-heading text-1xl font-bold">
                                    {rating !== null ? rating.toFixed(1) : "New"}
                                </p>
                                <p className="text-xs font-semibold uppercase text-muted-foreground">
                                    {reviewCount} review{reviewCount === 1 ? "" : "s"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {reviews.length > 0 ? (
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {reviews.map((review) => {
                                const reviewerName = getReviewerName(review);
                                const reviewRating = parseRating(review.rating) || 0;

                                return (
                                    <article key={review.id} className="rounded-md border border-border bg-background p-5 shadow-sm">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 font-heading text-sm font-bold text-emerald-700 dark:text-emerald-300">
                                                    {getInitials(reviewerName) || <UserRound className="size-5" strokeWidth={1.8} />}
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="truncate font-heading text-base font-bold">
                                                        {reviewerName}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatReviewDate(review.createdAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-1 text-amber-500">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        className={`size-4 ${index < Math.round(reviewRating) ? "fill-current" : ""}`}
                                                        strokeWidth={1.8}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                            {review.comment}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-md border border-dashed border-border bg-background px-6 py-12 text-center">
                            <MessageSquareText className="size-10 text-muted-foreground" strokeWidth={1.8} />
                            <p className="mt-4 font-heading text-lg font-bold uppercase tracking-normal">
                                No Reviews Yet
                            </p>
                            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                Be the first renter to return this gear and share your experience.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
