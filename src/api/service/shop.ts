import {
  IShopCategoryResponsePayload,
  IShopsResponsePayload,
} from "../../interfaces/Shop";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getShopProfileById = async (
  id: number
): Promise<IShopsResponsePayload> => {
  try {
    const response = await instance.get<IShopsResponsePayload>(
      API_PATH.shop.SHOPS_PROFILE + "?shopId=" + id
    );

    return response.data;
  } catch (err) {
    return err as IShopsResponsePayload;
  }
};

const getShopProfileByShopUsername = async (
  username: string
): Promise<IShopsResponsePayload> => {
  try {
    const response = await instance.get<IShopsResponsePayload>(
      API_PATH.shop.SHOPS_PROFILE + "?username=" + username
    );

    return response.data;
  } catch (err) {
    return err as IShopsResponsePayload;
  }
};

const getShopCategory = async (
  shopId: number
): Promise<IShopCategoryResponsePayload> => {
  try {
    const response = await instance.get<IShopCategoryResponsePayload>(
      `${API_PATH.category.GET_ALL_CATEGORIES}?shopId=${shopId}`
    );
    return response.data;
  } catch (err) {
    return err as IShopCategoryResponsePayload;
  }
};

const shopsService = {
  getShopProfileById,
  getShopCategory,
  getShopProfileByShopUsername,
};

export default shopsService;
