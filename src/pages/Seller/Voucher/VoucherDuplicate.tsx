import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useShop from "../../../hooks/useShop";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import useVoucher from "../../../hooks/useVoucher";
import { IVoucherPayload } from "../../../interfaces/Voucher";
import routes from "../../../routes/Routes";
import VoucherForm from "./VoucherForm";

function VoucherDuplicate() {
  const { fetchProfile } = useUser();
  const { fetchShopProfileById } = useShop();
  const [username, setUsername] = useState("");
  const { voucherLoading, voucher, createVoucher, fetchVoucher } = useVoucher();
  const { successToast, errorToast } = useToast();
  const { id } = useParams();
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
    fetchVoucher(Number(id));
    getUsernameShop();
  }, []);

  return (
    <>
      <VoucherForm
        title="Duplicate Voucher"
        id={voucher?.id ?? 0}
        name={voucher?.name ?? ""}
        code={username}
        quota={voucher?.quota ?? 0}
        benefit={voucher?.benefit ?? 0}
        benefit_percentage={voucher?.benefit_percentage ?? 0}
        min_purchase={voucher?.min_purchase ?? 0}
        start_date={
          voucher?.start_date
            ? dayjs(voucher?.start_date).format("YYYY-MM-DDTHH:mm")
            : ""
        }
        expiry_date={
          voucher?.expiry_date
            ? dayjs(voucher?.expiry_date).format("YYYY-MM-DDTHH:mm")
            : ""
        }
        isDisabled={false}
        isLoading={voucherLoading}
        onSubmit={(payload) => handleSubmitCreateVoucher(payload)}
        onCancel={() => {
          navigate(routes.SELLER_VOUCHER);
        }}
      />
    </>
  );
}

export default VoucherDuplicate;
