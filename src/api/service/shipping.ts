import {
  IShippingCostPayload,
  IShippingCostResponse,
} from "../../interfaces/Shipping";
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

const shippingService = {
  getShippingCost,
};

export default shippingService;
