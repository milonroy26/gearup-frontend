/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, IRentalOrder } from "@/types";
import { revalidatePath } from "next/cache";
import { ICreateRentalPayload, ICreateReviewPayload } from "../types/rental.type";

//* Create rental Order Action
export const createRentalOrder = async (payload: ICreateRentalPayload) => {
  try {
    const res = await fetcher<IApiResponse<IRentalOrder>>("/rentals", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    revalidatePath("/dashboard/customer/orders");

    return res
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to place rental order",
      data: null
    }
  }
};

//* Get Customer My Orders Action
export const getMyOrders = async () => {
  try {
    return await fetcher<IApiResponse<IRentalOrder[]>>("/rentals", {
      revalidate: 0, // No cache for fresh order status
    });
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch your orders",
      data: [],
    };
  }
};

//* Return rental Order Action
export const returnRentalOrder = async (orderId: string) => {
  try {
    const res = await fetcher<IApiResponse<IRentalOrder>>(`/rentals/${orderId}/return`, {
      method: "PATCH",
    });

    revalidatePath("/dashboard/customer/orders");

    return res;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to return gear",
      data: null,
    };
  }
};

//* Create Review Action
export const createReview = async (payload: ICreateReviewPayload) => {
  try {
    const res = await fetcher<IApiResponse<{
      id: string;
      rating: number;
      comment: string;
      customerId: string;
      gearItemId: string;
      createdAt: string;
    }>>("/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/customer/orders");
    revalidatePath(`/gear/${payload.gearItemId}`);

    return res;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create review",
      data: null,
    };
  }
};
