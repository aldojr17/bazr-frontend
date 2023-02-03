import { IFilterPayload } from "../../interfaces/Filter";
import {
  ICreateRefundPayload,
  IRefundActionResponse,
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

const getSellerRefund = async (
  filter?: IFilterPayload
): Promise<IRefundPaginationPayload> => {
  try {
    const response = await instance.get<IRefundPaginationPayload>(
      API_PATH.refund.SELLER_REFUNDS,
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

const getRefundDetail = async (id: number): Promise<IRefundDetailPayload> => {
  try {
    const response = await instance.get<IRefundDetailPayload>(
      API_PATH.refund.REFUND_DETAIL(id)
    );

    return response.data;
  } catch (err) {
    return err as IRefundDetailPayload;
  }
};

const approveRefundSeller = async (
  refundId: number
): Promise<IRefundActionResponse> => {
  try {
    const response = await instance.patch<IRefundActionResponse>(
      API_PATH.refund.REFUND_DETAIL(refundId),
      {
        status: "approved",
      }
    );

    return response.data;
  } catch (err) {
    return err as IRefundActionResponse;
  }
};

const rejectRefundSeller = async (
  refundId: number
): Promise<IRefundActionResponse> => {
  try {
    const response = await instance.patch<IRefundActionResponse>(
      API_PATH.refund.REFUND_DETAIL(refundId),
      {
        status: "rejected",
      }
    );

    return response.data;
  } catch (err) {
    return err as IRefundActionResponse;
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
  getSellerRefund,
  getAdminRefund,
  getRefundDetail,
  approveRefundSeller,
  rejectRefundSeller,
  approveRefundAdmin,
};

export default refundService;
