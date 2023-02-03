import { destroyCookie } from "nookies";
import { useState } from "react";
import userService from "../api/service/user";
import { ISearchFilterPayload } from "../interfaces/Filter";
import {
  IAddUserReviewRequestPayload,
  IEditProfilePayload,
  IUploadAvatarPayload,
  IUserChangePasswordPayload,
  IUserFavoriteProductRequestPayload,
  IUserPayload,
} from "../interfaces/User";
import { storeUser } from "../redux/user";
import { useAppDispatch, useAppSelector } from "./useSelector";
import useToast from "./useToast";

const useUser = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { successToast, errorToast } = useToast();

  const [userLoading, setUserLoading] = useState(false);

  const fetchProfile = async () => {
    setUserLoading(true);

    dispatch(storeUser(null));
    const response = await userService.getProfile();

    if (response.is_success) {
      dispatch(storeUser(response.data as IUserPayload));

      setUserLoading(false);
      return response.data;
    } else {
      destroyCookie(null, "auth");
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

  const sendEmailVerification = async (payload: string) => {
    const response = await userService.sendChangeEmailVerification(payload);

    return response;
  };

  const changeEmail = async (payload: string) => {
    const response = await userService.changeEmail(payload);

    return response;
  };

  const sendChangePasswordToken = async (
    payload: IUserChangePasswordPayload
  ) => {
    const response = await userService.sendChangePasswordToken(payload);

    return response;
  };

  const changePassword = async (payload: string) => {
    const response = await userService.changePassword(payload);

    return response;
  };

  const getUserAddresses = async () => {
    const response = await userService.fetchUserAddresses();
    return response;
  };

  const addConfirmUserReceivedOrder = async (orderId: number) => {
    const response = await userService.postConfirmUserReceivedOrder(orderId);
    if (response.is_success) {
      return response.data;
    }
    return null;
  };

  const addUserReview = async (
    productOrderId: number,
    payload: IAddUserReviewRequestPayload
  ) => {
    const response = await userService.postAddUserReview(
      productOrderId,
      payload
    );
    if (response.is_success) {
      successToast("Add Review Success");
      return response.data;
    }
    errorToast("Add Review Failed");
    return null;
  };

  const fetchUserFavouriteProduct = async (filter?: ISearchFilterPayload) => {
    const response = await userService.getUserFavoriteProduct(filter);
    return response;
  };

  return {
    user,
    userLoading,

    fetchProfile,
    editProfile,
    uploadAvatar,
    setUserFavoriteProduct,
    fetchUserFavouriteProduct,
    sendEmailVerification,
    changeEmail,
    sendChangePasswordToken,
    changePassword,
    getUserAddresses,
    addConfirmUserReceivedOrder,
    addUserReview,
  };
};

export default useUser;
