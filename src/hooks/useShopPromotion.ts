import { useState } from "react";
import shopPromotionService from "../api/service/shopPromotion";
import { IProductPayload } from "../interfaces/Product";
import {
  IPromotionProductForm,
  IShopPromotionPaginationPayload,
  IShopPromotionPayload,
  IShopPromotionProductPayload,
} from "../interfaces/Promotion";

const useShopPromotion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shopPromotion, setShopPromotion] = useState<IShopPromotionPayload>();
  const [shopPromotions, setShopPromotions] =
    useState<IShopPromotionPaginationPayload>();

  const fetchAllShopPromotions = async (
    status: string,
    page: number,
    limit: number
  ) => {
    setIsLoading(true);
    const response = await shopPromotionService.getAllShopPromotions(
      status,
      page,
      limit
    );
    setIsLoading(false);

    if (response.is_success) {
      setShopPromotions(response.data);
    }

    return response;
  };

  const fetchShopPromotion = async (id: number) => {
    setIsLoading(true);
    const response = await shopPromotionService.getShopPromotion(id);
    setIsLoading(false);

    if (response.is_success) {
      setShopPromotion(response.data);
    }

    return response;
  };

  const addShopPromotion = async (payload: IShopPromotionPayload) => {
    setIsLoading(true);
    const response = await shopPromotionService.postShopPromotion(payload);
    setIsLoading(false);

    return response;
  };

  const updateShopPromotion = async (payload: IShopPromotionPayload) => {
    setIsLoading(true);
    const response = await shopPromotionService.putShopPromotion(payload);
    setIsLoading(false);

    return response;
  };

  const convertVariantProductToProductForm = (
    variantProducts: IShopPromotionProductPayload[]
  ): IPromotionProductForm[] => {
    const newProductForm: IPromotionProductForm[] = [];

    const productGroups = variantProducts.filter(
      (variant, index) =>
        index ===
        variantProducts.findIndex(
          (other) => variant.product_id === other.product_id
        )
    );

    productGroups.forEach((productGroup, index) => {
      newProductForm[index] = {
        id: productGroup.product_id,
        name: productGroup.product_name,
        in_form: true,
        variants: [],
      };

      variantProducts.forEach((val) => {
        if (val.product_id === productGroup.product_id) {
          newProductForm[index].variants.push({
            price: 0,
            benefit: val.benefit,
            benefit_percentage: val.benefit_percentage,
            is_active: true,
            quota: val.quota,
            variant_type_id: val.variant_type_id,
            variant_name: val.variant_type_name,
            max_buy_qty: val.max_buy_qty,
          });
        }
      });
    });

    return newProductForm;
  };

  const addProductVariationFormNotActive = (
    productsForm: IPromotionProductForm[],
    products: IProductPayload[]
  ): IPromotionProductForm[] => {
    const result: IPromotionProductForm[] = [];

    productsForm.forEach((productForm, index) => {
      result[index] = productForm;

      products.forEach((product) => {
        if (product.id === productForm.id) {
          product.variant_group?.variant_types.forEach((variant) => {
            let isAvailable: boolean = false;

            productForm.variants.forEach((variantForm, ind) => {
              if (variant.id === variantForm.variant_type_id) {
                result[index].variants[ind].price = variant.price;
                isAvailable = true;
                return;
              }
            });

            if (!isAvailable) {
              result[index].variants.push({
                price: variant.price,
                benefit: 0,
                benefit_percentage: 0,
                is_active: false,
                max_buy_qty: 0,
                quota: 0,
                variant_name: variant.name,
                variant_type_id: variant.id,
              });
            }
          });
        }
      });
    });

    return result;
  };

  return {
    fetchAllShopPromotions,
    fetchShopPromotion,
    addShopPromotion,
    updateShopPromotion,
    convertVariantProductToProductForm,
    addProductVariationFormNotActive,
    isLoading,
    shopPromotions,
    shopPromotion,
  };
};

export default useShopPromotion;
