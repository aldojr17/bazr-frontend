import shippingService from "../api/service/shipping";
import { IShippingCostPayload } from "../interfaces/Shipping";

const useShipping = () => {
  const fetchShippingCost = async (payload: IShippingCostPayload) => {
    const response = await shippingService.getShippingCost(payload);

    return response.data;
  };

  return {
    fetchShippingCost,
  };
};

export default useShipping;
