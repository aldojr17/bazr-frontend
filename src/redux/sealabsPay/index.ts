import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISealabsPayDataResponsePayload,
  SealabsPayState,
} from "../../interfaces/SealabsPay";

const initialState: SealabsPayState = {
  sealabsPay: [],
  chosenSealabsPay: {
    id: 0,
    user_id: 0,
    card_number: "",
    active_date: "",
    name_on_card: "",
  },
};

export const sealabsPaySlice = createSlice({
  name: "sealabs_pay",
  initialState,
  reducers: {
    storeSealabsPay: (
      state,
      action: PayloadAction<ISealabsPayDataResponsePayload[]>
    ) => {
      state.sealabsPay = action.payload;
    },
    clearSealabsPay: (state) => {
      state.sealabsPay = [];
    },
    storeChosenSealabsPay: (
      state,
      action: PayloadAction<ISealabsPayDataResponsePayload>
    ) => {
      state.chosenSealabsPay = action.payload;
    },
    deleteSealabsPay: (state, action: PayloadAction<number>) => {
      state.sealabsPay = state.sealabsPay.filter(
        (val) => val.id !== action.payload
      );
    },
  },
});

export const {
  storeSealabsPay,
  clearSealabsPay,
  storeChosenSealabsPay,
  deleteSealabsPay,
} = sealabsPaySlice.actions;

export default sealabsPaySlice.reducer;
