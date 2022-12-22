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

export interface ICategoryCardProps {
  icon: string;
  name: string;
}
