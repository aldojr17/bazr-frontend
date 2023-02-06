import { parseCookies } from "nookies";
import { useEffect } from "react";
import cartService from "../api/service/cart";
import { ICartAddUpdateRequestPayload, ICartPayload } from "../interfaces/Cart";
import { ICheckoutSuccessResponsePayload } from "../interfaces/Transaction";
import {
  clearCart,
  storeCart,
  storeCheckoutCart,
  storeCheckoutCartIds,
  storeDeletedItem,
} from "../redux/cart";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useCart = () => {
  const { cart, deletedItem, checkoutData, checkoutCart } = useAppSelector(
    (state) => state.cart
  );
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
    return response;
  };

  const updateNotes = (payload: ICartPayload) => {
    dispatch(
      storeCart(
        cart.map((val) => {
          return val.cart_id === payload.cart_id ? payload : val;
        })
      )
    );
  };

  const setCheckoutData = (payload: ICheckoutSuccessResponsePayload) => {
    dispatch(storeCheckoutCart(payload));
  };

  const setCart = (payload: ICartPayload[]) => {
    dispatch(storeCart(payload));
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

  const setCheckoutCartIds = (payload: number[]) => {
    dispatch(storeCheckoutCartIds(payload));
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
    setCheckoutData,
    deleteCart,
    deleteItem,
    undoDeleteItem,
    getCart,
    setCart,
    checkoutData,
    setCheckoutCartIds,
    checkoutCart,
    updateNotes,
  };
};

export default useCart;
