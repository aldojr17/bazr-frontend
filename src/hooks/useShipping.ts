import shippingService from "../api/service/shipping";
import { IShippingCostPayload } from "../interfaces/Shipping";

const useShipping = () => {
  const fetchShippingCost = async (payload: IShippingCostPayload) => {
    const response = await shippingService.getShippingCost(payload);

    return response.data;
  };

  const fetchCourierList = async (payload: number) => {
    const response = await shippingService.getCourierList(payload);

    return response;
  };

  const updateCourierList = async (payload: string) => {
    const response = await shippingService.updateCourierList(payload);

    return response;
  };

  return {
    fetchShippingCost,
    fetchCourierList,
    updateCourierList,
  };
};

export default useShipping;
