import { useState } from "react";
import userService from "../api/service/user";
import {
  IEditProfilePayload,
  IUploadAvatarPayload,
  IUserFavoriteProductRequestPayload,
  IUserPayload,
} from "../interfaces/User";
import { storeUser } from "../redux/user";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [userLoading, setUserLoading] = useState(false);

  const fetchProfile = async () => {
    setUserLoading(true);

    dispatch(storeUser(null));
    const response = await userService.getProfile();

    if (response.is_success) {
      dispatch(storeUser(response.data as IUserPayload));

      setUserLoading(false);
      return response.data;
    }

    setUserLoading(false);
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

  const setUserFavoriteProduct = async (
    payload: IUserFavoriteProductRequestPayload
  ) => {
    const response = await userService.postUserFavoriteProduct(payload);

    return response;
  };

  return {
    user,
    userLoading,

    fetchProfile,
    editProfile,
    uploadAvatar,
    setUserFavoriteProduct,
  };
};

export default useUser;
