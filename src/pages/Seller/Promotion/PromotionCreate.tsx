import { useNavigate } from "react-router-dom";
import useShopPromotion from "../../../hooks/useShopPromotion";
import useToast from "../../../hooks/useToast";
import { IShopPromotionPayload } from "../../../interfaces/Promotion";
import routes from "../../../routes/Routes";
import PromotionForm from "./PromotionForm";

function PromotionCreate() {
  const { addShopPromotion, isLoading } = useShopPromotion();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  const handleSubmitCreatePromotion = async (
    payload: IShopPromotionPayload
  ) => {
    const response = await addShopPromotion(payload);
    if (response.is_success) {
      successToast(response.message);
      navigate(routes.SELLER_PROMOTION);
    } else {
      errorToast(response.message);
    }
  };

  return (
    <>
      <PromotionForm
        id={0}
        name={""}
        start_date={""}
        expiry_date={""}
        product={[]}
        isDisabled={false}
        isLoading={isLoading}
        onCancel={() => {
          navigate(routes.SELLER_PROMOTION);
        }}
        onSubmit={(payload) => {
          handleSubmitCreatePromotion(payload);
        }}
        title={"Create Promotion"}
      />
    </>
  );
}

export default PromotionCreate;
