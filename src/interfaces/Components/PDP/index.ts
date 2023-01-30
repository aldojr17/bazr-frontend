import { IProductPhotoPayload, IProductReviewPayload } from "../../Product";
import { IVariantGroupPayload, IVariantTypePayload } from "../../Variant";

export interface IDetailProps {
  productName: string;
  productMinPrice: number;
  productMaxPrice: number;
  productRating: number;
  productReview: number;
  productView: number;
  productSoldCount: number;
  productDescription: string;
  shopId: number;
  selectedVariant: IVariantTypePayload;
}

export interface IProductDetailRatingProps {
  rating: number;
  review: number;
  soldCount: number;
}

export interface IDescriptionProps {
  description: string;
}

export interface IItemSummaryProps {
  productId: number;
  productName: string;
  productIsFavorite: boolean;
  productFavoriteCount: number;
  variantGroup: IVariantGroupPayload;
  selectedVariant: IVariantTypePayload;
  shopId: number;
  shopName: string;
  minQty: number;
  maxQty: number;
  onVariantChange: Function;
}

export interface IProductActionProps {
  productId: number;
  isFavorite: boolean;
  favoriteCount: number;
}

export interface IReviewProps {
  productId: number;
  productRating: number;
}

export interface IReviewItemProps {
  review: IProductReviewPayload;
}

export interface IImagePreviewerProps {
  data: IProductPhotoPayload[];
}

export interface IImagePreviewerModalProps {
  data: IProductPhotoPayload[];
  isOpen: boolean;
  onClose: () => void;
  selectedId: number;
}

export interface ISingleImagePreviewerModalProps {
  imageURL: string;
  isOpen: boolean;
  onClose: () => void;
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

export interface IProductDetailVariantProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
  error: boolean;
}

export interface IProductDetailVariantsProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}

export interface IStoreProductListProps {
  shopId: number;
  shopName: string;
  shopUsername: string;
}

export interface ISimilarProductListProps {
  productCategoryId: number;
  productCategoryLevel: number;
}
