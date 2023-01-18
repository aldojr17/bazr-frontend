import { IAddressPayload } from "../Address";
import { IGenderPayload } from "../Gender";

export interface IUserPayload {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  profile_picture: string;
  role_id: number;
  address_detail: IAddressPayload;
  default_address_id: number;
  shop_id: number;
  is_seller: boolean;
  gender_detail: IGenderPayload;
  wallet_detail: IUserWalletResponsePayload;
}

export interface IEditProfilePayload {
  username: string;
  name: string;
  birth_date: string;
  gender_id: number;
  profile_picture: string | null;
}

export interface UserState {
  user: IUserPayload | null;
}

export interface IUploadAvatarPayload {
  photo: File | string;
}

export interface IUserResponsePayload {
  is_success: boolean;
  data: IUserPayload;
  message: string;
}

export interface IUserWalletResponsePayload {
  id: number;
  balance: number;
  is_activated: boolean;
}

export interface IUserAvatarResponsePayload {
  is_success: boolean;
  data: string;
  message: string;
}
