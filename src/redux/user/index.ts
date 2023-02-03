import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserPayload, UserState } from "../../interfaces/User";

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<IUserPayload | null>) => {
      state.user = action.payload;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
