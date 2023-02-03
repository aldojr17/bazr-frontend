import { useState } from "react";
import refundService from "../api/service/refund";
import { IFilterPayload } from "../interfaces/Filter";
import {
  ICreateRefundPayload,
  IRefundConfirmPayload,
} from "../interfaces/Refund";

const useRefund = () => {
  const [refundLoading, setRefundLoading] = useState(false);

  const createRefund = async (payload: ICreateRefundPayload) => {
    const response = await refundService.createRefund(payload);

    return response;
  };

  const fetchBuyerRefund = async (filter?: IFilterPayload) => {
    const response = await refundService.getBuyerRefund(filter);

    return response;
  };

  const fetchSellerRefund = async (filter?: IFilterPayload) => {
    const response = await refundService.getSellerRefund(filter);

    return response;
  };

  const fetchAdminRefund = async (filter?: IFilterPayload) => {
    const response = await refundService.getAdminRefund(filter);

    return response;
  };

  const fetchRefundDetail = async (id: number) => {
    setRefundLoading(true);
    const response = await refundService
      .getRefundDetail(id)
      .finally(() => setRefundLoading(false));

    return response;
  };

  const approveRefundSeller = async (refundId: number) => {
    const response = await refundService.approveRefundSeller(refundId);

    return response;
  };

  const rejectRefundSeller = async (refundId: number) => {
    const response = await refundService.rejectRefundSeller(refundId);

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
    refundLoading,

    createRefund,
    fetchBuyerRefund,
    fetchSellerRefund,
    fetchAdminRefund,
    fetchRefundDetail,
    approveRefundSeller,
    rejectRefundSeller,
    approveRefundAdmin,
  };
};

export default useRefund;
