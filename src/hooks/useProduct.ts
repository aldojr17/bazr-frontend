import productService from "../api/service/product";
import { ISearchFilterPayload } from "../interfaces/Filter";
import { storeProductPagination } from "../redux/product";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useProduct = () => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const fetchAllProducts = async (filter?: ISearchFilterPayload) => {
    const response = await productService.getAllProducts(filter);

    if (response.is_success) {
      dispatch(storeProductPagination(response.data));
      return response.data;
    }

    return null;
  };

  const fetchProduct = async (productId: number) => {
    const response = await productService.getProduct(productId);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  const fetchShopProducts = async (
    shopId: number,
    filter: ISearchFilterPayload
  ) => {
    const response = await productService.getShopProducts(shopId, filter);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  const fetchProductReviews = async (
    id: number,
    filter?: ISearchFilterPayload
  ) => {
    const response = await productService.getProductReviews(id, filter);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  return {
    products,
    fetchAllProducts,
    fetchProduct,
    fetchShopProducts,
    fetchProductReviews,
  };
};

export default useProduct;
