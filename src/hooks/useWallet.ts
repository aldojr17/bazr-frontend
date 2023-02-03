import walletService from "../api/service/wallet";
import {
  IPinPasswordRequestPayload,
  IPinRequestPayload,
  IPinUpdateRequestPayload,
} from "../interfaces/Auth";
import { IWalletHistoryFilterPayload } from "../interfaces/Filter";
import { IPaymentWalletRequestPayload } from "../interfaces/Wallet";
import useToast from "./useToast";

const useWallet = () => {
  const { successToast, errorToast } = useToast();

  const verifyPin = async (payload: IPinRequestPayload) => {
    const response = await walletService.verifyPin(payload);

    return response;
  };

  const verifyPasswordPin = async (payload: IPinPasswordRequestPayload) => {
    const response = await walletService.verifyPasswordWallet(payload);

    return response;
  };

  const updatePin = async (payload: IPinUpdateRequestPayload) => {
    const response = await walletService.updatePin(payload);

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
      successToast("Payment successful");
    } else {
      errorToast("Failed to create payment", response.message);
    }

    return response.is_success;
  };

  const activateWallet = async (payload: IPinRequestPayload) => {
    const response = await walletService.activateWallet(payload);

    return response;
  };

  const getWalletHistory = async (filter?: IWalletHistoryFilterPayload) => {
    const response = await walletService.getWalletHistory(filter);

    return response;
  };

  return {
    verifyPin,
    paymentWallet,
    createPayment,
    updatePin,
    activateWallet,
    verifyPasswordPin,
    getWalletHistory,
  };
};

export default useWallet;
