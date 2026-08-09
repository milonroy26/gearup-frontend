// User & Auth Types
export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status?: UserStatus;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Gear Types
export interface IGearItem {
    id: string;
    title: string;
    description: string;
    image?: string;
    rating?: number | string;
    averageRating?: number | string;
    reviewCount?: number;
    reviewsCount?: number;
    brand: string;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    providerId: string;
    categoryId: string;
    category?: {
        id: string;
        name: string;
        createdAt?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface ICategory {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

// Order Status Enum
export type OrderStatus =
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";

// Order & Rental Types
export interface IRentalOrder {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: OrderStatus;
    customerId: string;
    customer?: IUser;
    provider?: IUser;
    createdAt?: string;
    updatedAt?: string;
    orderItems?: IOrderItem[];
}

export interface IOrderItem {
    id: string;
    rentalOrderId: string;
    gearItemId: string;
    quantity: number;
    gearItem?: IGearItem;
}

// Generic API Response
export interface IApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: IPaginationMeta;
}

export interface IPaginationMeta {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
    totalPages?: number;
}
