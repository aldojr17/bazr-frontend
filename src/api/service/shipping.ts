import {
  IShippingCostPayload,
  IShippingCostResponse,
} from "../../interfaces/Shipping";
import { ICourierListResponse } from "../../interfaces/Shipping";
import { IBaseResponsePayload } from "../../interfaces/User";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getShippingCost = async (
  payload: IShippingCostPayload
): Promise<IShippingCostResponse> => {
  try {
    const response = await instance.post<IShippingCostResponse>(
      API_PATH.shipping.SHIPPING,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IShippingCostResponse;
  }
};

const getCourierList = async (
  payload: number
): Promise<ICourierListResponse> => {
  try {
    const response = await instance.get<ICourierListResponse>(
      API_PATH.shop.COURIER + `?shopIds=${payload}`
    );

    return response.data;
  } catch (err) {
    return err as ICourierListResponse;
  }
};

const updateCourierList = async (
  payload: string
): Promise<IBaseResponsePayload> => {
  try {
    const response = await instance.post<IBaseResponsePayload>(
      API_PATH.shop.COURIER,
      { courier_ids: payload }
    );

    return response.data;
  } catch (err) {
    return err as IBaseResponsePayload;
  }
};

const shippingService = {
  getShippingCost,
  getCourierList,
  updateCourierList,
};

export default shippingService;
