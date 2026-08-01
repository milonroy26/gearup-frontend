"use client";

import { Button } from "@/components/ui/button";
import { initiatePayment } from "@/features/payment/actions/payment.action";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PaymentButtonProps = {
    rentalOrderId: string;
};

export default function PaymentButton({ rentalOrderId }: PaymentButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            const res = await initiatePayment(rentalOrderId);
            const paymentUrl = res.data?.paymentUrl;

            if (res.success && paymentUrl) {
                window.location.href = paymentUrl;
                return;
            }

            toast.error(res.message || "Payment session could not be created");
        } catch {
            toast.error("Failed to start payment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            type="button"
            variant="flag"
            size="sm"
            disabled={isLoading}
            onClick={handlePayment}
            className="rounded-md"
        >
            <CreditCard className="size-4" strokeWidth={1.8} />
            {isLoading ? "Starting..." : "Pay Now"}
        </Button>
    );
}
