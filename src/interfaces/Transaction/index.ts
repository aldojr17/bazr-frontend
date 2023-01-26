import { IAddressPayload } from "../Address";

export interface ICheckoutRequestPayload {
  address_id?: number;
  user_voucher_id?: number;
  orders: ICheckoutOrderPayload[];
}

export interface ICheckoutOrderPayload {
  user_shop_voucher_id?: number;
  courier_id?: number;
  delivery_fee?: number;
  shop_id: number;
  order_details: ICheckoutOrderDetailPayload[];
}

export interface ICheckoutOrderDetailPayload {
  // product_id: number;
  // variant_id: number;
  // quantity: number;
  cart_id: number;
  notes?: string;
}

export interface ITransactionRequestPayload {
  payment_method_id: number;
}

export interface ITransactionResponsePayload {
  is_success: boolean;
  data: null | ITransactionSuccessResponsePayload;
  message: string;
}

export interface ICheckoutResponsePayload {
  is_success: boolean;
  data: ICheckoutSuccessResponsePayload;
  message: string;
}

export interface ICheckoutSuccessResponsePayload {
  address_detail: IAddressPayload;
  user_voucher_id: number;
  voucher_discount: number;
  subtotal: number;
  total: number;
  total_item: number;
  total_delivery_fee: number;
  total_discount: number;
  cart: ICheckoutCartSuccessResponsePayload[];
}

export interface ICheckoutCartSuccessResponsePayload {
  courier_id: number;
  user_shop_voucher_id: number;
  shop_voucher_detail: ICheckoutShopVoucherDetailResponse;
  shop_id: number;
  shop_city: number;
  shop_city_name: string;
  shop_name: string;
  delivery_fee: number;
  etd: string;
  total_weight: number;
  subtotal: number;
  total: number;
  shop_discount: number;
  list_couriers: ICheckoutCourierPayload;
  order_details: ICheckoutOrderDetailResponse[];
}

export interface ICheckoutShopVoucherDetailResponse {
  code: string;
  benefit: number;
  benefit_percentage: number;
  min_purchase: number;
}

export interface ICheckoutOrderDetailResponse {
  cart_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  total: number;
  notes: string;
  product_name: string;
  variant_type_name: string;
}

export interface ICheckoutCourierPayload {
  shop_id: number;
  couriers: ICheckoutCourierListPayload[];
}

export interface ICheckoutCourierListPayload {
  id: number;
  code: string;
  name: string;
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
