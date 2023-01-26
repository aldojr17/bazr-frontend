import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { IEditUserEmailModalProps } from "../../interfaces/Components";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import routes from "../../routes/Routes";

function EditUserEmailModal(props: IEditUserEmailModalProps) {
  const { sendEmailVerification, changeEmail } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
  });

  const codeValidationSchema = Yup.object().shape({
    code: Yup.string().required("Required").length(6),
  });

  const handleSendEmailVerification = async (payload: string) => {
    setIsLoading(true);

    const response = await sendEmailVerification(payload);
    if (response.is_success) {
      props.onClose();
      props.codeModalOnOpen();
      successToast(response.message, 3000);
    } else {
      errorToast(response.message, undefined, 3000);
    }

    setIsLoading(false);
  };

  const handleCodeVerification = async (payload: string) => {
    setIsLoading(true);

    const response = await changeEmail(payload);
    if (response.is_success) {
      props.codeModalOnClose();
      props.logoutModalOnOpen();
      successToast(response.message, 3000);
    } else {
      errorToast(response.message, undefined, 3000);
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    destroyCookie(null, "auth");
    localStorage.clear();
    navigate(routes.LOGIN, { replace: true });
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Email</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: props.email,
            }}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => {
              handleSendEmailVerification(values.email);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <Field as={Input} placeholder="Email" name="email" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      type="submit"
                      _hover={{
                        bg: "grey",
                      }}
                      isLoading={isLoading}
                      loadingText="Loading"
                    >
                      Send Verification Code
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal isOpen={props.codeModalIsOpen} onClose={props.codeModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification Code</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={codeValidationSchema}
            onSubmit={(values) => {
              handleCodeVerification(values.code);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.code && touched.code}>
                      <Field as={Input} placeholder="Code" name="code" />
                      <FormErrorMessage>{errors.code}</FormErrorMessage>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      type="submit"
                      _hover={{
                        bg: "grey",
                      }}
                      isLoading={isLoading}
                      loadingText="Loading"
                    >
                      Change Email
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={props.logoutModalIsOpen}
        onClose={props.logoutModalOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>

          <ModalBody>
            <Text>Please sign in again.</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              _hover={{
                bg: "grey",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditUserEmailModal;
