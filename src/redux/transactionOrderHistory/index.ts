import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EOrderHistoryStatus,
  initialStateTransactionHistory,
  ITransactionHistoryPagination,
  ITransactionOrderHistoryState,
} from "../../interfaces/Transaction";

const initialState: ITransactionOrderHistoryState = {
  transactionOrderHistory: initialStateTransactionHistory,
  deliveryStatus: EOrderHistoryStatus.ALL,
  page: 1,
};

export const transactionOrderHistorySlice = createSlice({
  name: "transactionOrderHistory",
  initialState,
  reducers: {
    setTransactionOrderHistory: (
      state,
      action: PayloadAction<ITransactionHistoryPagination>
    ) => {
      state.transactionOrderHistory = action.payload;
    },
    setDeliveryStatus: (state, action: PayloadAction<EOrderHistoryStatus>) => {
      state.deliveryStatus = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setTransactionOrderHistory, setDeliveryStatus, setPage } =
  transactionOrderHistorySlice.actions;

export default transactionOrderHistorySlice.reducer;
