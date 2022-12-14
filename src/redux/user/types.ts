import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IChangeProfilePayload, IUserPayload } from "../../interfaces/User";

export interface IUserState {
  user: IUserPayload;
}

export enum UserActionTypes {
  SET_USER = "SET_USER",

  CHANGE_PROFILE = "CHANGE_PROFILE",
}

export interface ISetUser {
  type: UserActionTypes.SET_USER;
  payload: IUserPayload;
}

export interface IChangeProfile {
  type: UserActionTypes.CHANGE_PROFILE;
  payload: IChangeProfilePayload;
}

export type UserActions = ISetUser | IChangeProfile;
export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
