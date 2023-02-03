import { IProductPhotoPayload } from "../Product";

export interface IRefund {
  id: number;
  order_id: number;
  buyer_id: number;
  buyer_name: string;
  seller_id: number;
  seller_name: string;
  amount: number;
  status: number;
  status_name: string;
  payment_method_id: number;
  created_at: string;
}

export interface IRefundPagination {
  data: IRefund[];
  current_page: number;
  total: number;
  total_page: number;
  limit: number;
}

export interface IRefundPaginationPayload {
  data: IRefundPagination;
  is_success: boolean;
  message: string;
}

export interface IRefundDetail {
  id: number;
  order_id: number;
  buyer_id: number;
  buyer_name: string;
  seller_id: number;
  seller_name: string;
  amount: number;
  status: number;
  status_name: string;
  payment_method_id: number;
  created_at: string;
  note: string;
  photos: IProductPhotoPayload[];
  chats: IChat[];
  chats_last_updated: string;
}

export interface IRefundPhoto {
  urls: string[];
}

export interface IChat {
  user_id: number;
  text: string;
}

export interface IRefundActionResponse {
  data: null;
  is_success: boolean;
  message: string;
}

export interface IRefundDetailPayload {
  data: IRefundDetail;
  is_success: boolean;
  message: string;
}

export interface ICreateRefundPayload {
  order_id: number;
  note: string;
  photos: string[];
}

export interface ICreateRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export interface IRefundConfirmPayload {
  status: string;
}
