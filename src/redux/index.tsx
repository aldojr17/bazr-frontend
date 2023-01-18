import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category";
import productSlice from "./product";
import cartSlice from "./cart";
import userSlice from "./user";
import transactionOrderHistorySlice from "./transactionOrderHistory";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    user: userSlice,
    cart: cartSlice,
    transactionOrderHistory: transactionOrderHistorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
