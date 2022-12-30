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
  product_name: string;
  variant_type_name: string;
  variant_type_price: string;
  quantity: number;
  shop_name: string;
}

export interface CartState {
  cart: ICartPayload[];
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
