import transactionService from "../api/service/transaction";
import {
  EOrderHistoryStatus,
  ITransactionHistoryPagination,
} from "../interfaces/Transaction";
import { useAppDispatch, useAppSelector } from "./useSelector";
import {
  setDeliveryStatus as _setDeliveryStatus,
  setPage as _setPage,
  setTransactionOrderHistory as _setTransactionOrderHistory,
} from "../redux/transactionOrderHistory";
import { ITransactionHistoryParams } from "../interfaces/Filter";

const useTransactionOrderHistory = () => {
  const dispatch = useAppDispatch();
  const { transactionOrderHistory, deliveryStatus, page } = useAppSelector(
    (state) => state.transactionOrderHistory
  );

  const fetchTransactionHistory = async (
    filter?: ITransactionHistoryParams
  ) => {
    if (filter?.status === EOrderHistoryStatus.ALL) {
      filter.status = undefined;
    }
    const response = await transactionService.getTransactionHistory(filter);
    dispatch(_setTransactionOrderHistory(response));
    return response;
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

  return {
    fetchTransactionHistory,

    transactionOrderHistory,
    setTransactionOrderHistory,
    deliveryStatus,
    setDeliveryStatus,
    page,
    setPage,
  };
};

export default useTransactionOrderHistory;
