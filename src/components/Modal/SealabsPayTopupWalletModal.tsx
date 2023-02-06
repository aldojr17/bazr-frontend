import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ISealabsPayTopupWalletProps } from "../../interfaces/Components";
import SealabsPayChooseAccountModal from "./SealabsPayChooseAccountModal";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { ISealabsPayTopupPayload } from "../../interfaces/SealabsPay";
import sealabsPayService from "../../api/service/sealabspay";
import useToast from "../../hooks/useToast";
import useSealabsPay from "../../hooks/useSealabsPay";
import useUser from "../../hooks/useUser";
import SealabsPayOTP from "../IFrame/SealabsPayOTP";

const SealabsPayTopupWalletModal = ({
  ...props
}: ISealabsPayTopupWalletProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

  const [redirected, setRedirected] = useState(0);
  const [params, setParams] = useState(window.history.state);
  const [redirectParams, setRedirectParams] = useState<{
    message: string;
    status: string;
  }>({
    message: "",
    status: "",
  });
  const { isOpen, onClose } = props;

  const { chosenSealabsPay } = useSealabsPay();
  const { fetchProfile } = useUser();

  const TopupWalletSealabsPayValidationSchema = Yup.object().shape({
    amount: Yup.number().required("Required").moreThan(1000).min(1000),
  });

  const { successToast, infoToast, errorToast } = useToast();

  const handleSubmitTopUpWalletSealabsPay = async (
    formData: Omit<ISealabsPayTopupPayload, "redirect_url">
  ) => {
    setIsLoading(true);

    const payload: ISealabsPayTopupPayload = {
      ...formData,
      redirect_url: `${window.location.origin}/sealabs_pay/redirect`,
    };

    const res = await sealabsPayService
      .topUpWalletSealabsPay(payload)
      .finally(() => setIsLoading(false));

    if (res.is_success) {
      infoToast("Please enter the OTP");
      setIframeUrl(res.data);
    } else {
      if (res.message === "user:insufficient-fund") {
        errorToast("Insufficient balance, please top up!");
      } else if (res.message === "user:not-found") {
        errorToast("Invalid SeaLabs Pay account");
      } else {
        errorToast("Failed to topup your wallet. \n ", res.message);
      }
    }
  };

  useEffect(() => {
    if (redirectParams.status === "TXN_PAID") {
      successToast("Topup success!");
      props.onClose();
      fetchProfile();
      props.getWalletHistory();
    } else if (redirectParams.status === "TXN_FAILED") {
      errorToast(
        "Failed to topup your wallet. because: " + redirectParams.message
      );
    }
  }, [redirectParams]);
  return (
    <>
      <SealabsPayChooseAccountModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
      >
        <Formik
          initialValues={{
            amount: 1000,
          }}
          validationSchema={TopupWalletSealabsPayValidationSchema}
          onSubmit={(values) => {
            if (chosenSealabsPay.card_number === "") {
              errorToast("Please choose the account first!");
              return;
            }
            handleSubmitTopUpWalletSealabsPay({
              ...values,
              card_number: chosenSealabsPay.card_number,
            });
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl mt={4} isInvalid={!!errors.amount && touched.amount}>
                <FormLabel>Amount</FormLabel>
                <Field
                  as={Input}
                  name="amount"
                  type="number"
                  placeholder="Enter the amount you desire to top up"
                  variant="filled"
                />
                <FormErrorMessage>{errors.amount}</FormErrorMessage>
              </FormControl>

              <Button
                variant="primary"
                width="full"
                mt={10}
                type="submit"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
        {iframeUrl !== "" && (
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
      </SealabsPayChooseAccountModal>
    </>
  );
};

export default SealabsPayTopupWalletModal;
