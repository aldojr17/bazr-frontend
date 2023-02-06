import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import Icon from "../../assets/icons";
import useToast from "../../hooks/useToast";
import { IChangePasswordRequestPayload } from "../../interfaces/Auth";
import routes from "../../routes/Routes";

function ResetRequest() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitResetPassword = async (formValues: {
    password: string;
  }) => {
    setIsLoading(true);
    const payload: IChangePasswordRequestPayload = {
      password: formValues.password,
      token: search.get("code")!,
    };

    const response = await authService
      .changePassword(payload)
      .finally(() => setIsLoading(false));

    if (response.is_success) {
      successToast("Your password has been changed! Please log in again.");
      navigate(routes.LOGIN);
    } else {
      errorToast(
        "Failed to change your password. Please try again",
        response.message
      );
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /* eslint-disable no-useless-escape */
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must contain at least One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .matches(/^(\S+$)/, "No spaces allowed"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  return (
    <>
      <Box textAlign="center">
        <Heading>Reset your password</Heading>
        <Text mt={2}>Set new password</Text>
      </Box>

      <Box textAlign="left" my={4}>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmitResetPassword(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl
                mt={4}
                isInvalid={!!errors.password && touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  variant="filled"
                >
                  {({ field }: FieldProps) => (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        variant={"filled"}
                        {...field}
                      />
                      <InputRightElement marginEnd={2}>
                        <Button
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          variant={"link"}
                        >
                          {showPassword ? (
                            <Icon.Hide fill={"darkLighten"} />
                          ) : (
                            <Icon.Show fill={"darkLighten"} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  )}
                </Field>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Field
                  as={Input}
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  variant="filled"
                >
                  {({ field }: FieldProps) => (
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
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
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                variant="primary"
                width="full"
                my={5}
                type="submit"
                isLoading={isLoading}
              >
                Change Password
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default ResetRequest;
