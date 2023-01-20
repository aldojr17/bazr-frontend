import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import useTitle from "../../hooks/useTitle";
import useToast from "../../hooks/useToast";
import routes from "../../routes/Routes";

const RegisterMerchant = () => {
  useTitle("Merchant Registration | BAZR");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRegister = async (payload: {
    name: string;
    username: string;
  }) => {
    setIsLoading(true);

    const response = await authService
      .registerMerchant(payload)
      .finally(() => setIsLoading(false));
    if (response.is_success) {
      successToast("Your shop account has been created!");
      navigate(routes.SELLER_HOME);
    } else {
      errorToast("Failed to register shop account", response.message);
    }
  };

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z ]*$/, "Must not contain any number"),
    username: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any space and symbol"),
  });

  return (
    <>
      <Box textAlign="center">
        <Heading>Sign up as a Merchant</Heading>
      </Box>

      <Box textAlign="left" mt={4}>
        <Formik
          initialValues={{
            name: "",
            username: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) => {
            handleSubmitRegister(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormControl
                mt={4}
                isInvalid={!!errors.name && touched.name}
                isDisabled={state ? true : false}
              >
                <FormLabel>Shop Name</FormLabel>
                <Field
                  as={Input}
                  name="name"
                  type="text"
                  placeholder="Enter your shop name"
                  variant="filled"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isInvalid={!!errors.username && touched.username}
              >
                <FormLabel>Shop Username</FormLabel>
                <Field
                  as={Input}
                  name="username"
                  type="text"
                  placeholder="Enter your shop username"
                  variant="filled"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <Button
                variant="primary"
                width="full"
                mt={10}
                type="submit"
                isLoading={isLoading}
              >
                Sign up
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RegisterMerchant;
