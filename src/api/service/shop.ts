import { IShopsResponsePayload } from "../../interfaces/Shop";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchShopProfile = async (id: number): Promise<IShopsResponsePayload> => {
  try {
    const response = await instance.get<IShopsResponsePayload>(
      API_PATH.shop.SHOPS_PROFILE + "/" + id
    );

    return response.data;
  } catch (err) {
    return err as IShopsResponsePayload;
  }
};

const shopsService = {
  fetchShopProfile,
};

export default shopsService;
