import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category";
import productSlice from "./product";
import cartSlice from "./cart";
import userSlice from "./user";
import transactionOrderHistorySlice from "./transactionOrderHistory";
import sealabsPaySlice from "./sealabsPay";
import addressSlice from "./address";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    user: userSlice,
    cart: cartSlice,
    sealabsPay: sealabsPaySlice,
    transactionOrderHistory: transactionOrderHistorySlice,
    address: addressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
