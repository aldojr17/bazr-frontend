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
  default_sealabs_pay_id: number;
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

export interface IUserFavoriteProductRequestPayload {
  product_id: number;
}

export interface IUserFavoriteProductResponsePayload {
  is_success: boolean;
  data: null;
  message: string;
}

export interface IBaseResponsePayload {
  is_success: boolean;
  data: null;
  message: string;
}

export interface IUserChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface IUserAddressesResponsePayload {
  data: IUserAddress[];
  is_success: boolean;
  message: string;
}

export interface IUserAddress {
  address_id: number;
  user_id: number;
  province_id: number;
  province_name: string;
  city_id: number;
  city_name: string;
  sub_district: string;
  district_ward: string;
  zip_code: string;
  street_name: string;
  notes: string;
  recipient_name: string;
  recipient_phone: string;
  is_default: boolean;
  is_shop_default: boolean;
}

export interface IUserChatRequestPayload {
  refunds_id: number;
  chat: string;
}

export interface IUserChatResponsePayload {
  data: null;
  is_success: boolean;
  message: string;
}

export interface IConfirmUserReceivedOrderResponsePayload {
  data: null;
  is_success: boolean;
  message: string;
}

export interface IAddUserReviewRequestPayload {
  rating_score: number;
}

export interface IAddUserReviewResponsePayload {
  data: null;
  is_success: boolean;
  message: string;
}
