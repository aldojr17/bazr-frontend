import {
  ISealabsPayGetAllResponsePayload,
  ISealabsPayAddNewResponsePayload,
  ISealabsPayAddNewPayload,
  ISealabsPayUpdateDefaultPayload,
  ISealabsPayUpdateDefaultResponsePayload,
  ISealabsPayDeletePayload,
  ISealabsPayDeleteResponsePayload,
  ISealabsPayTopupPayload,
  ISealabsPayPaymentPayload,
} from "../../interfaces/SealabsPay";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getAllSealabsPay =
  async (): Promise<ISealabsPayGetAllResponsePayload> => {
    try {
      const response = await instance.get<ISealabsPayGetAllResponsePayload>(
        API_PATH.sealabs_pay.SEALABS_PAY
      );
      return response.data;
    } catch (err) {
      return err as ISealabsPayGetAllResponsePayload;
    }
  };

const postNewSealabsPay = async (
  payload: ISealabsPayAddNewPayload
): Promise<ISealabsPayAddNewResponsePayload> => {
  try {
    const response = await instance.post<ISealabsPayAddNewResponsePayload>(
      API_PATH.sealabs_pay.SEALABS_PAY,
      payload
    );
    return response.data;
  } catch (err) {
    return err as ISealabsPayAddNewResponsePayload;
  }
};

const topUpWalletSealabsPay = async (
  payload: ISealabsPayTopupPayload
): Promise<ISealabsPayAddNewResponsePayload> => {
  try {
    const response = await instance.post<ISealabsPayAddNewResponsePayload>(
      API_PATH.sealabs_pay.SEALABS_PAY + "/topup",
      payload
    );
    return response.data;
  } catch (err) {
    return err as ISealabsPayAddNewResponsePayload;
  }
};

const paymentSealabsPay = async (
  payload: ISealabsPayPaymentPayload,
  transactionId: number
): Promise<ISealabsPayAddNewResponsePayload> => {
  try {
    const response = await instance.post<ISealabsPayAddNewResponsePayload>(
      API_PATH.sealabs_pay.SEALABS_PAY + `/payment/${transactionId}`,
      payload
    );
    return response.data;
  } catch (err) {
    return err as ISealabsPayAddNewResponsePayload;
  }
};

const updateUserDefaultSealabsPay = async (
  payload: ISealabsPayUpdateDefaultPayload
): Promise<ISealabsPayUpdateDefaultResponsePayload> => {
  try {
    const response =
      await instance.put<ISealabsPayUpdateDefaultResponsePayload>(
        API_PATH.sealabs_pay.SEALABS_PAY + "/default",
        payload
      );
    return response.data;
  } catch (err) {
    return err as ISealabsPayUpdateDefaultResponsePayload;
  }
};

const deleteSealabsPay = async (
  payload: ISealabsPayDeletePayload
): Promise<ISealabsPayDeleteResponsePayload> => {
  try {
    const response = await instance.delete<ISealabsPayDeleteResponsePayload>(
      API_PATH.sealabs_pay.SEALABS_PAY + `/${payload.sealabs_pay_id}`
    );
    return response.data;
  } catch (err) {
    return err as ISealabsPayDeleteResponsePayload;
  }
};

const sealabsPayService = {
  getAllSealabsPay: getAllSealabsPay,
  postNewSealabsPay,
  updateUserDefaultSealabsPay,
  deleteSealabsPay,
  topUpWalletSealabsPay,
  paymentSealabsPay,
};

export default sealabsPayService;
