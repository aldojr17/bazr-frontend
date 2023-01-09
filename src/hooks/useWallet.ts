import { useToast } from "@chakra-ui/react";
import walletService from "../api/service/wallet";
import { IPinRequestPayload } from "../interfaces/Auth";
import { IPaymentWalletRequestPayload } from "../interfaces/Wallet";

const useWallet = () => {
  const toast = useToast();

  const verifyPin = async (payload: IPinRequestPayload) => {
    const response = await walletService.verifyPin(payload);

    return response;
  };

  const paymentWallet = async (payload: IPaymentWalletRequestPayload) => {
    const response = await walletService.paymentWallet(payload);

    return response;
  };

  const createPayment = async (
    paymentPayload: IPaymentWalletRequestPayload
  ) => {
    const response = await paymentWallet(paymentPayload);

    if (response.is_success) {
      toast({
        title: "Payment successful",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to create payment",
        description: response.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }

    return response.is_success;
  };

  return {
    verifyPin,
    paymentWallet,
    createPayment,
  };
};

export default useWallet;
