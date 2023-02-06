import transactionService from "../api/service/transaction";
import {
  ICheckoutRequestPayload,
  ITransactionRequestPayload,
} from "../interfaces/Transaction";

const useOrder = () => {
  const createCheckout = async (payload: ICheckoutRequestPayload) => {
    const response = await transactionService.createCheckout(payload);

    return response;
  };

  const createTransaction = async (payload: ITransactionRequestPayload) => {
    const response = await transactionService.createTransaction(payload);

    return response;
  };

  return {
    createCheckout,
    createTransaction,
  };
};

export default useOrder;
