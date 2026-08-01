/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import { IApiResponse } from "@/types";

export interface IPaymentInitiateResponse {
    paymentUrl: string;
}

export const initiatePayment = async (
    rentalOrderId: string
): Promise<IApiResponse<IPaymentInitiateResponse | null>> => {
    if (!rentalOrderId?.trim()) {
        return {
            success: false,
            statusCode: 400,
            message: "Rental order ID is required",
            data: null,
        };
    }

    try {
        return await fetcher<IApiResponse<IPaymentInitiateResponse>>("/payments/initiate", {
            method: "POST",
            body: JSON.stringify({ rentalOrderId: rentalOrderId.trim() }),
        });
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to initiate payment session",
            data: null,
        };
    }
};
