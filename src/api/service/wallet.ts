import { IPinRequestPayload, IPinResponsePayload } from "../../interfaces/Auth";
import {
  IPaymentWalletRequestPayload,
  IPaymentWalletResponsePayload,
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

const walletService = {
  verifyPin,
  paymentWallet,
};

export default walletService;
