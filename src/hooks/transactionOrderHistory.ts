import transactionService from "../api/service/transaction";
import {
  EOrderHistoryStatus,
  IPropsTransactionDetails,
  ITransactionHistoryPagination,
  ITransactionHistoryResponse,
  propsOrderDetails,
} from "../interfaces/Transaction";
import { useAppDispatch, useAppSelector } from "./useSelector";
import {
  setDeliveryStatus as _setDeliveryStatus,
  setPage as _setPage,
  setTransactionOrderHistory as _setTransactionOrderHistory,
  setShowOrderDetail as _setShowOrderDetail,
  setShowTransactionDetail as _setShowTransactionDetail,
} from "../redux/transactionOrderHistory";
import { ITransactionHistoryParams } from "../interfaces/Filter";

const useTransactionOrderHistory = () => {
  const dispatch = useAppDispatch();
  const {
    transactionOrderHistory,
    deliveryStatus,
    page,
    showOrderDetail,
    showTransactionDetail,
  } = useAppSelector((state) => state.transactionOrderHistory);

  const fetchTransactionHistory = async (
    filter?: ITransactionHistoryParams
  ) => {
    if (filter?.status === EOrderHistoryStatus.ALL) {
      filter.status = undefined;
    }
    const response: ITransactionHistoryResponse =
      await transactionService.getTransactionHistory(filter);
    if (response.is_success) {
      dispatch(_setTransactionOrderHistory(response.data));
      return response.data;
    }
    return null;
  };

  const setTransactionOrderHistory = (
    payload: ITransactionHistoryPagination
  ) => {
    dispatch(_setTransactionOrderHistory(payload));
  };

  const setDeliveryStatus = (payload: EOrderHistoryStatus) => {
    dispatch(_setDeliveryStatus(payload));
  };

  const setPage = (payload: number) => {
    dispatch(_setPage(payload));
  };

  const getTransactionDetail = async (id: number) => {
    const response = await transactionService.getTransactionDetail(id);
    return response;
  };

  const setShowOrderDetail = (payload: propsOrderDetails | undefined) => {
    dispatch(_setShowOrderDetail(payload));
  };

  const fetchOrderDetails = async (orderId: number) => {
    const response = await transactionService.getOrderDetails(orderId);
    if (response.is_success) {
      return response.data;
    }
    return null;
  };

  const fetchTransactionDetail = async (id: number) => {
    const response = await transactionService.getTransactionDetail(id);
    if (response.is_success) {
      return response.data;
    }
    return null;
  };

  const setShowTransactionDetail = (
    payload: IPropsTransactionDetails | undefined
  ) => {
    dispatch(_setShowTransactionDetail(payload));
  };

  return {
    fetchTransactionHistory,
    fetchOrderDetails,
    fetchTransactionDetail,

    transactionOrderHistory,
    setTransactionOrderHistory,
    deliveryStatus,
    setDeliveryStatus,
    page,
    setPage,
    getTransactionDetail,
    showOrderDetail,
    setShowOrderDetail,
    showTransactionDetail,
    setShowTransactionDetail,
  };
};

export default useTransactionOrderHistory;
