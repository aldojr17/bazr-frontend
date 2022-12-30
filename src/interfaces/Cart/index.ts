export interface ICartUpdateRequestPayload {
    user_id: number,
    shop_id: number,
    variant_type_id: number,
    quantity: number,
}

export interface ICartResponsePayload {
    is_success: boolean;
    data: null;
    message: string;
}