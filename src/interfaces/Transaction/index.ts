export interface ITransactionRequestPayload {
  payment_method_id: number;
  subtotal: number;
  total: number;
  orders: IOrderPayload[];
}

export interface IOrderPayload {
  shop_id: number;
  courier_id: number;
  delivery_fee: number;
  subtotal: number;
  total: number;
  order_details: IOrderDetailPayload[];
}

export interface IOrderDetailPayload {
  product_id: number;
  variant_id: number;
  quantity: number;
  total: number;
}

export interface ITransactionResponsePayload {
  is_success: boolean;
  data: null | ITransactionSuccessResponsePayload;
  message: string;
}

export interface ITransactionSuccessResponsePayload {
  id: number;
}
