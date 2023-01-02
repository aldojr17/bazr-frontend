export interface IUserPayload {
  id: string;
  email: string;
  address: string;
  full_name: string;
  phone: string;
  profile_picture: string;
  role: number;
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
