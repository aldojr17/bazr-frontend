import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sealabsPayService from "../../api/service/sealabspay";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import useSealabsPay from "../../hooks/useSealabsPay";
import useToast from "../../hooks/useToast";
import { ISealabsPayPaymentProps } from "../../interfaces/Components";
import { ISealabsPayPaymentPayload } from "../../interfaces/SealabsPay";
import SealabsPayOTP from "../IFrame/SealabsPayOTP";

const SealabsPayPaymentModal: React.FC<ISealabsPayPaymentProps> = ({
  ...props
}) => {
  const { isOpen, onClose, isOrderPlaced, setIsOrderPlaced } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [redirected, setRedirected] = useState(0);
  const [params, setParams] = useState(window.history.state);
  const [redirectParams, setRedirectParams] = useState<{
    message: string;
    status: string;
  }>({
    message: "",
    status: "",
  });

  const navigate = useNavigate();

  const { cart, setCart, deleteCart, checkoutCart } = useCart();

  const { chosenSealabsPay } = useSealabsPay();

  const [iframeUrl, setIframeUrl] = useState("");

  const { successToast, infoToast, errorToast } = useToast();

  const { createCheckout, createTransaction } = useOrder();

  const handleSubmitPaymentSealabsPay = async (
    formData: Omit<ISealabsPayPaymentPayload, "redirect_url">
  ) => {
    setIsLoading(true);

    const payload: ISealabsPayPaymentPayload = {
      ...formData,
      redirect_url: `${window.location.origin}/sealabs_pay/redirect`,
    };

    let txnResponse = await createTransaction({
      payment_method_id: 2,
    });

    if (!txnResponse.is_success) {
      return;
    }

    const res = await sealabsPayService
      .paymentSealabsPay(payload, txnResponse.data!.id)
      .finally(() => setIsLoading(false));

    if (res.is_success) {
      infoToast("Please enter the OTP");
      setIframeUrl(res.data);
    } else {
      if (res.message === "user:insufficient-fund") {
        errorToast("Insufficient balance, please top up!");
        props.onClose();
      } else if (res.message === "user:not-found") {
        errorToast("Invalid SeaLabs Pay account");
        props.onClose();
      } else {
        errorToast("Failed to pay with your sealabs pay. \n ", res.message);
      }
      setIsOrderPlaced(false);
    }
  };

  useEffect(() => {
    if (isOrderPlaced) {
      handleSubmitPaymentSealabsPay(chosenSealabsPay);
    }
  }, [isOrderPlaced]);

  useEffect(() => {
    if (redirectParams.status === "TXN_PAID") {
      successToast("Payment success!");
      cart.forEach((c: { cart_id: number }) => {
        if (checkoutCart.includes(c.cart_id)) {
          deleteCart(c.cart_id);
        }
      });

      var temp = cart.filter((val) => !checkoutCart.includes(val.cart_id));
      setCart(temp);
      navigate("/", { replace: true });
    } else if (redirectParams.status === "TXN_FAILED") {
      errorToast(
        "Failed to pay with your sealabs pay account. \n " +
          redirectParams.message
      );
      navigate("/", { replace: true });
    }
    setIsOrderPlaced(false);
  }, [redirectParams]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please enter your OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {iframeUrl && (
              <SealabsPayOTP
                setRedirectParams={setRedirectParams}
                setIframeUrl={setIframeUrl}
                iframeUrl={iframeUrl}
                setParams={setParams}
                params={params}
                redirected={redirected}
                setRedirected={setRedirected}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SealabsPayPaymentModal;
