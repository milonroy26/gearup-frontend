"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createRentalOrder } from "@/features/rental/actions/rental.action";
import { CalendarDays, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface BookingFormProps {
    gearId: string;
    pricePerDay: number;
}

function daysBetween(startDate: string, endDate: string) {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
}

function toIsoDateTime(date: string) {
    return new Date(`${date}T00:00:00.000Z`).toISOString();
}

export default function BookingForm({ gearId, pricePerDay }: BookingFormProps) {
    const router = useRouter();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const rentalDays = useMemo(() => daysBetween(startDate, endDate), [startDate, endDate]);
    const totalPrice = rentalDays * pricePerDay;

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            toast.error("Please select start and end dates");
            return;
        }

        if (totalPrice <= 0) {
            toast.error("End date must be after start date");
            return;
        }

        setIsLoading(true);

        try {
            const res = await createRentalOrder({
                startDate: toIsoDateTime(startDate),
                endDate: toIsoDateTime(endDate),
                items: [
                    {
                        gearItemId: gearId,
                        quantity: 1,
                    },
                ],
            });

            if (res?.success) {
                toast.success("Rental order placed. Redirecting to My Orders...");
                router.replace("/dashboard/customer/orders");
                return;
            }

            toast.error(res?.message || "Failed to place order");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-3">
                    <span className="flex size-11 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        <CalendarDays className="size-5" strokeWidth={1.8} />
                    </span>
                    <div>
                        <CardTitle>Select rental duration</CardTitle>
                        <CardDescription>Choose dates and confirm your request.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleBooking} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="startDate" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
                                Start Date
                            </label>
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-11 rounded-md text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
                                End Date
                            </label>
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-11 rounded-md text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="rounded-md border border-border bg-muted/40 p-4">
                        <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground">
                                <ReceiptText className="size-4" strokeWidth={1.8} />
                                Price per day
                            </span>
                            <span className="font-semibold">BDT {pricePerDay}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                            <span className="text-muted-foreground">Rental days</span>
                            <span className="font-semibold">{rentalDays}</span>
                        </div>
                        <div className="mt-4 border-t border-border pt-4">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-semibold">Estimated total</span>
                                <span className="font-heading text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                    BDT {totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" variant="flag" size="lg" disabled={isLoading} className="h-11 w-full rounded-md">
                        {isLoading ? "Processing order..." : "Confirm and place rental"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
