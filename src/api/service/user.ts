import {
  IEditProfilePayload,
  IBaseResponsePayload,
  IUploadAvatarPayload,
  IUserAddressesResponsePayload,
  IUserAvatarResponsePayload,
  IUserFavoriteProductRequestPayload,
  IUserFavoriteProductResponsePayload,
  IUserResponsePayload,
  IUserChangePasswordPayload,
} from "../../interfaces/User";
import { IProductsResponsePayload } from "../../interfaces/Product";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getProfile = async (): Promise<IUserResponsePayload> => {
  try {
    const response = await instance.get<IUserResponsePayload>(
      API_PATH.user.PROFILE
    );

    return response.data;
  } catch (err) {
    return err as IUserResponsePayload;
  }
};

const editProfile = async (
  payload: IEditProfilePayload
): Promise<IUserResponsePayload> => {
  try {
    const response = await instance.patch<IUserResponsePayload>(
      API_PATH.user.PROFILE,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IUserResponsePayload;
  }
};

const uploadAvatar = async (
  payload: IUploadAvatarPayload
): Promise<IUserAvatarResponsePayload> => {
  try {
    const formData = new FormData();
    formData.append("photo", payload.photo);

    const response = await instance.post<IUserAvatarResponsePayload>(
      API_PATH.user.AVATAR,
      formData
    );

    return response.data;
  } catch (err) {
    return err as IUserAvatarResponsePayload;
  }
};

const postUserFavoriteProduct = async (
  payload: IUserFavoriteProductRequestPayload
): Promise<IUserFavoriteProductResponsePayload> => {
  try {
    const response = await instance.post<IUserFavoriteProductResponsePayload>(
      API_PATH.user.FAVORITE_PRODUCT,
      payload
    );
    return response.data;
  } catch (err) {
    return err as IUserFavoriteProductResponsePayload;
  }
};

const getUserFavoriteProduct = async (
  filter?: ISearchFilterPayload
): Promise<IProductsResponsePayload> => {
  try {
    const response = await instance.get<IProductsResponsePayload>(
      API_PATH.user.FAVORITE_PRODUCT,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IProductsResponsePayload;
  }
};

const sendChangeEmailVerification = async (
  email: string
): Promise<IBaseResponsePayload> => {
  try {
    const response = await instance.post<IBaseResponsePayload>(
      API_PATH.user.EMAIL,
      { email: email }
    );

    return response.data;
  } catch (err) {
    return err as IBaseResponsePayload;
  }
};

const changeEmail = async (code: string): Promise<IBaseResponsePayload> => {
  try {
    const response = await instance.put<IBaseResponsePayload>(
      API_PATH.user.EMAIL,
      { code: code }
    );

    return response.data;
  } catch (err) {
    return err as IBaseResponsePayload;
  }
};

const sendChangePasswordToken = async (
  payload: IUserChangePasswordPayload
): Promise<IBaseResponsePayload> => {
  try {
    const response = await instance.post<IBaseResponsePayload>(
      API_PATH.user.PASSWORD,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IBaseResponsePayload;
  }
};

const changePassword = async (token: string): Promise<IBaseResponsePayload> => {
  try {
    const response = await instance.put<IBaseResponsePayload>(
      API_PATH.user.PASSWORD,
      { token: token }
    );

    return response.data;
  } catch (err) {
    return err as IBaseResponsePayload;
  }
};

const fetchUserAddresses = async (): Promise<IUserAddressesResponsePayload> => {
  try {
    const response = await instance.get<IUserAddressesResponsePayload>(
      API_PATH.user.ADDRESSES
    );
    return response.data;
  } catch (err) {
    return err as IUserAddressesResponsePayload;
  }
};

const userService = {
  getProfile,
  editProfile,
  uploadAvatar,
  postUserFavoriteProduct,
  sendChangeEmailVerification,
  changeEmail,
  sendChangePasswordToken,
  changePassword,
  fetchUserAddresses,
  getUserFavoriteProduct,
};

export default userService;
