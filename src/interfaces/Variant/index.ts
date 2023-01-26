import { IPromotionPayload } from "../Promotion";

export interface IVariantGroupPayload {
  id: number;
  name: string;
  product_id: number;
  variant_types: IVariantTypePayload[];
}

export interface IVariantTypePayload {
  id: number;
  name: string;
  price: number;
  stock: number;
  promotion?: IPromotionPayload;
  discounted_price?: number;
  discounted_percentage?: number;
  variant_group_id?: number;
}
