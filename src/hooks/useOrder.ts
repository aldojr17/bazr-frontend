import { useToast } from "@chakra-ui/react";
import transactionService from "../api/service/transaction";
import {
  ICheckoutRequestPayload,
  ITransactionRequestPayload,
} from "../interfaces/Transaction";

const useOrder = () => {
  const toast = useToast();

  const createCheckout = async (payload: ICheckoutRequestPayload) => {
    const response = await transactionService.createCheckout(payload);

    return response;
  };

  const createTransaction = async (payload: ITransactionRequestPayload) => {
    const response = await transactionService.createTransaction(payload);

    if (response.is_success) {
      toast({
        title: "Order created",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to create order",
        description: response.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }

    return response;
  };

  return {
    createCheckout,
    createTransaction,
  };
};

export default useOrder;
