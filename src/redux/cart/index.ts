import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState, ICartPayload } from "../../interfaces/Cart";

const initialState: CartState = {
  cart: [],
  checkoutCart: [],
  deletedItem: {
    product_id: 0,
    cart_id: 0,
    product_name: "",
    quantity: 0,
    shop_id: 0,
    shop_name: "",
    variant_type_id: 0,
    variant_type_name: "",
    variant_type_price: 0,
  },
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
    storeCheckoutCart: (state, action: PayloadAction<ICartPayload[]>) => {
      state.checkoutCart = action.payload;
    },
    storeDeletedItem: (state, action: PayloadAction<ICartPayload>) => {
      state.deletedItem = action.payload;
    },
  },
});

export const { storeCart, clearCart, storeCheckoutCart, storeDeletedItem } =
  cartSlice.actions;

export default cartSlice.reducer;
