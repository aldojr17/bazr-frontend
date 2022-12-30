import { parseCookies } from "nookies";
import { useEffect } from "react";
import cartService from "../api/service/cart";
import { clearCart, storeCart } from "../redux/cart";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useCart = () => {
  const cart = useAppSelector((state) => state.cart.cart);
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

  useEffect(() => {
    if (cart.length === 0 && parseCookies().auth) {
      getCart();
    }
  }, []);

  return {
    cart,
    clearUserCart,
  };
};

export default useCart;
