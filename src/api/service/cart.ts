import {
  ICartResponsePayload,
  ICartAddUpdateRequestPayload,
  IAddUpdateCartResponsePayload,
} from "../../interfaces/Cart";
import instance from "../config/axios";
import { API_PATH } from "../path";

const fetchAllCart = async (): Promise<ICartResponsePayload> => {
  try {
    const response = await instance.get<ICartResponsePayload>(
      API_PATH.cart.CART + "?simplify=false"
    );

    return response.data;
  } catch (err) {
    return err as ICartResponsePayload;
  }
};

const addAndUpdateCart = async (
  payload: ICartAddUpdateRequestPayload
): Promise<IAddUpdateCartResponsePayload> => {
  try {
    const response = await instance.post<IAddUpdateCartResponsePayload>(
      API_PATH.cart.CART,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IAddUpdateCartResponsePayload;
  }
};

const deleteCart = async (id: number): Promise<ICartResponsePayload> => {
  try {
    const response = await instance.delete<ICartResponsePayload>(
      API_PATH.cart.CART + `/${id}`
    );

    return response.data;
  } catch (err) {
    return err as ICartResponsePayload;
  }
};

const cartService = {
  addAndUpdateCart,
  fetchAllCart,
  deleteCart,
};

export default cartService;
