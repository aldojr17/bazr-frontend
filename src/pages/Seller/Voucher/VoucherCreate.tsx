import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useShop from "../../../hooks/useShop";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import useVoucher from "../../../hooks/useVoucher";
import { IVoucherPayload } from "../../../interfaces/Voucher";
import routes from "../../../routes/Routes";
import VoucherForm from "./VoucherForm";

function VoucherCreate() {
  const { fetchProfile } = useUser();
  const { fetchShopProfileById } = useShop();
  const [username, setUsername] = useState("");
  const { voucherLoading, createVoucher } = useVoucher();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  const handleSubmitCreateVoucher = async (payload: IVoucherPayload) => {
    const response = await createVoucher(payload);
    if (response.is_success) {
      successToast(response.message);
      navigate(routes.SELLER_VOUCHER);
    } else {
      errorToast(response.message);
    }
  };

  const getUsernameShop = async () => {
    const user = await fetchProfile();
    const response = await fetchShopProfileById(user?.shop_id ?? 0);
    setUsername(response?.username ?? "");
  };

  useEffect(() => {
    getUsernameShop();
  }, []);

  return (
    <>
      <VoucherForm
        title="Create Voucher"
        id={0}
        code={username}
        name=""
        quota={0}
        benefit={0}
        benefit_percentage={0}
        min_purchase={0}
        start_date=""
        expiry_date=""
        isLoading={voucherLoading}
        isDisabled={false}
        onSubmit={(payload) => handleSubmitCreateVoucher(payload)}
        onCancel={() => {
          navigate(routes.SELLER_VOUCHER);
        }}
      />
    </>
  );
}

export default VoucherCreate;
