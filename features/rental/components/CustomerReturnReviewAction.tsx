"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectOption } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReview, returnRentalOrder } from "@/features/rental/actions/rental.action";
import { RotateCcw, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type CustomerReturnReviewActionProps = {
    orderId: string;
    gearItemId?: string;
};

export default function CustomerReturnReviewAction({
    orderId,
    gearItemId,
}: CustomerReturnReviewActionProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState("5");
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        const trimmedComment = comment.trim();

        if (!gearItemId) {
            toast.error("Gear item is missing for this order");
            return;
        }

        if (!rating) {
            toast.error("Please select a rating");
            return;
        }

        if (!trimmedComment) {
            toast.error("Please write a review comment");
            return;
        }

        setIsSubmitting(true);

        try {
            const returnRes = await returnRentalOrder(orderId);

            if (!returnRes.success) {
                toast.error(returnRes.message || "Failed to return gear");
                return;
            }

            const reviewRes = await createReview({
                gearItemId,
                rating,
                comment: trimmedComment,
            });

            if (!reviewRes.success) {
                toast.error(reviewRes.message || "Gear returned, but review could not be created");
                router.refresh();
                return;
            }

            toast.success("Gear returned and review submitted");
            setIsOpen(false);
            setComment("");
            setRating("5");
            router.refresh();
        } catch {
            toast.error("Something went wrong while returning gear");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!gearItemId) {
        return (
            <Button type="button" variant="outline" size="sm" disabled className="rounded-md">
                Missing gear
            </Button>
        );
    }

    if (!isOpen) {
        return (
            <Button
                type="button"
                variant="flag"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="rounded-md"
            >
                <RotateCcw className="size-4" strokeWidth={1.8} />
                Return & Review
            </Button>
        );
    }

    return (
        <div className="w-64 space-y-2 rounded-md border border-border bg-background p-3 shadow-sm">
            <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground" htmlFor={`rating-${orderId}`}>
                    Rating
                </label>
                <Select
                    id={`rating-${orderId}`}
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    disabled={isSubmitting}
                >
                    {[5, 4, 3, 2, 1].map((value) => (
                        <SelectOption key={value} value={String(value)}>
                            {value} Star{value === 1 ? "" : "s"}
                        </SelectOption>
                    ))}
                </Select>
            </div>

            <div className="grid gap-1.5">
                <label className="text-xs font-medium text-muted-foreground" htmlFor={`comment-${orderId}`}>
                    Review
                </label>
                <Textarea
                    id={`comment-${orderId}`}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    disabled={isSubmitting}
                    placeholder="Share your experience"
                    className="min-h-20"
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={() => setIsOpen(false)}
                    className="rounded-md"
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="flag"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="rounded-md"
                >
                    <Star className="size-4" strokeWidth={1.8} />
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
}
