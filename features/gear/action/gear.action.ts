/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, ICategory, IGearItem } from "@/types";

interface IGetGearsQueryParams {
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
}

//* GET ALL GEAR
export const getAllGears = async (queryParams?: IGetGearsQueryParams) => {

    try {
        const params = new URLSearchParams();

        if (queryParams?.minPrice) params.set("minPrice", queryParams.minPrice);
        if (queryParams?.maxPrice) params.set("maxPrice", queryParams.maxPrice);
        if (queryParams?.categoryId) params.set("categoryId", queryParams.categoryId);
        if (queryParams?.sortBy) params.set("sortBy", queryParams.sortBy);
        if (queryParams?.sortOrder) params.set("sortOrder", queryParams.sortOrder);
        if (queryParams?.page) params.set("page", String(queryParams.page));
        if (queryParams?.limit) params.set("limit", String(queryParams.limit));

        const queryString = params.toString();
        const endpoint = `/gear${queryString ? `?${queryString}` : ""}`;

        const res = await fetcher<IApiResponse<IGearItem[]>>(endpoint, {
            revalidate: 60, // 60 seconds ISR caching
            tags: ["gears-list"],
        });

        return res;

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch gear items",
            data: [],
        };
    }

}

//* Get Single gear details
export const getSingleGear = async (gearId: string) => {
    try {
        return await fetcher<IApiResponse<IGearItem>>(`/gear/${gearId}`, {
            revalidate: 300,
            tags: [`gear-${gearId}`],
        });
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch gear details",
            data: null,
        };
    }
};

//* GET ALL CATEGORIES
export const getAllCategories = async () => {
    try {
        return await fetcher<IApiResponse<ICategory[]>>("/categories", {
            revalidate: 300,
            tags: ["categories-list"],
        });
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch categories",
            data: [],
        };
    }
};
