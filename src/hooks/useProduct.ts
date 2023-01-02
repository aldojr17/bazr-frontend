import productService from "../api/service/product";
import { ISearchFilterPayload } from "../interfaces/Filter";
import { storeProductPagination } from "../redux/product";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useProduct = () => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const getProducts = async (filter?: ISearchFilterPayload) => {
    const response = await productService.fetchAllProducts(filter);

    if (response.is_success) {
      dispatch(storeProductPagination(response.data));
    }
  };

  const fetchProduct = async (productId: number) => {
    const response = await productService.fetchProduct(productId);

    if (response.is_success) {
      return response.data;
    }

    return null;
  };

  return {
    getProducts,
    products,
    fetchProduct,
  };
};

export default useProduct;
