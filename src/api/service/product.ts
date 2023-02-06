import { ISearchFilterPayload } from "../../interfaces/Filter";
import {
  IProductResponsePayload,
  IProductReviewsResponsePayload,
  IProductsResponsePayload,
} from "../../interfaces/Product";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getProduct = async (id: number): Promise<IProductResponsePayload> => {
  try {
    const response = await instance.get<IProductResponsePayload>(
      API_PATH.product.PRODUCTS + "/" + id
    );

    return response.data;
  } catch (err) {
    return err as IProductResponsePayload;
  }
};

const getAllProducts = async (
  filter?: ISearchFilterPayload
): Promise<IProductsResponsePayload> => {
  try {
    const response = await instance.get<IProductsResponsePayload>(
      API_PATH.product.PRODUCTS,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IProductsResponsePayload;
  }
};

const getShopProducts = async (
  shopId: number,
  filter?: ISearchFilterPayload
): Promise<IProductsResponsePayload> => {
  try {
    const response = await instance.get<IProductsResponsePayload>(
      API_PATH.product.PRODUCTS_SHOP + "/" + shopId,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IProductsResponsePayload;
  }
};

const getProductReviews = async (
  id: number,
  filter?: ISearchFilterPayload
): Promise<IProductReviewsResponsePayload> => {
  try {
    const response = await instance.get<IProductReviewsResponsePayload>(
      API_PATH.product.PRODUCTS_REVIEWS + "/" + id,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IProductReviewsResponsePayload;
  }
};

const productService = {
  getProduct,
  getAllProducts,
  getShopProducts,
  getProductReviews,
};

export default productService;
