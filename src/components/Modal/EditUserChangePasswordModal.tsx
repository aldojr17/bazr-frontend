import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { Field, FieldProps, Formik } from "formik";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { IEditUserChangePasswordModalProps } from "../../interfaces/Components";
import { IUserChangePasswordPayload } from "../../interfaces/User";
import Icon from "../../assets/icons";
import routes from "../../routes/Routes";

function EditUserChangePasswordModal(props: IEditUserChangePasswordModalProps) {
  const { sendChangePasswordToken, changePassword } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValidationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required("Required")
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must contain at least One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .matches(/^(\S+$)/, "No spaces allowed"),
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must contain at least One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .matches(/^(\S+$)/, "No spaces allowed"),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Password must match"),
  });

  const tokenValidationSchema = Yup.object().shape({
    token: Yup.string().required("Required").length(6),
  });

  const handleSendChangePasswordToken = async (
    payload: IUserChangePasswordPayload
  ) => {
    setIsLoading(true);

    const response = await sendChangePasswordToken(payload);
    if (response.is_success) {
      props.onClose();
      props.tokenModalOnOpen();
      successToast(response.message, 3000);
    } else {
      errorToast(response.message, undefined, 3000);
    }

    setIsLoading(false);
  };

  const handleTokenVerification = async (payload: string) => {
    setIsLoading(true);

    const response = await changePassword(payload);
    if (response.is_success) {
      props.tokenModalOnClose();
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
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={(values) => {
              handleSendChangePasswordToken({
                old_password: values.old_password,
                new_password: values.new_password,
              });
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl
                      isInvalid={!!errors.old_password && touched.old_password}
                    >
                      <FormLabel>Current Password</FormLabel>
                      <Field
                        as={Input}
                        name="old_password"
                        type="password"
                        placeholder="Current Password"
                        variant="filled"
                      >
                        {({ field }: FieldProps) => (
                          <InputGroup size="md">
                            <Input
                              pr="4.5rem"
                              type={showOldPassword ? "text" : "password"}
                              placeholder="Enter password"
                              variant={"filled"}
                              {...field}
                            />
                            <InputRightElement marginEnd={2}>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setShowOldPassword(!showOldPassword)
                                }
                                variant={"link"}
                              >
                                {showOldPassword ? (
                                  <Icon.Hide fill={"darkLighten"} />
                                ) : (
                                  <Icon.Show fill={"darkLighten"} />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        )}
                      </Field>
                      <FormErrorMessage>{errors.old_password}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.new_password && touched.new_password}
                      my={5}
                    >
                      <FormLabel>New Password</FormLabel>
                      <Field
                        as={Input}
                        placeholder="New Password"
                        name="new_password"
                        type="password"
                        variant="filled"
                      >
                        {({ field }: FieldProps) => (
                          <InputGroup size="md">
                            <Input
                              pr="4.5rem"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter password"
                              variant={"filled"}
                              {...field}
                            />
                            <InputRightElement marginEnd={2}>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                variant={"link"}
                              >
                                {showNewPassword ? (
                                  <Icon.Hide fill={"darkLighten"} />
                                ) : (
                                  <Icon.Show fill={"darkLighten"} />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        )}
                      </Field>
                      <FormErrorMessage>{errors.new_password}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.confirm_password && touched.confirm_password
                      }
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <Field
                        as={Input}
                        placeholder="Confirm Password"
                        name="confirm_password"
                        type="password"
                        variant="filled"
                      >
                        {({ field }: FieldProps) => (
                          <InputGroup size="md">
                            <Input
                              pr="4.5rem"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Enter password"
                              variant={"filled"}
                              {...field}
                            />
                            <InputRightElement marginEnd={2}>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                variant={"link"}
                              >
                                {showConfirmPassword ? (
                                  <Icon.Hide fill={"darkLighten"} />
                                ) : (
                                  <Icon.Show fill={"darkLighten"} />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        )}
                      </Field>
                      <FormErrorMessage>
                        {errors.confirm_password}
                      </FormErrorMessage>
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

      <Modal isOpen={props.tokenModalIsOpen} onClose={props.tokenModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification Code</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              token: "",
            }}
            validationSchema={tokenValidationSchema}
            onSubmit={(values) => {
              handleTokenVerification(values.token);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.token && touched.token}>
                      <Field as={Input} placeholder="Code" name="token" />
                      <FormErrorMessage>{errors.token}</FormErrorMessage>
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
                      Change Password
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

export default EditUserChangePasswordModal;
