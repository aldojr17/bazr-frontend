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
  cart_id: number;
  city_id: number;
  city_name: string;
  max_buy_qty: number;
  min_buy_qty: number;
  price_after_discount: number;
  product_id?: number;
  product_name: string;
  product_photo: string;
  quantity: number;
  shop_id: number;
  shop_name: string;
  stock: number;
  total: number;
  variant_type_id: number;
  variant_type_name: string;
  variant_type_price: number;
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
  variantName: string;
  quantity: number;
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
