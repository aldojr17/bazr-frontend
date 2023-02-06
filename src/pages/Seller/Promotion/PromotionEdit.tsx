import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import useShopPromotion from "../../../hooks/useShopPromotion";
import useToast from "../../../hooks/useToast";
import { IProductPayload } from "../../../interfaces/Product";
import {
  IPromotionProductForm,
  IShopPromotionPayload,
  IShopPromotionProductPayload,
} from "../../../interfaces/Promotion";
import routes from "../../../routes/Routes";
import PromotionForm from "./PromotionForm";

function PromotionEdit() {
  const { successToast, errorToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [productsForm, setProductsForm] = useState<IPromotionProductForm[]>([]);
  const { fetchProduct } = useProduct();
  const {
    fetchShopPromotion,
    updateShopPromotion,
    convertVariantProductToProductForm,
    addProductVariationFormNotActive,
    isLoading,
    shopPromotion,
  } = useShopPromotion();

  const handleSubmitEditPromotion = async (payload: IShopPromotionPayload) => {
    const response = await updateShopPromotion(payload);
    if (response.is_success) {
      successToast(response.message);
      navigate(routes.SELLER_PROMOTION);
    } else {
      errorToast(response.message);
    }
  };

  const fetchAllProductsEdit = async (
    productsForm: IPromotionProductForm[]
  ): Promise<IProductPayload[]> => {
    const products: IProductPayload[] = [];

    for (const product of productsForm) {
      const res = await fetchProduct(product.id);
      if (res !== null) {
        products.push(res);
      }
    }

    return products;
  };

  const handleConvertToProductForm = (
    variantProducts: IShopPromotionProductPayload[]
  ) => {
    const productsForm = convertVariantProductToProductForm(variantProducts);

    fetchAllProductsEdit(productsForm).then((resProducts) => {
      const productsFormAllVariation = addProductVariationFormNotActive(
        productsForm,
        resProducts
      );
      setProductsForm(productsFormAllVariation);
    });
  };

  useEffect(() => {
    fetchShopPromotion(Number(id)).then((res) => {
      handleConvertToProductForm(res.data.shop_promotion_products);
    });
  }, []);

  return (
    <>
      <PromotionForm
        id={shopPromotion?.id ?? 0}
        name={shopPromotion?.name ?? ""}
        start_date={
          shopPromotion?.start_date
            ? dayjs(shopPromotion?.start_date).format("YYYY-MM-DDTHH:mm")
            : ""
        }
        expiry_date={
          shopPromotion?.expiry_date
            ? dayjs(shopPromotion?.expiry_date).format("YYYY-MM-DDTHH:mm")
            : ""
        }
        product={productsForm}
        isDisabled={false}
        isLoading={isLoading}
        onCancel={() => {
          navigate(routes.SELLER_PROMOTION);
        }}
        onSubmit={(payload) => {
          handleSubmitEditPromotion(payload);
        }}
        title={"Edit Promotion"}
      />
    </>
  );
}

export default PromotionEdit;
