import shopsService from "../api/service/shop";
import { ICreateProductShopPayload } from "../interfaces/Product";
import {
  IPrimaryCategory,
  IFlatShopCategories,
  IProductUploadPhotoPayload,
} from "../interfaces/Shop";

const useShop = () => {
  const fetchShopProfileById = async (shopId: number) => {
    const response = await shopsService.getShopProfileById(shopId);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  const fetchShopProfileByShopUsername = async (username: string) => {
    const response = await shopsService.getShopProfileByShopUsername(username);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  const fetchShopCategories = async (shopId: number) => {
    const response = await shopsService.getShopCategory(shopId);

    if (response.is_success) {
      return response.data;
    }
  };

  const flattenShopCategories = (
    shopCategories: IPrimaryCategory[]
  ): IFlatShopCategories[] => {
    const flatShopCategories: IFlatShopCategories[] = [];
    for (let i = 0; i < shopCategories.length; i++) {
      const primaryCategory = shopCategories[i];
      flatShopCategories.push({
        id: primaryCategory.id,
        name: primaryCategory.name,
        level: 1,
      });
      for (let j = 0; j < primaryCategory.secondary_category.length; j++) {
        const secondaryCategory = primaryCategory.secondary_category[j];
        flatShopCategories.push({
          id: secondaryCategory.id,
          name: secondaryCategory.name,
          level: 2,
        });
        for (let k = 0; k < secondaryCategory.tertiary_category.length; k++) {
          const tertiaryCategory = secondaryCategory.tertiary_category[k];
          flatShopCategories.push({
            id: tertiaryCategory.id,
            name: tertiaryCategory.name,
            level: 3,
          });
        }
      }
    }
    return flatShopCategories;
  };

  const uploadProductPhoto = async (payload: IProductUploadPhotoPayload) => {
    const response = await shopsService.uploadProductPhoto(payload);

    return response;
  };

  const createShopProduct = async (payload: ICreateProductShopPayload) => {
    const response = await shopsService.createShopProduct(payload);

    return response;
  };

  return {
    fetchShopProfileById,
    fetchShopCategories,
    fetchShopProfileByShopUsername,
    flattenShopCategories,
    uploadProductPhoto,
    createShopProduct,
  };
};

export default useShop;
