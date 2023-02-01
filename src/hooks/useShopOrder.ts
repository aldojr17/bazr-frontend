import React, { useState } from "react";
import shopOrderService from "../api/service/shopOrder";
import {
  IShopOrderDetailFullPayload,
  IShopOrderPaginationPayload,
  IShopOrderUpdateStatusPayload,
} from "../interfaces/Order";

function useShopOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [shopOrders, setShopOrders] = useState<IShopOrderPaginationPayload>();
  const [shopOrder, setShopOrder] = useState<IShopOrderDetailFullPayload>();

  const fetchAllShopOrders = async (
    shopId: number,
    status: string,
    page: number,
    limit: number
  ) => {
    setIsLoading(true);
    const response = await shopOrderService.getAllOrders(
      shopId,
      status,
      page,
      limit
    );
    setIsLoading(false);

    if (response.is_success) {
      setShopOrders(response.data);
    }

    return response;
  };

  const fetchShopOrder = async (shopId: number, orderId: number) => {
    setIsLoading(true);
    const response = await shopOrderService.getOrder(shopId, orderId);
    setIsLoading(false);

    if (response.is_success) {
      setShopOrder(response.data);
    }

    return response;
  };

  const updateShopOrder = async (
    shopId: number,
    orderId: number,
    payload: IShopOrderUpdateStatusPayload
  ) => {
    setIsLoading(true);
    const response = await shopOrderService.putOrder(shopId, orderId, payload);
    setIsLoading(false);

    if (response.is_success) {
      setShopOrder(response.data);
    }

    return response;
  };

  return {
    fetchAllShopOrders,
    fetchShopOrder,
    updateShopOrder,
    isLoading,
    shopOrders,
    shopOrder,
  };
}

export default useShopOrder;
