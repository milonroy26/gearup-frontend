import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSingleGear } from "@/features/gear/action/gear.action";
import BookingForm from "@/features/rental/components/BookingForm";
import { ArrowLeft, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RentPageProps {
    params: Promise<{ id: string }>;
}

export default async function RentPage({ params }: RentPageProps) {
    const { id } = await params;

    const res = await getSingleGear(id);

    if (!res.success || !res.data) {
        notFound();
    }

    const gear = res.data;

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Button asChild variant="ghost" className="mb-6 rounded-md">
                    <Link href={`/gear/${gear.id}`}>
                        <ArrowLeft className="size-4" strokeWidth={1.8} />
                        Back to gear details
                    </Link>
                </Button>

                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    <div>
                        <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Customer booking</p>
                        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Confirm rental booking</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Reserve <span className="font-semibold text-foreground">{gear.title}</span> from {gear.brand}.
                        </p>
                        {/* Booking Form */}
                        <div className="mt-6">
                            <BookingForm gearId={gear.id} pricePerDay={gear.pricePerDay} />
                        </div>
                    </div>

                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Booking summary</CardTitle>
                            <CardDescription>Review the item before placing the rental.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex min-h-40 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10">
                                <PackageCheck className="size-16 text-emerald-600 dark:text-emerald-300" strokeWidth={1.4} />
                            </div>
                            <div>
                                <h2 className="font-heading text-xl font-bold">{gear.title}</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{gear.category?.name || "Sports gear"} by {gear.brand}</p>
                            </div>
                            <div className="rounded-md border border-border p-4">
                                <p className="text-xs font-semibold uppercase text-muted-foreground">Daily rate</p>
                                <p className="mt-2 font-heading text-3xl font-bold">BDT {gear.pricePerDay}</p>
                            </div>
                            <div className="flex items-start gap-3 rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
                                <ShieldCheck className="mt-0.5 size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.8} />
                                Your order is created first, then payment/status updates stay visible in My Orders.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
