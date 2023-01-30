import React, { ChangeEvent, Dispatch, ReactNode } from "react";
import { ICartPayload } from "../Cart";
import {
  IPrimaryCategoryPayload,
  IProductCategoryPayload,
  ISecondaryCategoryPayload,
  ITertiaryCategoryPayload,
} from "../Category";
import { IProductPayload } from "../Product";
import { ICheckoutSuccessResponsePayload } from "../Transaction";
import { IUserPayload } from "../User";
import { ICreateVariantGroup, ICreateVariantType } from "../Variant";
import { IMarketplaceVoucherPayload, IVoucherPayload } from "../Voucher";

export interface IBreadCrumbProps {
  categories: IProductCategoryPayload;
}

export interface ICartItemProps {
  selectedCart: boolean;
  data: ICartPayload;
  handleSelectItem: (
    event: ChangeEvent<HTMLInputElement>,
    id: number,
    shopId: number
  ) => void;
  handleDeleteItem: (id: number) => void;
}

export interface IToastProps {
  description: ReactNode;
  onClick: () => void;
  isUpdated: boolean;
}

export interface ICarouselItemIndexProps {
  active?: boolean;
}

export interface IMainCarouselProps {
  content?: string[];
}

export interface IProductScrollableContainerProps {
  label: string;
  products: IProductPayload[];
  isLoading?: boolean;
  isError?: boolean;
  onError?: Function;
  link: string;
}

export interface IPaymentPinProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handlePinChange: (value: string) => Promise<void>;
  pinInput: string;
  setPinInput: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
}

export interface IOrderSummaryCardProps {
  isLoading: boolean;
  user: IUserPayload;
  payload: ICheckoutSuccessResponsePayload;
  onOpen: () => void;
  getMarketplaceVoucher: () => void;
  paymentMethod: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<number>>;
  onOpenSealabsPay: () => void;
  marketplaceVoucher: IMarketplaceVoucherPayload;
  setMarketplaceVoucher: Dispatch<
    React.SetStateAction<IMarketplaceVoucherPayload>
  >;
}
export interface ICategoryScrollableContainerProps {
  label?: string;
  categoryLevel: string;
  categories:
    | IPrimaryCategoryPayload[]
    | ISecondaryCategoryPayload[]
    | ITertiaryCategoryPayload[];
  primaryURL?: string;
  secondaryURL?: string;
  isLoading?: boolean;
  isError?: boolean;
  onError?: Function;
}

export interface IProductContainerProps {
  label: string;
  products: IProductPayload[];
  isLoading?: boolean;
  isError?: boolean;
  onError?: Function;
  onLoadMore?: Function;
}

export interface IErrorContainerProps {
  onError?: Function;
}

export interface INoProductContainerProps {
  onReload?: Function;
}

export interface INoContentContainerProps {
  message: string;
  onReload?: Function;
  innerPadding?: number;
}

export interface IEditUserPhoneModalProps {
  phone: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IEditUserProfileModalProps {
  username: string;
  name: string;
  birth_date: string;
  gender_id: number | string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IEditUserEmailModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  codeModalIsOpen: boolean;
  codeModalOnOpen: () => void;
  codeModalOnClose: () => void;
  logoutModalOnOpen: () => void;
  logoutModalIsOpen: boolean;
  logoutModalOnClose: () => void;
}

export interface IEditUserChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenModalIsOpen: boolean;
  tokenModalOnOpen: () => void;
  tokenModalOnClose: () => void;
  logoutModalOnOpen: () => void;
  logoutModalIsOpen: boolean;
  logoutModalOnClose: () => void;
}

export interface IEditUserPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IProductShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface IWalletPasswordModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  verifyPasswordMs: React.MouseEventHandler<HTMLButtonElement>;
  verifyPasswordKb: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface IWalletActivationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  nextModal: () => void;
}

export interface IDeleteModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export interface ISealabsPayTopupWalletProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface ISealabsPayChooseAccountModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ISealabsPayCardProps {
  nameOnCard: string;
  cardNumber: string;
  activeDate: string;
  onClick: () => void;
  chosen: string;
  id: number;
  isDefault: boolean;
  user_id: number;
}

export interface ISealabsPayAddNewAccountProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface ISelectCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: IPrimaryCategoryPayload[];
  selectedCategory: IStateSelectedCategory;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<IStateSelectedCategory>
  >;
}

export interface IStateSelectedCategory {
  primaryCat: IPrimaryCategoryPayload | undefined;
  secondaryCat: ISecondaryCategoryPayload | undefined;
  tertiaryCat: ITertiaryCategoryPayload | undefined;
}

export interface ICreateProductVariationFormProps {
  setVariation: (value: React.SetStateAction<boolean>) => void;
  vgInput: ICreateVariantGroup[];
  setVgInput: React.Dispatch<React.SetStateAction<ICreateVariantGroup[]>>;
  vtList: ICreateVariantType[];
  setVtList: React.Dispatch<React.SetStateAction<ICreateVariantType[]>>;
}

export interface IProductVariationListFormProps {
  secVariation: boolean;
  vgInput: ICreateVariantGroup[];
  setVgInput: React.Dispatch<React.SetStateAction<ICreateVariantGroup[]>>;
  vtList: ICreateVariantType[];
  setVtList: React.Dispatch<React.SetStateAction<ICreateVariantType[]>>;
}
export interface IVoucherCardProps {
  voucher?: IMarketplaceVoucherPayload;
  shopVoucher?: IVoucherPayload;
  setVoucher: Dispatch<React.SetStateAction<IMarketplaceVoucherPayload>>;
  selectShopVoucher: (shopId: number, voucherId: number) => void;
  onClose: () => void;
  isDisabled: boolean;
}

export interface IProductListItemProps {
  index: number;
  name: string;
  qty: number;
  total: number;
  variant_name: string;
  onClick?: () => void;
}

export interface IStoreListItemProps {
  shopName: string;
  shopCityName: string;
  // index: number;
  // name: string;
  // qty: number;
  // total: number;
  // variant_name: string;
  // onClick?: () => void;
}

export interface IQuantitySelectorProps {
  minQty?: number;
  maxQty?: number;
  stock?: number;
  onQuantityChange: (qty: number) => void;
}
