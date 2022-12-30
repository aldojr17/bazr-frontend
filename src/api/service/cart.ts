import { ICartResponsePayload, ICartUpdateRequestPayload } from "../../interfaces/Cart";
import instance from "../config/axios";
import { API_PATH } from "../path";

const addToCart = async (payload: ICartUpdateRequestPayload): Promise<ICartResponsePayload> => {
    try {
        const response = await instance.post<ICartResponsePayload>(
            API_PATH.cart.CART, payload
        );

        return response.data;
    } catch (err) {
        return err as ICartResponsePayload;
    }
};

const cartService = {
    addToCart,
};

export default cartService;
