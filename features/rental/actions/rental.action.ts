/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, IRentalOrder } from "@/types";
import { ICreateRentalPayload } from "../types/rental.type";

//* Create rental Order Action
export const createRentalOrder = async (payload: ICreateRentalPayload) => {
  try {
    const res = await fetcher<IApiResponse<IRentalOrder>>("/rentals", {
      method: "POST",
      body: JSON.stringify(payload),
    })
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