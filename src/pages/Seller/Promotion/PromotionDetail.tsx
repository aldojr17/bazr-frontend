import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useShopPromotion from "../../../hooks/useShopPromotion";
import routes from "../../../routes/Routes";
import PromotionForm from "./PromotionForm";

function PromotionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchShopPromotion,
    convertVariantProductToProductForm,
    isLoading,
    shopPromotion,
  } = useShopPromotion();

  useEffect(() => {
    fetchShopPromotion(Number(id));
  }, []);

  return (
    <>
      <PromotionForm
        title={"Detail Promotion"}
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
        product={convertVariantProductToProductForm(
          shopPromotion?.shop_promotion_products ?? []
        )}
        isDisabled={true}
        isLoading={isLoading}
        onCancel={() => {
          navigate(routes.SELLER_PROMOTION);
        }}
        onSubmit={() => {}}
      />
    </>
  );
}

export default PromotionDetail;
