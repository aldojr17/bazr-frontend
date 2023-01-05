import shopsService from "../api/service/shop";

const useShop = () => {
  const fetchShopProfile = async (shopId: number) => {
    const response = await shopsService.fetchShopProfile(shopId);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  return {
    fetchShopProfile,
  };
};

export default useShop;
