import { useEffect, useState } from "react";
import categoryService from "../api/service/category";
import { storeCategories } from "../redux/category";
import { useAppDispatch, useAppSelector } from "./useSelector";
import slugify from "slugify";
import { IPrimaryCategoryPayload } from "../interfaces/Category";

const useCategory = (isMounted: boolean = true) => {
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();
  const [categoriesProduct, setCategoriesProduct] = useState<
    IPrimaryCategoryPayload[]
  >([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const fetchCategories = async () => {
    setCategoryLoading(true);
    const response = await categoryService.getAllCategory();

    if (response.is_success) {
      dispatch(storeCategories(response.data));

      setCategoryLoading(false);
      return;
    }

    setCategoryLoading(false);
    return;
  };

  const fetchCategoriesProduct = async (name?: string) => {
    const response = await categoryService.getAllCategoryProduct(name);

    if (response.is_success) {
      setCategoriesProduct(response.data);
    }
  };

  const fetchPrimaryCategoryBySlugifiedName = (slugifiedName: string) => {
    const category = categories.find((category) => {
      return slugify(category.name) === slugifiedName;
    });
    return category;
  };

  const fetchSecondaryCategoryBySlugifiedName = (
    primarySlugifiedName: string,
    secondarySlugifiedName: string
  ) => {
    const primaryCategory =
      fetchPrimaryCategoryBySlugifiedName(primarySlugifiedName);
    const secondaryCategory = primaryCategory?.secondary_category?.find(
      (category) => {
        return slugify(category.name) === secondarySlugifiedName;
      }
    );
    return secondaryCategory;
  };

  const fetchTertiaryCategoryBySlugifiedName = (
    primarySlugifiedName: string,
    secondarySlugifiedName: string,
    tertiarySlugifiedName: string
  ) => {
    const secondaryCategory = fetchSecondaryCategoryBySlugifiedName(
      primarySlugifiedName,
      secondarySlugifiedName
    );
    const tertiaryCategory = secondaryCategory?.tertiary_category?.find(
      (category) => {
        return slugify(category.name) === tertiarySlugifiedName;
      }
    );
    return tertiaryCategory;
  };

  useEffect(() => {
    if (categories.length === 0 && isMounted) {
      fetchCategories();
    }
  }, []);

  return {
    categories,
    categoriesProduct,
    categoryLoading,

    fetchCategoriesProduct,
    fetchPrimaryCategoryBySlugifiedName,
    fetchSecondaryCategoryBySlugifiedName,
    fetchTertiaryCategoryBySlugifiedName,
  };
};

export default useCategory;
