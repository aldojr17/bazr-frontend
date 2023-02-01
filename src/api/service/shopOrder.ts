import {
  IShopOrderResponsePayload,
  IShopOrdersResponsePayload,
  IShopOrderUpdateStatusPayload,
} from "../../interfaces/Order";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getAllOrders = async (
  shopId: number,
  status: string,
  page: number,
  limit: number
): Promise<IShopOrdersResponsePayload> => {
  try {
    const response = await instance.get<IShopOrdersResponsePayload>(
      API_PATH.shop.SHOPS +
        `/${shopId}/orders?status=${status}&page=${page}&limit=${limit}`
    );

    return response.data;
  } catch (err) {
    return err as IShopOrdersResponsePayload;
  }
};

const getOrder = async (
  shopId: number,
  orderId: number
): Promise<IShopOrderResponsePayload> => {
  try {
    const response = await instance.get<IShopOrderResponsePayload>(
      API_PATH.shop.SHOPS + `/${shopId}/orders/${orderId}`
    );

    return response.data;
  } catch (err) {
    return err as IShopOrderResponsePayload;
  }
};

const putOrder = async (
  shopId: number,
  orderId: number,
  payload: IShopOrderUpdateStatusPayload
): Promise<IShopOrderResponsePayload> => {
  try {
    const response = await instance.put<IShopOrderResponsePayload>(
      API_PATH.shop.SHOPS + `/${shopId}/orders/${orderId}`,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IShopOrderResponsePayload;
  }
};

const shopOrderService = {
  getAllOrders,
  getOrder,
  putOrder,
};

export default shopOrderService;
