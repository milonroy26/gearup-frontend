/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, IGearItem, IRentalOrder, OrderStatus } from "@/types";
import { revalidateTag } from "next/cache";
import { IAddGearPayload, IUpdateGearPayload } from "../types/provider.type";

//* Get Provider Gear Inventory List
export const getProviderGears = async () => {
    try {
        const res = await fetcher<IApiResponse<IGearItem[]>>("/gear/provider/gear", {
            revalidate: 0,
            tags: ["provider-gears"],
        });

        return res

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch inventory",
            data: [],
        }
    }
}


//* Add provider Gear
export const addProviderGear = async (payload: IAddGearPayload) => {
    try {
        const res = await fetcher<IApiResponse<IGearItem>>("/gear/provider/gear", {
            method: "POST",
            body: JSON.stringify(payload),
            tags: ["provider-gears", "gears-list"],
        })

        revalidateTag("provider-gears", "max");
        revalidateTag("gears-list", "max");

        return res

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to add new gear",
            data: null,
        }
    }
}

//* Edit Gear
export const updateProviderGear = async (gearId: string, payload: IUpdateGearPayload) => {
    try {
        const res = await fetcher<IApiResponse<IGearItem>>(`/gear/provider/gear/${gearId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            tags: ["provider-gears", "gears-list"],
        });

        revalidateTag("provider-gears", "max");
        revalidateTag("gears-list", "max");

        return res;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update gear",
            data: null,
        };
    }
}

//* Delete Gear
export const deleteProviderGear = async (gearId: string) => {
    try {
        const res = await fetcher<IApiResponse<null>>(`/gear/provider/gear/${gearId}`, {
            method: "DELETE",
            tags: ["provider-gears", "gears-list"],
        });

        revalidateTag("provider-gears", "max");
        revalidateTag("gears-list", "max");

        return res;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete gear",
            data: null,
        };
    }
};

//* Get Provider Incoming Orders
export const getProviderOrders = async () => {
    try {
        const res = await fetcher<IApiResponse<IRentalOrder[]>>("/rentals/provider/orders", {
            revalidate: 0,
            tags: ["provider-orders"],
        });
        return res
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch incoming orders",
            data: [],
        };
    }
};

//* Update Incoming Order Status
export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
        const res = await fetcher<IApiResponse<IRentalOrder>>(`/rentals/provider/orders/${orderId}`, {
            method: "PUT",
            body: JSON.stringify({ status }),
            tags: ["provider-orders"],
        });

        revalidateTag("provider-orders", "max");

        return res;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update order status",
            data: null,
        };
    }
};
