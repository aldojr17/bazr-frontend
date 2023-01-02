import { parseCookies } from "nookies";
import { useEffect } from "react";
import cartService from "../api/service/cart";
import { ICartAddUpdateRequestPayload, ICartPayload } from "../interfaces/Cart";
import {
  clearCart,
  storeCart,
  storeCheckoutCart,
  storeDeletedItem,
} from "../redux/cart";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useCart = () => {
  const { cart, deletedItem } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const getCart = async () => {
    const response = await cartService.fetchAllCart();

    if (response.is_success) {
      dispatch(storeCart(response.data));
    }
  };

  const clearUserCart = () => {
    dispatch(clearCart());
  };

  const updateCart = async (payload: ICartAddUpdateRequestPayload) => {
    const response = await cartService.addAndUpdateCart(payload);

    if (response.is_success) {
      dispatch(
        storeCart(
          cart.map((val) =>
            val.cart_id === response.data.cart_item_id
              ? {
                  ...val,
                  quantity: response.data.quantity,
                }
              : val
          )
        )
      );
    }
  };

  const setCart = (payload: ICartPayload[]) => {
    dispatch(storeCheckoutCart(payload));
  };

  const deleteCart = async (payload: number) => {
    const response = await cartService.deleteCart(payload);

    if (!response.is_success) {
      dispatch(storeCart([...cart, deletedItem]));
    }
  };

  const deleteItem = (payload: number) => {
    dispatch(storeDeletedItem(cart.find((val) => val.cart_id === payload)!));
    dispatch(storeCart(cart.filter((val) => val.cart_id !== payload)));
  };

  const undoDeleteItem = () => {
    dispatch(storeCart([...cart, deletedItem]));
  };

  useEffect(() => {
    if (cart.length === 0 && parseCookies().auth) {
      getCart();
    }
  }, []);

  return {
    cart,
    clearUserCart,
    updateCart,
    setCart,
    deleteCart,
    deleteItem,
    undoDeleteItem,
    getCart,
  };
};

export default useCart;
