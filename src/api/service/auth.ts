import { ILoginPayload } from "../../interfaces/Auth";
import instance from "../config/axios";
import { AxiosError } from "axios";
import { API_PATH } from "../path";

const register = async () => {
  try {
  } catch (e: unknown) {
    const error = e as AxiosError;
    return error.response?.data;
  }
};

const login = async ({ email, password }: ILoginPayload) => {
  try {
    const response = await instance.post(API_PATH.auth.LOGIN, {
      email,
      password,
    });

    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    }
  } catch (e: unknown) {
    const error = e as AxiosError;
    return error.response?.data;
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

const authService = {
  register,
  login,
  checkEmail,
};

export default authService;
