import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState, ICartPayload } from "../../interfaces/Cart";
import { ICheckoutSuccessResponsePayload } from "../../interfaces/Transaction";

const initialState: CartState = {
  cart: [],
  checkoutData: {
    address_detail: {
      city_id: 0,
      city_name: "",
      district_ward: "",
      id: 0,
      notes: "",
      province_name: "",
      recipient_name: "",
      recipient_phone: "",
      street_name: "",
      sub_district: "",
      zip_code: "",
    },
    cart: [],
    subtotal: 0,
    total: 0,
    total_delivery_fee: 0,
    total_discount: 0,
    total_item: 0,
    user_voucher_id: 0,
    voucher_discount: 0,
  },
  deletedItem: {
    product_id: 0,
    cart_id: 0,
    product_name: "",
    product_photo: "",
    quantity: 0,
    shop_id: 0,
    shop_name: "",
    variant_type_id: 0,
    variant_type_name: "",
    variant_type_price: 0,
    city_id: 0,
    city_name: "",
    max_buy_qty: 0,
    min_buy_qty: 0,
    stock: 0,
  },
  checkoutCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCart: (state, action: PayloadAction<ICartPayload[]>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    storeCheckoutCart: (
      state,
      action: PayloadAction<ICheckoutSuccessResponsePayload>
    ) => {
      state.checkoutData = action.payload;
    },
    storeDeletedItem: (state, action: PayloadAction<ICartPayload>) => {
      state.deletedItem = action.payload;
    },
    storeCheckoutCartIds: (state, action: PayloadAction<number[]>) => {
      state.checkoutCart = action.payload;
    },
  },
});

export const {
  storeCart,
  clearCart,
  storeCheckoutCart,
  storeDeletedItem,
  storeCheckoutCartIds,
} = cartSlice.actions;

export default cartSlice.reducer;
