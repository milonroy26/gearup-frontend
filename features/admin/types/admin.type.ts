import { IPaginationMeta, OrderStatus, UserRole, UserStatus } from "@/types";

export interface IDashboardMetrics {
    summary: {
        totalUsers?: number;
        totalCustomers: number;
        activeGear?: number;
        totalProducts: number;
        totalRentals?: number;
        totalOrders: number;
        totalRevenue?: number;
    };
    recentTransactions: Array<{
        id: string;
        transactionId: string;
        amount: number;
        method: string;
        status: string;
        createdAt: string;
    }>;
}

export interface IPaginatedData<T> {
    items: T[];
    meta: IPaginationMeta;
}

export interface IAdminListQuery {
    page?: number;
    limit?: number;
    search?: string;
}

export interface IAdminUsersQuery extends IAdminListQuery {
    role?: UserRole;
    status?: UserStatus;
}

export interface IAdminRentalsQuery extends IAdminListQuery {
    status?: OrderStatus;
}