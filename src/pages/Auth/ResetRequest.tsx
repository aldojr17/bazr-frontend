import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import useToast from "../../hooks/useToast";
import { IResetPasswordRequestPayload } from "../../interfaces/Auth";
import routes from "../../routes/Routes";

function ResetRequest() {
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitResetRequest = async (
    payload: IResetPasswordRequestPayload
  ) => {
    setIsLoading(true);
    const response = await authService
      .resetPassword(payload)
      .finally(() => setIsLoading(false));

    if (response.is_success) {
      successToast(
        "Password request email has been sent! Please check your email."
      );
      navigate(routes.HOME);
    } else {
      errorToast("Failed to login", response.message);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
      <Box textAlign="center">
        <Heading>Reset your password</Heading>
        <Text mt={2}>Request an email reset link</Text>
      </Box>
      <Box textAlign="left" my={4}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmitResetRequest(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel>Email</FormLabel>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  variant="filled"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <Button
                variant="primary"
                width="full"
                my={5}
                type="submit"
                isLoading={isLoading}
              >
                Send link
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box textAlign="center" mt={5}>
        <Text>
          Or{" "}
          <Link as={RouterLink} to="/register" color="teal.500">
            sign up now!
          </Link>
        </Text>
      </Box>
    </>
  );
}

export default ResetRequest;
