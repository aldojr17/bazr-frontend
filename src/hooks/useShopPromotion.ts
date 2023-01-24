import { useState } from "react";
import shopPromotion from "../api/service/shopPromotion";
import {
  IShopPromotionPaginationPayload,
  IShopPromotionPayload,
} from "../interfaces/promotion";

const useShopPromotion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shopPromotions, setShopPromotions] =
    useState<IShopPromotionPaginationPayload>();

  const fetchAllShopPromotions = async (
    status: string,
    page: number,
    limit: number
  ) => {
    setIsLoading(true);
    const response = await shopPromotion.getAllShopPromotions(
      status,
      page,
      limit
    );
    setIsLoading(false);

    if (response.is_success) {
      setShopPromotions(response.data);
    }

    return response;
  };

  const addShopPromotion = async (payload: IShopPromotionPayload) => {
    setIsLoading(true);
    const response = await shopPromotion.postShopPromotion(payload);

    return response;
  };

  return {
    fetchAllShopPromotions,
    addShopPromotion,
    isLoading,
    shopPromotions,
  };
};

export default useShopPromotion;
