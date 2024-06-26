import { AxiosError } from "axios";
import {
  IChangePasswordRequestPayload,
  ILoginGoogleRequestPayload,
  ILoginRequestPayload,
  ILoginResponsePayload,
  IPasswordResponsePayload,
  IRefreshRequestPayload,
  IRefreshResponsePayload,
  IRegisterMerchantRequestPayload,
  IRegisterRequestPayload,
  IRegisterResponsePayload,
  IResetPasswordRequestPayload,
} from "../../interfaces/Auth";
import instance from "../config/axios";
import { API_PATH } from "../path";

const register = async (
  payload: IRegisterRequestPayload
): Promise<IRegisterResponsePayload> => {
  try {
    const response = await instance.post<IRegisterResponsePayload>(
      API_PATH.auth.REGISTER,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IRegisterResponsePayload;
  }
};

const registerMerchant = async (
  payload: IRegisterMerchantRequestPayload
): Promise<IRegisterResponsePayload> => {
  try {
    const response = await instance.post<IRegisterResponsePayload>(
      API_PATH.auth.REGISTER_MERCHANT,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IRegisterResponsePayload;
  }
};

const login = async ({
  email,
  password,
}: ILoginRequestPayload): Promise<ILoginResponsePayload> => {
  try {
    const response = await instance.post<ILoginResponsePayload>(
      API_PATH.auth.LOGIN,
      {
        email,
        password,
      }
    );

    return response.data;
  } catch (err) {
    return err as ILoginResponsePayload;
  }
};

const loginGoogle = async (
  payload: ILoginGoogleRequestPayload
): Promise<ILoginResponsePayload> => {
  try {
    const response = await instance.post<ILoginResponsePayload>(
      API_PATH.auth.LOGIN_GOOGLE,
      payload
    );

    return response.data;
  } catch (err) {
    return err as ILoginResponsePayload;
  }
};

const refresh = async (
  payload: IRefreshRequestPayload
): Promise<IRefreshResponsePayload> => {
  try {
    const response = await instance.post<IRefreshResponsePayload>(
      API_PATH.auth.REFRESH,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IRefreshResponsePayload;
  }
};

const checkEmail = async (email: string) => {
  try {
    const response = await instance.post(API_PATH.user.PROFILE, { email });

    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    }
  } catch (e: unknown) {
    const error = e as AxiosError;
    return error.response?.data;
  }
};

const resetPassword = async (
  payload: IResetPasswordRequestPayload
): Promise<IPasswordResponsePayload> => {
  try {
    const response = await instance.post<IPasswordResponsePayload>(
      API_PATH.auth.PASSWORD,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPasswordResponsePayload;
  }
};

const changePassword = async (
  payload: IChangePasswordRequestPayload
): Promise<IPasswordResponsePayload> => {
  try {
    const response = await instance.put<IPasswordResponsePayload>(
      API_PATH.auth.PASSWORD,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPasswordResponsePayload;
  }
};

const authService = {
  register,
  registerMerchant,
  login,
  loginGoogle,
  refresh,
  checkEmail,
  resetPassword,
  changePassword,
};

export default authService;
