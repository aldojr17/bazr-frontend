import { ChangeEvent, ReactNode } from "react";
import { ICartPayload } from "../Cart";
import {
  IPrimaryCategoryPayload,
  IProductCategoryPayload,
  ISecondaryCategoryPayload,
  ITertiaryCategoryPayload,
} from "../Category";
import { IProductPayload, IProductPhotoPayload } from "../Product";
import { ITransactionRequestPayload } from "../Transaction";
import { IUserPayload } from "../User";

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
  checkoutCart: ICartPayload[];
  grandTotal: number;
  user: IUserPayload;
  payload: ITransactionRequestPayload;
  onOpen: () => void;
  paymentMethod: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<number>>;
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
