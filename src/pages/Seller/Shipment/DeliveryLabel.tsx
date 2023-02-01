import { Button } from "@chakra-ui/react";
import DeliveryLabelTemplate from "./DeliveryLabelTemplate";
import { BsPrinter } from "react-icons/bs";

import { useReactToPrint } from "react-to-print";
import { useEffect, useRef } from "react";
import useShopOrder from "../../../hooks/useShopOrder";
import useUser from "../../../hooks/useUser";
import { useParams } from "react-router-dom";

function DeliveryLabel() {
  const componentRef = useRef<HTMLDivElement>(null);
  const { shopOrder, fetchShopOrder } = useShopOrder();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "bazr-order-label-" + shopOrder?.order_id,
  });

  const { user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    fetchShopOrder(user?.shop_id ?? 0, Number(id));
  }, []);

  return (
    <>
      <Button
        leftIcon={<BsPrinter />}
        onClick={handlePrint}
        colorScheme="orange"
        variant="solid"
        my={5}
      >
        Print Delivery Label
      </Button>
      {!shopOrder ? (
        ""
      ) : (
        <DeliveryLabelTemplate
          ref={componentRef}
          shop_id={shopOrder.shop_id}
          order_id={shopOrder.order_id}
          order_status={shopOrder.order_status}
          estimated_delivery_date={shopOrder.estimated_delivery_date}
          transaction_detail={shopOrder.transaction_detail}
          delivery_detail={shopOrder.delivery_detail}
          order_details={shopOrder.order_details}
          voucher={shopOrder.voucher}
          subtotal={shopOrder.subtotal}
          total={shopOrder.total}
        />
      )}
    </>
  );
}

export default DeliveryLabel;
