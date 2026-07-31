export interface IAddGearPayload {
    title: string;
    description: string;
    brand: string;
    pricePerDay: number;
    stock: number;
    isAvailable?: boolean;
    categoryId: string;
}

export interface IUpdateGearPayload {
    title?: string;
    description?: string;
    brand?: string;
    pricePerDay?: number;
    stock?: number;
    isAvailable?: boolean;
    categoryId?: string;
}
