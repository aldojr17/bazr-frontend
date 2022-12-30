import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState, ICartPayload } from "../../interfaces/Cart";

const initialState: CartState = {
  cart: [],
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
  },
});

export const { storeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
