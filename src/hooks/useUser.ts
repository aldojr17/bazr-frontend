import { useEffect } from "react";
import categoryService from "../api/service/category";
import { storeCategories } from "../redux/category";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useUser = () => {
  const userId = useAppSelector((state) => state.user.userId);
  //   const dispatch = useAppDispatch();

  //   const getUserId = async () => {
  //     const response = await categoryService.fetchAllCategory();

  //     if (response.is_success) {
  //       dispatch(storeCategories(response.data));
  //     }
  //   };

  //   useEffect(() => {
  //     if (categories.length === 0) {
  //       getCategories();
  //     }
  //   }, []);

  return {
    userId,
  };
};

export default useUser;
