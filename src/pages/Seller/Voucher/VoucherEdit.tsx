import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import useVoucher from "../../../hooks/useVoucher";
import { IVoucherPayload } from "../../../interfaces/Voucher";
import routes from "../../../routes/Routes";
import VoucherForm from "./VoucherForm";

function VoucherEdit() {
  const { isLoading, voucher, editVoucher, fetchVoucher } = useVoucher();
  const { successToast, errorToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitEditVoucher = async (payload: IVoucherPayload) => {
    const response = await editVoucher(payload);
    if (response.is_success) {
      successToast(response.message);
      navigate(routes.SELLER_VOUCHER);
    } else {
      errorToast(response.message);
    }
  };

  useEffect(() => {
    fetchVoucher(Number(id));
  }, []);

  return (
    <>
      <VoucherForm
        title="Edit Voucher"
        id={voucher?.id ?? 0}
        name={voucher?.name ?? ""}
        code={voucher?.code ?? ""}
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
        isEdit={true}
        isDisabled={false}
        isLoading={isLoading}
        onSubmit={(payload) => handleSubmitEditVoucher(payload)}
        onCancel={() => {
          navigate(routes.SELLER_VOUCHER);
        }}
      />
    </>
  );
}

export default VoucherEdit;
