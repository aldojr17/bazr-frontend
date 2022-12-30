import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category";
import productSlice from "./product";
import userSlice from "./user";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
