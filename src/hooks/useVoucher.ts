import { useState } from "react";
import voucherService from "../api/service/voucher";
import {
  IMarketplaceVoucherPayload,
  IVoucherPaginationPayload,
  IVoucherPayload,
} from "../interfaces/Voucher";

const useVoucher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [voucher, setVoucher] = useState<IVoucherPayload>();
  const [vouchers, setVouchers] = useState<IVoucherPaginationPayload>();
  const [marketplaceVouchers, setMarketplaceVouchers] = useState<
    IMarketplaceVoucherPayload[]
  >([]);

  const createVoucher = async (payload: IVoucherPayload) => {
    setIsLoading(true);
    const response = await voucherService.createVoucher(payload);
    setIsLoading(false);

    return response;
  };

  const editVoucher = async (payload: IVoucherPayload) => {
    setIsLoading(true);
    const response = await voucherService.editVoucher(payload);
    setIsLoading(false);

    return response;
  };

  const deleteVoucher = async (id: number) => {
    setIsLoading(true);
    const response = await voucherService.deleteVoucher(id);
    setIsLoading(false);

    return response;
  };

  const fetchVoucher = async (id: number) => {
    setIsLoading(true);
    const response = await voucherService.getVoucher(id);
    setIsLoading(false);

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
    setIsLoading(true);
    const response = await voucherService.getAllVouchers(
      status,
      page,
      limit,
      shopId
    );
    setIsLoading(false);

    if (response.is_success) {
      setVouchers(response.data);
    }

    return response;
  };

  const fetchAllMarketplaceVoucher = async () => {
    setIsLoading(true);
    const response = await voucherService.getAllMarketplaceVouchers();
    setIsLoading(false);

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
    isLoading,
    voucher,
    vouchers,
    fetchAllMarketplaceVoucher,
    marketplaceVouchers,
  };
};

export default useVoucher;
