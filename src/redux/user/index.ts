import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryState, IPrimaryCategoryPayload } from "../../interfaces/Category";
import { UserState } from "../../interfaces/User";

const initialState: UserState = {
  userId: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const { storeUserId } = userSlice.actions;

export default userSlice.reducer;
