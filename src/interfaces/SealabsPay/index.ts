export interface ISealabsPayDataResponsePayload {
  id: number;
  user_id: number;
  card_number: string;
  active_date: string;
  name_on_card: string;
}

export interface ISealabsPayGetAllResponsePayload {
  is_success: boolean;
  data: ISealabsPayDataResponsePayload[];
  message: string;
}

export interface SealabsPayState {
  sealabsPay: ISealabsPayDataResponsePayload[];
  chosenSealabsPay: ISealabsPayDataResponsePayload;
}

export interface ISealabsPayAddNewPayload {
  name_on_card: string;
  card_number: string;
  redirect_url: string;
}

export interface ISealabsPayTopupPayload {
  amount: number;
  card_number: string;
  redirect_url: string;
}

export type ISealabsPayPaymentPayload = Omit<ISealabsPayTopupPayload, "amount">;
export interface ISealabsPayAddNewResponsePayload {
  is_success: boolean;
  data: string;
  message: string;
}

export interface ISealabsPayUpdateDefaultPayload {
  default_sealabs_pay_id: number;
}

export interface ISealabsPayUpdateDefaultResponsePayload {
  is_success: boolean;
  data: null | string;
  message: string;
}

export interface ISealabsPayDeletePayload {
  sealabs_pay_id: number;
}

export interface ISealabsPayDeleteResponsePayload {
  is_success: boolean;
  data: null | string;
  message: string;
}
