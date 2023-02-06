import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import sealabsPayService from "../../api/service/sealabspay";
import useSealabsPay from "../../hooks/useSealabsPay";
import useToast from "../../hooks/useToast";
import { ISealabsPayAddNewAccountProps } from "../../interfaces/Components";
import { ISealabsPayAddNewPayload } from "../../interfaces/SealabsPay";
import SealabsPayOTP from "../IFrame/SealabsPayOTP";

const SealabsPayAddNewAccountModal = ({
  ...props
}: ISealabsPayAddNewAccountProps) => {
  const { getSealabsPay, setChosenSealabsPay } = useSealabsPay();
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

  const addSealabsPayValidationSchema = Yup.object().shape({
    name_on_card: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z ]*$/, "Must not contain any number"),
    card_number: Yup.string()
      .required("Required")
      .length(16, "Length must be 16 characters")
      .matches(/^[0-9]+$/, "Must be only digits"),
  });

  const { successToast, errorToast, infoToast } = useToast();

  const handleSubmitAddSealabsPay = async (
    formData: Omit<ISealabsPayAddNewPayload, "redirect_url">
  ) => {
    setIsLoading(true);

    const payload: ISealabsPayAddNewPayload = {
      ...formData,
      redirect_url: `${window.location.origin}/sealabs_pay/redirect`,
    };

    const response = await sealabsPayService
      .postNewSealabsPay(payload)
      .finally(() => setIsLoading(false));

    if (response.is_success) {
      infoToast("Please enter the OTP");
      setIframeUrl(response.data);
    } else {
      if ((response as unknown as string) === "user:insufficient-fund") {
        errorToast("Insufficient balance, please top up!");
      } else if ((response as unknown as string) === "user:not-found") {
        errorToast("Invalid SeaLabs Pay account");
      } else {
        errorToast(
          "Failed to add your Sealabs Pay account. \n ",
          response as unknown as string
        );
      }
    }
  };

  useEffect(() => {
    if (redirectParams.status === "TXN_PAID") {
      successToast("Your new sealabs pay account is added!");
      props.onClose();
      getSealabsPay().then((res) => {
        if (res) {
          setChosenSealabsPay(res[res.length - 1]);
        }
      });
    } else if (redirectParams.status === "TXN_FAILED") {
      errorToast(
        "Failed to create your new sealabs pay account. \n " +
          redirectParams.message
      );
    }
  }, [redirectParams]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={{ base: "full", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please fill your card details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="info">
            <AlertIcon />
            At least have Rp. 1000 from your account to add.
          </Alert>
          <Formik
            initialValues={{
              name_on_card: "",
              card_number: "",
            }}
            validationSchema={addSealabsPayValidationSchema}
            onSubmit={(values) => {
              handleSubmitAddSealabsPay(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  mt={4}
                  isInvalid={!!errors.name_on_card && touched.name_on_card}
                >
                  <FormLabel>Name On Card</FormLabel>
                  <Field
                    as={Input}
                    name="name_on_card"
                    type="text"
                    placeholder="Enter your name on card"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.name_on_card}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={4}
                  isInvalid={!!errors.card_number && touched.card_number}
                >
                  <FormLabel>Card Number</FormLabel>
                  <Field
                    as={Input}
                    name="card_number"
                    type="text"
                    placeholder="Enter your card number"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.card_number}</FormErrorMessage>
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
        </ModalBody>

        <ModalFooter>
          <Button variant={"outline"} onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SealabsPayAddNewAccountModal;
