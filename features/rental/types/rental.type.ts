export interface ICreateRentalPayload {
    startDate: string;
    endDate: string;
    items: {
        gearItemId: string;
        quantity: number;
    }[];
}
