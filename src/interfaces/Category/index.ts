export interface ICategoryResponsePayload {
  is_success: boolean;
  data: IPrimaryCategoryPayload[];
  message: string;
}

export interface IPrimaryCategoryPayload {
  id: number;
  name: string;
  icon: string;
  secondary_category: ISecondaryCategoryPayload[];
}

export interface ISecondaryCategoryPayload {
  id: number;
  name: string;
  icon: string;
  primary_category_id: number;
  tertiary_category: ITertiaryCategoryPayload[];
}

export interface ITertiaryCategoryPayload {
  id: number;
  name: string;
  icon: string;
  secondary_category_id: number;
}

export interface IProductCategoryPayload {
  id: number;
  primary_id: number;
  secondary_id: number;
  tertiary_id: number;
  primary_category: IPrimaryCategoryPayload;
  secondary_category: ISecondaryCategoryPayload;
  tertiary_category: ITertiaryCategoryPayload;
}
export interface ICategoryCardProps {
  icon: string;
  name: string;
}
export interface CategoryState {
  categories: IPrimaryCategoryPayload[];
}
