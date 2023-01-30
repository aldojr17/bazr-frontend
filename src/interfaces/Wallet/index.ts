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
  orders: IWalletOrderDetail[];
  payment_method: string;
  total_delivery_fee: number;
  total: number;
}

export interface IWalletOrderDetail {
  items: IWalletOrderItemDetail[];
}

export interface IWalletOrderItemDetail {
  name: string;
  total_price: number;
  qty: number;
}
