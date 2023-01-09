export interface IPaymentWalletRequestPayload {
  token: string;
  user_transaction_id: number;
}

export interface IPaymentWalletResponsePayload {
  data: null;
  is_success: boolean;
  message: string;
}
