import { IAddressPayload } from "../Address";
import { IGenderPayload } from "../Gender";

export interface IUserPayload {
  id: string;
  address_detail: IAddressPayload;
  wallet_detail: IUserWalletResponsePayload;
  username: string;
  email: string;
  address: string;
  name: string;
  phone: string;
  profile_picture: string;
  role: number;
  birth_date: string;
  gender_detail: IGenderPayload;
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
