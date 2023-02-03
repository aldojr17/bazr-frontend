import { ICategoryResponsePayload } from "../../interfaces/Category";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getAllCategory = async (): Promise<ICategoryResponsePayload> => {
  try {
    const response = await instance.get<ICategoryResponsePayload>(
      API_PATH.category.CATEGORIES
    );

    return response.data;
  } catch (err) {
    return err as ICategoryResponsePayload;
  }
};

const getAllCategoryProduct = async (
  name?: string
): Promise<ICategoryResponsePayload> => {
  try {
    const response = await instance.get<ICategoryResponsePayload>(
      API_PATH.category.CATEGORIES_PRODUCT + `?name=${name}`
    );

    return response.data;
  } catch (err) {
    return err as ICategoryResponsePayload;
  }
};

const categoryService = {
  getAllCategory,
  getAllCategoryProduct,
};

export default categoryService;
