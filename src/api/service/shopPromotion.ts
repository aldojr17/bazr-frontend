import {
  IShopPromotionPayload,
  IShopPromotionResponsePayload,
  IShopPromotionsResponsePayload,
} from "../../interfaces/Promotion";
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

const getShopPromotion = async (
  id: number
): Promise<IShopPromotionResponsePayload> => {
  try {
    const response = await instance.get<IShopPromotionResponsePayload>(
      API_PATH.shop.SHOPS_PROMOTION + `/${id}`
    );

    return response.data;
  } catch (err) {
    return err as IShopPromotionResponsePayload;
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

const putShopPromotion = async (
  payload: IShopPromotionPayload
): Promise<IShopPromotionResponsePayload> => {
  try {
    const response = await instance.put<IShopPromotionResponsePayload>(
      API_PATH.shop.SHOPS_PROMOTION + `/${payload.id}`,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IShopPromotionResponsePayload;
  }
};

const shopPromotionService = {
  getAllShopPromotions,
  getShopPromotion,
  postShopPromotion,
  putShopPromotion,
};

export default shopPromotionService;
