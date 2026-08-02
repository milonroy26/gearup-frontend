export interface ICreateRentalPayload {
    startDate: string;
    endDate: string;
    items: {
        gearItemId: string;
        quantity: number;
    }[];
}

export interface ICreateReviewPayload {
    gearItemId: string;
    rating: string;
    comment: string;
}
