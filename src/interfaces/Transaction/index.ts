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

export interface IOrder {
  photo: string;
  name: string;
  qty: number;
  price: number;
}

export interface ITransaction {
  shop_name: string;
  delivery_status: string;
  transaction_date: string;
  total: number;
  list_of_products: IOrder[];
}

export interface ITransactionHistoryPagination {
  data: {
    data: ITransaction[];
    current_page: number;
    total: number;
    total_page: number;
    limit: number;
  };
  is_success: boolean;
  message: string;
}

export const initialStateTransactionHistory: ITransactionHistoryPagination = {
  data: {
    data: [
      {
        shop_name: "",
        delivery_status: "",
        transaction_date: "",
        total: 0,
        list_of_products: [
          {
            photo: "",
            name: "",
            qty: 0,
            price: 0,
          },
        ],
      },
    ],
    current_page: 0,
    total: 0,
    total_page: 0,
    limit: 0,
  },
  is_success: false,
  message: "",
};

export enum EOrderHistoryStatus {
  ALL = "",
  ON_PROCESS = "onprocess",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export interface ITransactionOrderHistoryState {
  transactionOrderHistory: ITransactionHistoryPagination;
  deliveryStatus: EOrderHistoryStatus;
  page: number;
}
