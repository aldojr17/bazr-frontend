import {
  ICreateProductResponse,
  ICreateProductShopPayload,
} from "../../interfaces/Product";
import {
  IProductPhotoResponse,
  IProductUploadPhotoPayload,
  IShopCategoryResponsePayload,
  IShopsResponsePayload,
} from "../../interfaces/Shop";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getShopProfileById = async (
  id: number
): Promise<IShopsResponsePayload> => {
  try {
    const response = await instance.get<IShopsResponsePayload>(
      API_PATH.shop.SHOPS_PROFILE + "?shopId=" + id
    );

    return response.data;
  } catch (err) {
    return err as IShopsResponsePayload;
  }
};

const getShopProfileByShopUsername = async (
  username: string
): Promise<IShopsResponsePayload> => {
  try {
    const response = await instance.get<IShopsResponsePayload>(
      API_PATH.shop.SHOPS_PROFILE + "?username=" + username
    );

    return response.data;
  } catch (err) {
    return err as IShopsResponsePayload;
  }
};

const getShopCategory = async (
  shopId: number
): Promise<IShopCategoryResponsePayload> => {
  try {
    const response = await instance.get<IShopCategoryResponsePayload>(
      `${API_PATH.category.CATEGORIES}?shopId=${shopId}`
    );
    return response.data;
  } catch (err) {
    return err as IShopCategoryResponsePayload;
  }
};

const uploadProductPhoto = async (
  payload: IProductUploadPhotoPayload
): Promise<IProductPhotoResponse> => {
  try {
    const formData = new FormData();

    Array.from(payload.photos).forEach((file) =>
      formData.append("photos[]", file)
    );

    const response = await instance.post<IProductPhotoResponse>(
      API_PATH.shop.UPLOAD_PRODUCT_PHOTOS,
      formData
    );

    return response.data;
  } catch (err) {
    return err as IProductPhotoResponse;
  }
};

const createShopProduct = async (
  payload: ICreateProductShopPayload
): Promise<ICreateProductResponse> => {
  try {
    const response = await instance.post<ICreateProductResponse>(
      API_PATH.product.PRODUCTS,
      payload
    );

    return response.data;
  } catch (err) {
    return err as ICreateProductResponse;
  }
};

const shopsService = {
  getShopProfileById,
  getShopCategory,
  getShopProfileByShopUsername,
  uploadProductPhoto,
  createShopProduct,
};

export default shopsService;
