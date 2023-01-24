import { FormikErrors, FormikTouched } from "formik";
import { IProductPayload } from "../Product";

export interface IShopPromotionProductPayload {
  variant_type_id: number;
  product_id: number;
  quota: number;
  benefit: number;
  benefit_percentage: number;
  max_buy_qty: number;
}

export interface IShopPromotionPayload {
  id: number;
  shop_id?: number;
  name: string;
  start_date: string;
  expiry_date: string;
  shop_promotion_products: IShopPromotionProductPayload[];
}

export interface IShopPromotionsResponsePayload {
  is_success: boolean;
  data: IShopPromotionPaginationPayload;
  message: string;
}

export interface IShopPromotionPaginationPayload {
  current_page: number;
  data: IShopPromotionPayload[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IShopPromotionResponsePayload {
  is_success: boolean;
  data: null | IShopPromotionPayload;
  message: string;
}

export interface IPromotionProps {
  title: string;
  id: number;
  name: string;
  start_date: string;
  expiry_date: string;
  product: IPromotionProductForm[];
  isLoading: boolean;
  isDisabled: boolean;
  isEdit?: boolean;
  onSubmit: (payload: IShopPromotionPayload) => void;
  onCancel: () => void;
}

export interface IPromotionVariantForm {
  variant_name: string;
  variant_type_id: number;
  quota: number;
  benefit: number;
  benefit_percentage: number;
  max_buy_qty: number;
  is_active: boolean;
}

export interface IPromotionProductForm {
  id: number;
  name: string;
  in_form: boolean;
  variants: IPromotionVariantForm[];
}

export interface IPromotionForm {
  id: number;
  name: string;
  start_date: string;
  expiry_date: string;
  products: IPromotionProductForm[];
}

export interface IPromotionProductFormProps {
  values: IPromotionForm;
  errors: FormikErrors<IPromotionForm>;
  touched: FormikTouched<IPromotionForm>;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  onDeleteProduct: (productId: number) => void;
}

export interface IPromotionShopProductProps {
  isOpen: boolean;
  isLoading: boolean;
  checkedProduct: IPromotionProductForm[];
  onClose: () => void;
  onConfirm: (products: IPromotionProductForm[]) => void;
}
