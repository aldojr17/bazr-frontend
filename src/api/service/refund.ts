import { IFilterPayload } from "../../interfaces/Filter";
import {
  ICreateRefundPayload,
  IRefundConfirmPayload,
  IRefundDetailPayload,
  IRefundPaginationPayload,
} from "../../interfaces/Refund";
import instance from "../config/axios";
import { API_PATH } from "../path";

const createRefund = async (
  payload: ICreateRefundPayload
): Promise<IRefundDetailPayload> => {
  try {
    const response = await instance.post<IRefundDetailPayload>(
      API_PATH.refund.REFUNDS,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IRefundDetailPayload;
  }
};

const getBuyerRefund = async (
  filter?: IFilterPayload
): Promise<IRefundPaginationPayload> => {
  try {
    const response = await instance.get<IRefundPaginationPayload>(
      API_PATH.refund.BUYER_REFUNDS,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IRefundPaginationPayload;
  }
};

const getAdminRefund = async (
  filter?: IFilterPayload
): Promise<IRefundPaginationPayload> => {
  try {
    const response = await instance.get<IRefundPaginationPayload>(
      API_PATH.refund.REFUNDS,
      {
        params: filter,
      }
    );

    return response.data;
  } catch (err) {
    return err as IRefundPaginationPayload;
  }
};

const approveRefundAdmin = async (
  refundId: number,
  payload: IRefundConfirmPayload
): Promise<IRefundDetailPayload> => {
  try {
    const response = await instance.patch<IRefundDetailPayload>(
      API_PATH.refund.REFUND_DETAIL(refundId),
      payload
    );

    return response.data;
  } catch (err) {
    return err as IRefundDetailPayload;
  }
};

const refundService = {
  createRefund,
  getBuyerRefund,
  getAdminRefund,
  approveRefundAdmin,
};

export default refundService;
