import { useToast } from "@chakra-ui/react";
import transactionService from "../api/service/transaction";
import { ITransactionRequestPayload } from "../interfaces/Transaction";

const useOrder = () => {
  const toast = useToast();

  const createTransaction = async (
    payload: ITransactionRequestPayload,
    paymentMethod: number
  ) => {
    payload.payment_method_id = paymentMethod;

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
    createTransaction,
  };
};

export default useOrder;
