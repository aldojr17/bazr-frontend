import {
  IShopPromotionPayload,
  IShopPromotionResponsePayload,
  IShopPromotionsResponsePayload,
} from "../../interfaces/promotion";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getAllShopPromotions = async (
  status: string,
  page: number,
  limit: number
): Promise<IShopPromotionsResponsePayload> => {
  try {
    const response = await instance.get<IShopPromotionsResponsePayload>(
      API_PATH.shop.SHOPS_PROMOTION +
        `?status=${status}&page=${page}&limit=${limit}`
    );

    return response.data;
  } catch (err) {
    return err as IShopPromotionsResponsePayload;
  }
};

const postShopPromotion = async (
  payload: IShopPromotionPayload
): Promise<IShopPromotionResponsePayload> => {
  try {
    const response = await instance.post<IShopPromotionResponsePayload>(
      API_PATH.shop.SHOPS_PROMOTION,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IShopPromotionResponsePayload;
  }
};

const shopPromotion = {
  getAllShopPromotions,
  postShopPromotion,
};

export default shopPromotion;
