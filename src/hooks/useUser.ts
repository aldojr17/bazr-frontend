import userService from "../api/service/user";
import {
  IEditProfilePayload,
  IUploadAvatarPayload,
  IUserPayload,
} from "../interfaces/User";
import { storeUser } from "../redux/user";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    dispatch(storeUser(null));
    const response = await userService.fetchProfile();

    if (response.is_success) {
      dispatch(storeUser(response.data as IUserPayload));
      return response.data;
    }

    return null;
  };

  const editProfile = async (payload: IEditProfilePayload) => {
    const response = await userService.editProfile(payload);

    return response;
  };

  const uploadAvatar = async (payload: IUploadAvatarPayload) => {
    const response = await userService.uploadAvatar(payload);

    return response;
  };

  return {
    user,
    fetchProfile,
    editProfile,
    uploadAvatar,
  };
};

export default useUser;
