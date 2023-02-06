import { useState } from "react";
import voucherService from "../api/service/voucher";
import {
  IMarketplaceVoucherPayload,
  IVoucherPaginationPayload,
  IVoucherPayload,
} from "../interfaces/Voucher";

const useVoucher = () => {
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucher, setVoucher] = useState<IVoucherPayload>();
  const [vouchers, setVouchers] = useState<IVoucherPaginationPayload>();
  const [marketplaceVouchers, setMarketplaceVouchers] = useState<
    IMarketplaceVoucherPayload[]
  >([]);

  const createVoucher = async (payload: IVoucherPayload) => {
    setVoucherLoading(true);
    const response = await voucherService.createVoucher(payload);
    setVoucherLoading(false);

    return response;
  };

  const editVoucher = async (payload: IVoucherPayload) => {
    setVoucherLoading(true);
    const response = await voucherService.editVoucher(payload);
    setVoucherLoading(false);

    return response;
  };

  const deleteVoucher = async (id: number) => {
    setVoucherLoading(true);
    const response = await voucherService.deleteVoucher(id);
    setVoucherLoading(false);

    return response;
  };

  const fetchVoucher = async (id: number) => {
    setVoucherLoading(true);
    const response = await voucherService.getVoucher(id);
    setVoucherLoading(false);

    if (response.is_success) {
      setVoucher(response.data);
    }

    return response;
  };

  const fetchAllVoucher = async (
    status: string,
    page: number,
    limit: number,
    shopId: number
  ) => {
    setVoucherLoading(true);
    const response = await voucherService.getAllVouchers(
      status,
      page,
      limit,
      shopId
    );

    if (response.is_success) {
      setVouchers(response.data);
    }

    setVoucherLoading(false);
    return response;
  };

  const fetchAllMarketplaceVoucher = async () => {
    setVoucherLoading(true);
    const response = await voucherService.getAllMarketplaceVouchers();
    setVoucherLoading(false);

    if (response.is_success) {
      setMarketplaceVouchers(response.data.data);
    }

    return response;
  };

  return {
    createVoucher,
    editVoucher,
    deleteVoucher,
    fetchVoucher,
    fetchAllVoucher,
    voucherLoading,
    voucher,
    vouchers,
    fetchAllMarketplaceVoucher,
    marketplaceVouchers,
  };
};

export default useVoucher;
