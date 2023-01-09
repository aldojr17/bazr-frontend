import { ChangeEvent, ReactNode } from "react";
import { ICartPayload } from "../Cart";
import {
  IPrimaryCategoryPayload,
  IProductCategoryPayload,
  ISecondaryCategoryPayload,
  ITertiaryCategoryPayload,
} from "../Category";
import { IProductPayload, IProductPhotoPayload } from "../Product";

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
