import { useEffect } from "react";
import categoryService from "../api/service/category";
import { storeCategories } from "../redux/category";
import { useAppDispatch, useAppSelector } from "./useSelector";
import slugify from "slugify";

const useCategory = () => {
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await categoryService.fetchAllCategory();

    if (response.is_success) {
      dispatch(storeCategories(response.data));
    }
  };

  const getPrimaryCategoryBySlugifiedName = (slugifiedName: string) => {
    const category = categories.find((category) => {
      return slugify(category.name) === slugifiedName;
    });
    return category;
  };

  const getSecondaryCategoryBySlugifiedName = (
    primarySlugifiedName: string,
    secondarySlugifiedName: string
  ) => {
    const primaryCategory =
      getPrimaryCategoryBySlugifiedName(primarySlugifiedName);
    const secondaryCategory = primaryCategory?.secondary_category?.find(
      (category) => {
        return slugify(category.name) === secondarySlugifiedName;
      }
    );
    return secondaryCategory;
  };

  const getTertiaryCategoryBySlugifiedName = (
    primarySlugifiedName: string,
    secondarySlugifiedName: string,
    tertiarySlugifiedName: string
  ) => {
    const secondaryCategory = getSecondaryCategoryBySlugifiedName(
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
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  return {
    categories,
    getPrimaryCategoryBySlugifiedName,
    getSecondaryCategoryBySlugifiedName,
    getTertiaryCategoryBySlugifiedName,
  };
};

export default useCategory;
