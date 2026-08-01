/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import { IApiResponse, IGearItem, IPaginationMeta, IRentalOrder, IUser, OrderStatus, UserRole, UserStatus } from "@/types";
import { revalidateTag } from "next/cache";
import { IAdminListQuery, IAdminRentalsQuery, IAdminUsersQuery, IDashboardMetrics, IPaginatedData } from "../types/admin.type";



const USER_ROLES: UserRole[] = ["CUSTOMER", "PROVIDER", "ADMIN"];
const USER_STATUSES: UserStatus[] = ["ACTIVE", "SUSPENDED"];
const RENTAL_STATUSES: OrderStatus[] = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED", "CANCELLED"];

const appendListQuery = (query?: IAdminListQuery) => {
    const params = new URLSearchParams();

    if (query?.page && query.page > 0) params.set("page", String(query.page));
    if (query?.limit && query.limit > 0) params.set("limit", String(query.limit));
    if (query?.search?.trim()) params.set("search", query.search.trim());

    return params;
};

//* Get Dashboard Metrics
export const getAdminDashboardMetrics = async () => {
    try {
        return await fetcher<IApiResponse<IDashboardMetrics>>("/admin/metrics", {
            revalidate: 0,
            tags: ["admin-metrics"],
        });
    } catch (error: any) {
        try {
            return await fetcher<IApiResponse<IDashboardMetrics>>("/dashboard/metrics", {
                revalidate: 0,
                tags: ["admin-metrics"],
            });
        } catch {
            return {
                success: false,
                message: error.message || "Failed to fetch dashboard metrics",
                data: null,
            };
        }
    }
};

//* Get All Users
export const getAllUsers = async (query?: IAdminUsersQuery) => {
    try {
        const params = appendListQuery(query);

        if (query?.role && USER_ROLES.includes(query.role)) params.set("role", query.role);
        if (query?.status && USER_STATUSES.includes(query.status)) params.set("status", query.status);

        const queryString = params.toString();
        return await fetcher<IApiResponse<IUser[] | IPaginatedData<IUser> | { data?: IUser[]; meta?: IPaginationMeta }>>(
            `/admin/users${queryString ? `?${queryString}` : ""}`,
            {
                revalidate: 0,
                tags: ["admin-users"],
            }
        );
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch users",
            data: [],
        };
    }
};

//* Suspend or Activate User
export const toggleUserStatus = async (userId: string, status: UserStatus) => {
    try {
        const res = await fetcher<IApiResponse<IUser>>(`/admin/users/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            tags: ["admin-users"],
        });

        revalidateTag("admin-users", "max");
        revalidateTag("admin-metrics", "max");

        return res;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update user status",
            data: null,
        };
    }
};

//* Fetch All Gears for Admin Content Moderation
export const getAdminAllGears = async () => {
    try {
        return await fetcher<IApiResponse<IGearItem[]>>("/gear", {
            revalidate: 0,
            tags: ["admin-gears"],
        });
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch all gear listings",
            data: [],
        };
    }
};

//* Fetch All Rental Orders for Admin Content Moderation
export const getAdminAllRentals = async (query?: IAdminRentalsQuery) => {
    try {
        const params = appendListQuery(query);

        if (query?.status && RENTAL_STATUSES.includes(query.status)) params.set("status", query.status);

        const queryString = params.toString();
        return await fetcher<IApiResponse<IRentalOrder[] | IPaginatedData<IRentalOrder> | { data?: IRentalOrder[]; meta?: IPaginationMeta }>>(
            `/admin/rentals${queryString ? `?${queryString}` : ""}`,
            {
                revalidate: 0,
                tags: ["admin-rentals"],
            }
        );
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch all rental orders",
            data: [],
        };
    }
};
