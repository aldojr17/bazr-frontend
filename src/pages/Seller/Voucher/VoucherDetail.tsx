import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVoucher from "../../../hooks/useVoucher";
import routes from "../../../routes/Routes";
import VoucherForm from "./VoucherForm";

function VoucherDetail() {
  const { voucherLoading, voucher, fetchVoucher } = useVoucher();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVoucher(Number(id));
  }, []);

  return (
    <>
      <VoucherForm
        title="Detail Voucher"
        id={voucher?.id ?? 0}
        code={voucher?.code ?? ""}
        name={voucher?.name ?? ""}
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
        isDisabled={true}
        isLoading={voucherLoading}
        onSubmit={() => {}}
        onCancel={() => {
          navigate(routes.SELLER_VOUCHER);
        }}
      />
    </>
  );
}

export default VoucherDetail;
