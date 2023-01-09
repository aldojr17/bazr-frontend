import { IAddressPayload } from "../Address";

export interface IUserPayload {
  id: string;
  address_detail: IAddressPayload;
  wallet_detail: IUserWalletResponsePayload;
}

export interface IChangeProfilePayload {
  address: string;
  full_name: string;
  phone: string;
  profile_picture: string;
}

export interface UserState {
  userId: number;
}

export interface IUserResponsePayload {
  is_success: boolean;
  data: IUserPayload;
  message: string;
}

export interface IUserWalletResponsePayload {
  balance: number;
}
