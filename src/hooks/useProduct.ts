import { useState } from "react";
import productService from "../api/service/product";
import { ISearchFilterPayload } from "../interfaces/Filter";
import { storeProductPagination } from "../redux/product";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useProduct = () => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async (filter?: ISearchFilterPayload) => {
    setIsLoading(true);
    const response = await productService.fetchAllProducts(filter);

    if (response.is_success) {
      dispatch(storeProductPagination(response.data));
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    getProducts,
    products,
  };
};

export default useProduct;
