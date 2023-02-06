import { EDeliveryStatus } from "../Transaction";
import { IVoucherPayload } from "../Voucher";

export interface IPaymentWalletRequestPayload {
  token: string;
  user_transaction_id: number;
}

export interface IPaymentWalletResponsePayload {
  data: null;
  is_success: boolean;
  message: string;
}
export interface IWalletDetailPayload {
  balance: number;
}

export interface IWalletHistoryResponsePayload {
  data: IWalletHistoryPagination;
  is_success: boolean;
  message: string;
}

export interface IWalletHistoryPagination {
  current_page: number;
  data: IWalletHistory[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IWalletHistory {
  amount: number;
  from: string;
  title: string;
  to: string;
  transaction_date: string;
  transaction_id: number;
  transaction_type: string;
}

export interface IGroupedWalletHistory {
  date: string;
  transactions: IWalletHistory[];
}

export interface IWalletTransactionResponsePayload {
  data: IWalletTransactionDetail;
  is_success: boolean;
  message: string;
}

export interface IWalletTransactionDetail {
  address: ITransactionAddress;
  id: number;
  marketplace_discount: number;
  orders: IWalletOrderDetail[];
  payment_method: string;
  subtotal: number;
  total: number;
  total_delivery_fee: number;
  total_discount: number;
  total_qty: number;
  total_weight: number;
  transaction_date: string;
  voucher: IVoucherPayload;
}

export interface ITransactionAddress {
  id: number;
  recipient_name: string;
  recipient_phone: string;
  province_name: string;
  city_name: string;
  sub_district: string;
  district_ward: string;
  zip_code: string;
  street_name: string;
}

export interface IWalletOrderDetail {
  courier_name: string;
  delivery_fee: number;
  delivery_status: EDeliveryStatus;
  discount_marketplace: number;
  discount_shop: number;
  id: number;
  items: IWalletOrderItemDetail[];
  shop_name: string;
  shop_username: string;
  shop_voucher: IVoucherPayload;
  subtotal: number;
  total: number;
}

export interface IWalletOrderItemDetail {
  id: number;
  is_reviewed: boolean;
  name: string;
  photo: string;
  price: number;
  price_after_discount: number;
  product_id: number;
  qty: number;
  total_price: number;
  variant_type_name: string;
}
