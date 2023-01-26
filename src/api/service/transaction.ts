import { ITransactionHistoryParams } from "../../interfaces/Filter";
import {
  ICheckoutRequestPayload,
  ICheckoutResponsePayload,
  ITransactionHistoryPagination,
  ITransactionRequestPayload,
  ITransactionResponsePayload,
} from "../../interfaces/Transaction";
import instance from "../config/axios";
import { API_PATH } from "../path";

const createCheckout = async (
  payload: ICheckoutRequestPayload
): Promise<ICheckoutResponsePayload> => {
  try {
    const response = await instance.post<ICheckoutResponsePayload>(
      API_PATH.transaction.CHECKOUT,
      payload
    );

    return response.data;
  } catch (err) {
    return err as ICheckoutResponsePayload;
  }
};

const createTransaction = async (
  payload: ITransactionRequestPayload
): Promise<ITransactionResponsePayload> => {
  try {
    const response = await instance.post<ITransactionResponsePayload>(
      API_PATH.transaction.TRANSACTIONS,
      payload
    );

    return response.data;
  } catch (err) {
    return err as ITransactionResponsePayload;
  }
};

const getTransactionHistory = async (
  filter?: ITransactionHistoryParams
): Promise<ITransactionHistoryPagination> => {
  try {
    const response = await instance.get(API_PATH.transaction.TRANSACTIONS, {
      params: filter,
    });
    return response.data;
  } catch (err) {
    return err as ITransactionHistoryPagination;
  }
};

const transactionService = {
  createCheckout,
  getTransactionHistory,
  createTransaction,
};

export default transactionService;
