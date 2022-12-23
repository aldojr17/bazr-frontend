import { Dispatch } from "react";
import instance from "../../api/config/axios";
import { ILoginRequestPayload } from "../../interfaces/Auth";
import { IFilterPayload } from "../../interfaces/Filter";
import { IChangeProfilePayload, IUserPayload } from "../../interfaces/User";
import { UserActions, UserActionTypes } from "./types";

export const setUser = (payload: IUserPayload): UserActions => {
  return {
    type: UserActionTypes.SET_USER,
    payload,
  };
};

export const login = (payload: ILoginRequestPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/login", payload)
      .then((response) => {
        dispatch(setUser(response.data.user));
      })
      .catch((error) => {
        return error;
      });
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .get("/users/profile")
      .then((response) => {
        dispatch(setUser(response.data.data));
      })
      .catch((error) => error);
  };
};

export const fetchOrders = (filter?: IFilterPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .get("/users/orders", { params: filter })
      .then((response) => {
        return response.data;
      })
      .catch((error) => error);
  };
};

export const changeProfile = (payload: IChangeProfilePayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .put("/users/change-profile", payload)
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => error);
  };
};
