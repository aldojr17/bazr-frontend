import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductPaginationPayload, ProductState } from "../../interfaces/Product";

const initialState: ProductState = {
  products: {
    current_page: 0,
    limit: 0,
    data: [],
    total: 0,
    total_page: 0,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storeProductPagination: (state, action: PayloadAction<IProductPaginationPayload>) => {
      state.products = action.payload;
    },
  },
});

export const { storeProductPagination } = productSlice.actions;

export default productSlice.reducer;
