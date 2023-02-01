import { IAddressPayload } from "../Address";
import { IVoucherPayload } from "../Voucher";

export interface IOrderDetailPayload {
  menu_id: number;
  order_id: number;
  qty: number;
  option_id: number | null;
}

export interface IShopOrderDetailPayload {
  order_id: number;
  product_id: number;
  product_name: string;
  variant_id: number;
  variant_type_name: string;
  quantity: number;
  total: number;
  notes: string;
}

export interface IShopOrderStatusPayload {
  id: number;
  status: string;
}

export interface IShopOrderPayload {
  id: number;
  transaction_id: number;
  courier_id: number;
  user_shop_voucher_id: number;
  shop_id: number;
  delivery_fee: number;
  subtotal: number;
  total: number;
  order_details: IShopOrderDetailPayload[];
  order_status: IShopOrderStatusPayload;
}

export interface IShopDeliveryDetailPayload {
  delivery_fee: number;
  courier_name: string;
}

export interface IShopTransactionDetailPayload {
  transaction_id: number;
  transaction_date: number;
  address: IAddressPayload;
  payment_method: number;
  voucher: IVoucherPayload;
}

export interface IShopOrderDetailFullPayload {
  shop_id: number;
  order_id: number;
  order_status: string;
  estimated_delivery_date: string;
  transaction_detail: IShopTransactionDetailPayload;
  delivery_detail: IShopDeliveryDetailPayload;
  order_details: IShopOrderDetailPayload[];
  voucher: IVoucherPayload;
  subtotal: number;
  total: number;
}

export interface IShopOrderUpdateStatusPayload {
  status_id: number;
}

export interface IShopOrderPaginationPayload {
  current_page: number;
  data: IShopOrderPayload[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IShopOrdersResponsePayload {
  is_success: boolean;
  data: IShopOrderPaginationPayload;
  message: string;
}

export interface IShopOrderResponsePayload {
  is_success: boolean;
  data: IShopOrderDetailFullPayload;
  message: string;
}

export interface IShopEditModalProps {
  content: JSX.Element;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface IDeliveryStatusTaracking {
  status: string;
  isActive: boolean;
}
