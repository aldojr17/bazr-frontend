import { ChangeEvent, ReactNode } from "react";
import { ICartPayload } from "../Cart";
import { IProductCategoryPayload } from "../Category";

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
  data: string[];
}

export interface IToastProps {
  description: ReactNode;
  onClick: () => void;
  isUpdated: boolean;
}

export interface ICarouselItemIndexProps {
  active?: boolean;
}
