import { ICheckoutSuccessResponsePayload } from "../../Transaction";
import {
  IMarketplaceVoucherPayload,
  IVoucherPaginationPayload,
} from "../../Voucher";

export interface IShopVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  vouchers: IVoucherPaginationPayload;
  checkoutData: ICheckoutSuccessResponsePayload;
  onSelectVoucher: (voucher: IMarketplaceVoucherPayload) => void;
  onSelectShopVoucher: (shopId: number, voucherId: number) => void;
}

export interface IVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  vouchers: IMarketplaceVoucherPayload[];
  checkoutData: ICheckoutSuccessResponsePayload;
  onSelectVoucher: (voucher: IMarketplaceVoucherPayload) => void;
  onSelectShopVoucher: (shopId: number, voucherId: number) => void;
}
