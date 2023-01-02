import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryState,
  IPrimaryCategoryPayload,
} from "../../interfaces/Category";

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    storeCategories: (
      state,
      action: PayloadAction<IPrimaryCategoryPayload[]>
    ) => {
      state.categories = action.payload;
    },
  },
});

export const { storeCategories } = categorySlice.actions;

export default categorySlice.reducer;
