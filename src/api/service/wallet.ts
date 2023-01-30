import {
  IPinPasswordRequestPayload,
  IPinRequestPayload,
  IPinResponsePayload,
  IPinUpdateRequestPayload,
} from "../../interfaces/Auth";
import { IWalletHistoryFilterPayload } from "../../interfaces/Filter";
import {
  IPaymentWalletRequestPayload,
  IPaymentWalletResponsePayload,
  IWalletHistoryResponsePayload,
} from "../../interfaces/Wallet";
import instance from "../config/axios";
import { API_PATH } from "../path";

const verifyPin = async (
  payload: IPinRequestPayload
): Promise<IPinResponsePayload> => {
  try {
    const response = await instance.post<IPinResponsePayload>(
      API_PATH.wallet.VERIFY_PIN,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPinResponsePayload;
  }
};

const verifyPasswordWallet = async (
  payload: IPinPasswordRequestPayload
): Promise<IPinResponsePayload> => {
  try {
    const response = await instance.post<IPinResponsePayload>(
      API_PATH.wallet.VERIFY_PASSWORD_PIN,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPinResponsePayload;
  }
};

const paymentWallet = async (
  payload: IPaymentWalletRequestPayload
): Promise<IPaymentWalletResponsePayload> => {
  try {
    const response = await instance.post<IPaymentWalletResponsePayload>(
      API_PATH.wallet.PAYMENT_WALLET,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPaymentWalletResponsePayload;
  }
};

const updatePin = async (
  payload: IPinUpdateRequestPayload
): Promise<IPinResponsePayload> => {
  try {
    const response = await instance.put<IPinResponsePayload>(
      API_PATH.wallet.UPDATE_PIN,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPinResponsePayload;
  }
};

const activateWallet = async (
  payload: IPinRequestPayload
): Promise<IPaymentWalletResponsePayload> => {
  try {
    const response = await instance.post<IPaymentWalletResponsePayload>(
      API_PATH.wallet.ACTIVATE_WALLET,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IPaymentWalletResponsePayload;
  }
};

const getWalletHistory = async (
  filter?: IWalletHistoryFilterPayload
): Promise<IWalletHistoryResponsePayload> => {
  try {
    const response = await instance.get<IWalletHistoryResponsePayload>(
      API_PATH.wallet.WALLET_HISTORY,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IWalletHistoryResponsePayload;
  }
};

const walletService = {
  verifyPin,
  paymentWallet,
  updatePin,
  activateWallet,
  verifyPasswordWallet,
  getWalletHistory,
};

export default walletService;
