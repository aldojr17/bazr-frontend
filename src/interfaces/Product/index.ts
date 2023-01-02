import { IProductCategoryPayload } from "../Category";
import { IVariantGroupPayload } from "../Variant";

export interface ProductState {
  products: IProductPaginationPayload;
}

export interface IProductResponsePayload {
  is_success: boolean;
  data: IProductPayload;
  message: string;
}

export interface IProductsResponsePayload {
  is_success: boolean;
  data: IProductPaginationPayload;
  message: string;
}

export interface IProductPaginationPayload {
  current_page: number;
  data: IProductPayload[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IProductPayload {
  id: number;
  name: string;
  description: string;
  category_id: number;
  is_hazardous: boolean;
  weight: number;
  condition: string;
  internal_sku: string;
  view_count: number;
  favorite_count: number;
  unit_sold: number;
  is_active: boolean;
  total_review: number;
  total_rating: number;
  min_buy_qty: number;
  max_buy_qty: number;
  lowest_price: number;
  highest_price: number;
  shop_id: number;
  category: IProductCategoryPayload;
  variant_group: null;
  product_photos: string[];
}

export interface IProductDetailPricingProps {
  normalPrice: number;
  discountedPrice?: number;
}

export interface IProductDetailQuantityProps {
  stock: number;
  minQty?: number;
  maxQty?: number;
  onQuantityChange: (qty: number) => void;
}

export interface IProductDetailRatingProps {
  rating: number;
  review: number;
}

export interface IProductDetailVariantProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}

export interface IProductDetailVariantsProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}
