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
  product_photo: string;
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

export enum EOrderHistoryStatus {
  ALL = "",
  WAITING_SELLER = "waitingseller",
  ON_PROCESS = "onprocess",
  ON_DELIVERY = "ondelivery",
  DELIVERED = "delivered",
  RECEIVED = "received",
  COMPLETED = "completed",
  CANCELED = "canceled",
  REFUNDED = "refunded",
}

export interface propsOrderDetails {
  showOrderDetailShopName: string;
  showOrderDetailId: number;
  showOrderDetailDeliveryStatus: string;
}

export interface IOrderDetailsResponsePayload {
  data: IOrderDetails;
  is_success: boolean;
  message: string;
}

export interface IOrderDetails {
  payment_method: string;
  subtotal: number;
  total: number;
  total_delivery_fee: number;
  total_item: number;
  total_weight: number;
  total_discount: number;
  courier_name: string;
  items: IOrderItems[];
}

export interface IOrderItems {
  product_name: string;
  variant_name: string;
  qty: number;
  price: number;
  total_price: number;
  photo: {
    id: number;
    url: string;
  };
}

export const initialOrderDetails: IOrderDetails = {
  payment_method: "",
  subtotal: 0,
  total: 0,
  total_delivery_fee: 0,
  total_item: 0,
  total_weight: 0,
  total_discount: 0,
  courier_name: "",
  items: [],
};

export interface ITransactionHistoryResponse {
  data: ITransactionHistoryPagination;
  is_success: boolean;
  message: string;
}
export interface ITransactionHistoryPagination {
  data: ITransaction[];
  current_page: number;
  total: number;
  total_page: number;
  limit: number;
}

export interface ITransaction {
  grand_total: number;
  id: number;
  transaction_date: string;
  payment_method: string;
  orders: IOrder[];
}

export interface IOrder {
  delivery_status: EDeliveryStatus;
  id: number;
  list_of_products: IProduct[];
  order_is_reviewed: boolean;
  shop_name: string;
  total: number;
}

export enum EDeliveryStatus {
  WAITING_FOR_PAYMENT = "Waiting for Payment",
  WAITING_FOR_SELLER = "Waiting for Seller",
  CANCELLED = "Cancelled",
  PROCESSED = "Processed",
  ON_DELIVERY = "On Delivery",
  DELIVERED = "Delivered",
  RECEIVED = "Received",
  REFUNDED = "Refunded",
  COMPLETED = "Completed",
}

export const CListToShowAddReview = [
  EDeliveryStatus.RECEIVED,
  EDeliveryStatus.COMPLETED,
];

export const CListToShowOrderReceived = [EDeliveryStatus.DELIVERED];

export const CListToShowRefund = [EDeliveryStatus.RECEIVED];

export interface IProduct {
  id: number;
  photo: string;
  name: string;
  qty: number;
  price: number;
  is_reviewed: boolean;
}

export const initialStateTransactionHistory: ITransactionHistoryPagination = {
  data: [],
  current_page: 0,
  total: 0,
  total_page: 0,
  limit: 0,
};

export interface ITransactionOrderHistoryState {
  transactionOrderHistory: ITransactionHistoryPagination;
  deliveryStatus: EOrderHistoryStatus;
  page: number;
  showOrderDetail: propsOrderDetails | undefined;
  showTransactionDetail: IPropsTransactionDetails | undefined;
}

export interface IPropsTransactionDetails {
  transactionId: number;
}

export interface IPropsTableData {
  rows: IRow[];
}

export interface IRow {
  key: string;
  value: string | number | undefined;
  justifyContentValue?: string | undefined;
  fontSizeKey?: string | undefined;
  fontSizeValue?: string | undefined;
  colorValue?: string | undefined;
  fontWeightKey?: string | undefined;
  fontWeightValue?: string | undefined;
  addOn?: JSX.Element | undefined;
}
