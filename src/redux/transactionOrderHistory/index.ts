import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EOrderHistoryStatus,
  initialStateTransactionHistory,
  IPropsTransactionDetails,
  ITransactionHistoryPagination,
  ITransactionOrderHistoryState,
  propsOrderDetails,
} from "../../interfaces/Transaction";

const initialState: ITransactionOrderHistoryState = {
  transactionOrderHistory: initialStateTransactionHistory,
  deliveryStatus: EOrderHistoryStatus.ALL,
  page: 1,
  showOrderDetail: undefined,
  showTransactionDetail: undefined,
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
    setShowOrderDetail: (
      state,
      action: PayloadAction<propsOrderDetails | undefined>
    ) => {
      state.showOrderDetail = action.payload;
    },
    setShowTransactionDetail: (
      state,
      action: PayloadAction<IPropsTransactionDetails | undefined>
    ) => {
      state.showTransactionDetail = action.payload;
    },
  },
});

export const {
  setTransactionOrderHistory,
  setDeliveryStatus,
  setPage,
  setShowOrderDetail,
  setShowTransactionDetail,
} = transactionOrderHistorySlice.actions;

export default transactionOrderHistorySlice.reducer;
