import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import { IRegisterRequestPayload } from "../../interfaces/Auth";
import "./auth.scss";

const Register = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmitRegister = async (payload: IRegisterRequestPayload) => {
    const response = await authService.register(payload);

    if (response.is_success) {
      toast({
        title: "Welcome! Your account has been created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (state) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      toast({
        title: "Failed to register",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any space"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must contain at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must contain at least One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  return (
    <>
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          borderWidth={1}
          borderRadius={4}
          p={10}
          width="full"
          maxWidth="500px"
          textAlign="center"
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Sign up</Heading>
            <Text>
              Or{" "}
              <Link as={RouterLink} to="/login" color="teal.500">
                sign in now!
              </Link>
            </Text>
          </Box>

          <Box textAlign="left" mt={4}>
            <Formik
              initialValues={{
                name: state ? state.fullname as string : "",
                username: "",
                email: state ? state.email as string : "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={registerValidationSchema}
              onSubmit={(values) => {
                handleSubmitRegister(values);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl mt={4} isInvalid={!!errors.name && touched.name} isDisabled={state ? true : false}>
                    <FormLabel>Name</FormLabel>
                    <Field
                      as={Input}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel>Username</FormLabel>
                    <Field
                      as={Input}
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={!!errors.email && touched.email}
                    isDisabled={state ? true : false}
                  >
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
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      !!errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <Field
                      as={Input}
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      variant="filled"
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>

                  <Button variant="primary" width="full" mt={10} type="submit">
                    Sign up
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
