import {
  IEditProfilePayload,
  IUploadAvatarPayload,
  IUserAvatarResponsePayload,
  IUserResponsePayload,
} from "../../interfaces/User";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchProfile = async (): Promise<IUserResponsePayload> => {
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

const userService = {
  fetchProfile,
  editProfile,
  uploadAvatar,
};

export default userService;
