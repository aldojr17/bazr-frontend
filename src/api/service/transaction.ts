import {
  ITransactionRequestPayload,
  ITransactionResponsePayload,
} from "../../interfaces/Transaction";
import instance from "../config/axios";
import { API_PATH } from "../path";

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

const transactionService = {
  createTransaction,
};

export default transactionService;
