export interface IRegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
