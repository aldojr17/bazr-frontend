import { IProductCategoryPayload } from "../Category";
import { IShopPayload, IShopProfilePayload } from "../Shop";
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
  category_detail?: IProductCategoryPayload;
  is_hazardous?: boolean;
  weight?: number;
  condition?: string;
  internal_sku?: string;
  view_count?: number;
  favorite_count?: number;
  unit_sold: number;
  is_active?: boolean;
  total_review: number;
  total_rating: number;
  min_buy_qty?: number;
  max_buy_qty?: number;
  lowest_price: number;
  highest_price?: number;
  shop: IShopPayload;
  variant_group?: null;
  product_photo?: IProductPhotoPayload;
  product_photos?: IProductPhotoPayload[];
  rating: number;
}
export interface IProductPhotoPayload {
  id: number;
  product_id: number;
  url: string;
}
export interface IProductDetailPricingProps {
  normalPrice: number;
  discountedPrice?: number;
  showRange: boolean;
  minRange: number;
  maxRange: number;
}

export interface IProductDetailQuantityProps {
  stock: number | null;
  minQty: number;
  maxQty: number;
  onQuantityChange: (qty: number) => void;
}

export interface IProductDetailRatingProps {
  rating: number;
  review: number;
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
