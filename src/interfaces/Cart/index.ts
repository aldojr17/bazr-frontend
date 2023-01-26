import { ICheckoutSuccessResponsePayload } from "../Transaction";

export interface ICartAddUpdateRequestPayload {
  shop_id: number;
  variant_type_id: number;
  quantity: number;
}

export interface ICartResponsePayload {
  is_success: boolean;
  data: ICartPayload[];
  message: string;
}

export interface ICartPayload {
  product_id?: number;
  product_name: string;
  variant_type_name: string;
  variant_type_price: number;
  quantity: number;
  shop_name: string;
  shop_id: number;
  cart_id: number;
  variant_type_id: number;
  stock: number;
  city_id: number;
  min_buy_qty: number;
  max_buy_qty: number;
}

export interface CartState {
  cart: ICartPayload[];
  checkoutData: ICheckoutSuccessResponsePayload;
  deletedItem: ICartPayload;
  checkoutCart: number[];
}

export interface IHoverCartProps {
  image: string;
  name: string;
  price: number;
}

export interface IAddUpdateCartResponsePayload {
  data: IAddUpdateCartDataPayload;
  is_success: boolean;
  message: string;
}

export interface IAddUpdateCartDataPayload {
  cart_item_id: number;
  quantity: number;
}
