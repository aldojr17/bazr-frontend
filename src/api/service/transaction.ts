import { ITransactionHistoryParams } from "../../interfaces/Filter";
import {
  ICheckoutRequestPayload,
  ICheckoutResponsePayload,
  IOrderDetailsResponsePayload,
  ITransactionHistoryResponse,
  ITransactionRequestPayload,
  ITransactionResponsePayload,
} from "../../interfaces/Transaction";
import { IWalletTransactionResponsePayload } from "../../interfaces/Wallet";
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
): Promise<ITransactionHistoryResponse> => {
  try {
    const response = await instance.get<ITransactionHistoryResponse>(
      API_PATH.transaction.TRANSACTIONS,
      {
        params: filter,
      }
    );
    return response.data;
  } catch (err) {
    return err as ITransactionHistoryResponse;
  }
};

const getTransactionDetail = async (
  id: number
): Promise<IWalletTransactionResponsePayload> => {
  try {
    const response = await instance.get(
      API_PATH.transaction.TRANSACTION_DETAILS(id)
    );
    return response.data;
  } catch (err) {
    return err as IWalletTransactionResponsePayload;
  }
};

const getOrderDetails = async (
  orderId: number
): Promise<IOrderDetailsResponsePayload> => {
  try {
    const response = await instance.get<IOrderDetailsResponsePayload>(
      API_PATH.transaction.ORDER_DETAILS(orderId)
    );
    return response.data;
  } catch (err) {
    return err as IOrderDetailsResponsePayload;
  }
};

const transactionService = {
  createCheckout,
  getTransactionHistory,
  createTransaction,
  getTransactionDetail,
  getOrderDetails,
};

export default transactionService;
