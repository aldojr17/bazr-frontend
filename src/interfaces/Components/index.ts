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

export interface IImagePreviewerProps {
  data: IProductPhotoPayload[];
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
  categories:
    | IPrimaryCategoryPayload[]
    | ISecondaryCategoryPayload[]
    | ITertiaryCategoryPayload[];
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
