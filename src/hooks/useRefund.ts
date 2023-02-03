import refundService from "../api/service/refund";
import { IFilterPayload } from "../interfaces/Filter";
import {
  ICreateRefundPayload,
  IRefundConfirmPayload,
} from "../interfaces/Refund";

const useRefund = () => {
  const createRefund = async (payload: ICreateRefundPayload) => {
    const response = await refundService.createRefund(payload);

    return response;
  };

  const fetchBuyerRefund = async (filter?: IFilterPayload) => {
    const response = await refundService.getBuyerRefund(filter);

    return response;
  };

  const fetchAdminRefund = async (filter?: IFilterPayload) => {
    const response = await refundService.getAdminRefund(filter);

    return response;
  };

  const approveRefundAdmin = async (
    refundId: number,
    payload: IRefundConfirmPayload
  ) => {
    const response = await refundService.approveRefundAdmin(refundId, payload);

    return response;
  };

  return {
    createRefund,
    fetchBuyerRefund,
    fetchAdminRefund,
    approveRefundAdmin,
  };
};

export default useRefund;
