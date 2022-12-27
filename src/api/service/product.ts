import { ISearchFilterPayload } from "../../interfaces/Filter";
import { IProductsResponsePayload } from "../../interfaces/Product";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchAllProducts = async (filter?: ISearchFilterPayload): Promise<IProductsResponsePayload> => {
  try {
    const response = await instance.get<IProductsResponsePayload>(API_PATH.product.GET_ALL_PRODUCTS, {
      params: filter,
    });

    return response.data;
  } catch (err) {
    return err as IProductsResponsePayload;
  }
};

const productService = {
  fetchAllProducts,
};

export default productService;
