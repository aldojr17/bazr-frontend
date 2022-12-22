import { ICategoryResponsePayload } from "../../interfaces/Category";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchAllCategory = async (): Promise<ICategoryResponsePayload> => {
  try {
    const response = await instance.get<ICategoryResponsePayload>(
      API_PATH.category.GET_ALL_CATEGORIES
    );

    return response.data;
  } catch (err) {
    return err as ICategoryResponsePayload;
  }
};

const categoryService = {
  fetchAllCategory,
};

export default categoryService;
