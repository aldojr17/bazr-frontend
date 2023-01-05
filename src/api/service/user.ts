import { IUserResponsePayload } from "../../interfaces/User";
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

const userService = {
  fetchProfile,
};

export default userService;
