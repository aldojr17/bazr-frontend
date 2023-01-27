import { IProductCategoryPayload } from "../Category";
import { IShopPayload } from "../Shop";
import { IVariantGroupPayload, IVariantTypePayload } from "../Variant";

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
  description?: string;
  shop?: IShopPayload;
  category_detail?: IProductCategoryPayload;
  variant_group?: IVariantGroupPayload;
  is_active?: boolean;
  view_count?: number;
  unit_sold?: number;
  favorite_count?: number;
  is_favorite?: boolean;
  rating?: number;
  total_rating?: number;
  total_review?: number;
  internal_sku?: string;
  weight?: number;
  condition?: string;
  is_hazardous?: boolean;
  min_buy_qty?: number;
  max_buy_qty?: number;
  lowest_price?: number;
  highest_price?: number;
  product_photo?: IProductPhotoPayload;
  product_photos?: IProductPhotoPayload[];
}
export interface IProductPhotoPayload {
  id: number;
  product_id: number;
  url: string;
}

export interface IProductReviewPayload {
  username: string;
  rating_score: number;
  picture: string;
  feedback: string;
  review_date: string;
  variant_name: string;
}

export interface IProductReviewsPaginationPayload {
  current_page: number;
  data: IProductReviewPayload[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IProductReviewsResponsePayload {
  is_success: boolean;
  data: IProductReviewsPaginationPayload;
  message: string;
}

export interface IProductDetailVariantProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
  error: boolean;
}

export interface IProductDetailVariantsProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}

export interface IItemSummaryProps {
  productId: number;
  productName: string;
  variantGroup: IVariantGroupPayload;
  selectedVariant: IVariantTypePayload;
  shopId: number;
  shopName: string;
  minQty: number;
  maxQty: number;
  onVariantChange: Function;
}

export interface IDetailProps {
  productName: string;
  productMinPrice: number;
  productMaxPrice: number;
  productRating: number;
  productReview: number;
  productView: number;
  shopId: number;
  selectedVariant: IVariantTypePayload;
}

export interface IStoreProductListProps {
  shopId: number;
}

export interface ISimilarProductListProps {}

export interface ICreateProductShopPayload {
  name: string;
  description: string;
  primary_category_id: number;
  secondary_category_id: number;
  tertiary_category_id: number;
  is_hazardous: boolean;
  weight: number;
  internal_sku: string;
  condition: string;
  min_buy_qty: number;
  max_buy_qty?: number;
  shop_id: number;
  photos: ICreateProductPhotoPayload[];
  variant_group: ICreateProductVGPayload;
}

export interface ICreateProductPhotoPayload {
  url: string;
}

export interface ICreateProductVGPayload {
  name: string;
  variant_type: ICreateProductVTPayload[];
}

export interface ICreateProductVTPayload {
  name: string;
  stock: number;
  price: number;
}

export interface ICreateProductResponse {
  data: null;
  is_success: boolean;
  message: string;
}
