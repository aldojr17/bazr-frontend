import { ISearchFilterPayload } from "../../interfaces/Filter";
import { IProductResponsePayload, IProductsResponsePayload } from "../../interfaces/Product";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchProduct = async (id: number): Promise<IProductResponsePayload> => {
  try {
    const response = await instance.get<IProductResponsePayload>(
      API_PATH.product.PRODUCTS + "/" + id
    );

    return response.data;
  } catch (err) {
    return err as IProductResponsePayload;
  }
}

const fetchAllProducts = async (filter?: ISearchFilterPayload): Promise<IProductsResponsePayload> => {
  try {
    const response = await instance.get<IProductsResponsePayload>(API_PATH.product.PRODUCTS, {
      params: filter,
    });

    return response.data;
  } catch (err) {
    return err as IProductsResponsePayload;
  }
};

const productService = {
  fetchProduct,
  fetchAllProducts,
};

export default productService;