import {
  IMarketplaceVouchersResponsePayload,
  IVoucherPayload,
  IVoucherResponsePayload,
  IVouchersResponsePayload,
} from "../../interfaces/Voucher";
import instance from "../config/axios";
import { API_PATH } from "../path";

const createVoucher = async (
  payload: IVoucherPayload
): Promise<IVoucherResponsePayload> => {
  try {
    const response = await instance.post<IVoucherResponsePayload>(
      API_PATH.voucher.SHOP_VOUCHER,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IVoucherResponsePayload;
  }
};

const editVoucher = async (
  payload: IVoucherPayload
): Promise<IVoucherResponsePayload> => {
  try {
    const response = await instance.put<IVoucherResponsePayload>(
      API_PATH.voucher.SHOP_VOUCHER + "/" + payload.id,
      payload
    );

    return response.data;
  } catch (err) {
    return err as IVoucherResponsePayload;
  }
};

const deleteVoucher = async (id: number): Promise<IVoucherResponsePayload> => {
  try {
    const response = await instance.delete<IVoucherResponsePayload>(
      API_PATH.voucher.SHOP_VOUCHER + "/" + id
    );

    return response.data;
  } catch (err) {
    return err as IVoucherResponsePayload;
  }
};

const getVoucher = async (id: number): Promise<IVoucherResponsePayload> => {
  try {
    const response = await instance.get<IVoucherResponsePayload>(
      API_PATH.voucher.SHOP_VOUCHER + "/" + id
    );

    return response.data;
  } catch (err) {
    return err as IVoucherResponsePayload;
  }
};

const getAllVouchers = async (
  status: string,
  page: number,
  limit: number,
  shopId: number
): Promise<IVouchersResponsePayload> => {
  try {
    const response = await instance.get<IVouchersResponsePayload>(
      API_PATH.voucher.SHOP_VOUCHER +
        `?shopId=${shopId}&status=${status}&page=${page}&limit=${limit}&sortBy=min_purchase`
    );

    return response.data;
  } catch (err) {
    return err as IVouchersResponsePayload;
  }
};

const getAllMarketplaceVouchers =
  async (): Promise<IMarketplaceVouchersResponsePayload> => {
    try {
      const response = await instance.get<IMarketplaceVouchersResponsePayload>(
        API_PATH.voucher.VOUCHER + `?status=user&sortBy=min_purchase`
      );

      return response.data;
    } catch (err) {
      return err as IMarketplaceVouchersResponsePayload;
    }
  };

const voucherService = {
  createVoucher,
  editVoucher,
  deleteVoucher,
  getVoucher,
  getAllVouchers,
  getAllMarketplaceVouchers,
};

export default voucherService;
