import { IApiResponse, IPaginationMeta } from "@/types";
import { IPaginatedData } from "../types/admin.type";

export type AdminListResponse<T> = IApiResponse<T[] | IPaginatedData<T> | { data?: T[]; meta?: IPaginationMeta }>;

export function normalizePaginatedData<T>(response: AdminListResponse<T>): IPaginatedData<T> {
    const payload = response.data;

    if (Array.isArray(payload)) {
        return {
            items: payload,
            meta: response.meta || {
                page: 1,
                limit: payload.length,
                total: payload.length,
                totalPage: 1,
            },
        };
    }

    if (payload && Array.isArray((payload as { items?: T[] }).items)) {
        const paginated = payload as IPaginatedData<T>;

        return {
            items: paginated.items,
            meta: paginated.meta || response.meta || {},
        };
    }

    if (payload && Array.isArray((payload as { data?: T[] }).data)) {
        const nested = payload as { data?: T[]; meta?: IPaginationMeta };

        return {
            items: nested.data || [],
            meta: nested.meta || response.meta || {},
        };
    }

    return {
        items: [],
        meta: response.meta || {},
    };
}

export function getTotalPages(meta: IPaginationMeta, fallbackItemsLength: number) {
    return Math.max(1, meta.totalPage || meta.totalPages || (meta.total && meta.limit ? Math.ceil(meta.total / meta.limit) : 1) || (fallbackItemsLength ? 1 : 1));
}
