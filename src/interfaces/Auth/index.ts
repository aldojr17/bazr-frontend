export interface IRegisterRequestPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  isOauth: boolean;
}

export interface IRegisterResponsePayload {
  is_success: boolean;
  data: null;
  message: string;
}

export interface ILoginRequestPayload {
  email: string;
  password: string;
}

export interface ILoginGoogleRequestPayload {
  token: string;
}

export interface ILoginResponsePayload {
  is_success: boolean;
  data: ILoginSuccessPayload;
  message: string;
}

export interface ILoginSuccessPayload {
  access_token: string;
  refresh_token: string;
  is_registered?: boolean;
}

export interface IRefreshRequestPayload {
  refresh_token: string;
}

export interface IRefreshResponsePayload {
  is_success: boolean;
  data: null;
  message: string;
}

export interface IChangePasswordRequestPayload {
  token: string;
  password: string;
}

export interface IResetPasswordRequestPayload {
  email: string;
}

export interface IPasswordResponsePayload {
  is_success: boolean;
  data: null;
  message: string;
}

export interface IPinRequestPayload {
  pin: string;
}

export interface IPinResponsePayload {
  is_success: boolean;
  data: { token: string };
  message: string;
}
