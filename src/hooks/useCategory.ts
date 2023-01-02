import { useEffect } from "react";
import categoryService from "../api/service/category";
import { storeCategories } from "../redux/category";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useCategory = () => {
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await categoryService.fetchAllCategory();

    if (response.is_success) {
      dispatch(storeCategories(response.data));
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  return {
    categories,
  };
};

export default useCategory;
