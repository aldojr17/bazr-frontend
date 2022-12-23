import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { Field, Formik } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import {
  ILoginGoogleRequestPayload,
  ILoginRequestPayload,
} from "../../interfaces/Auth";
import "./auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmitLogin = async (payload: ILoginRequestPayload) => {
    const response = await authService.login(payload);

    if (response.is_success) {
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } else {
      toast({
        title: "Failed to login",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmitGoogleLogin = async (
    payload: ILoginGoogleRequestPayload
  ) => {
    const response = await authService.loginGoogle(payload);

    if (response.is_success) {
      if (response.data.is_registered) {
        toast({
          title: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } else {
        navigate("/register", { state: response.data });
      }
    } else {
      toast({
        title: "Failed to login",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required"),
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
            <Heading>Sign in to your account</Heading>
            <Text>
              Or{" "}
              <Link as={RouterLink} to="/register" color="teal.500">
                sign up now!
              </Link>
            </Text>
          </Box>

          <Box textAlign="left" my={4}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => {
                handleSubmitLogin(values);
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

                  <Stack isInline justifyContent="end" mt={4}>
                    <Box>
                      <Link color="teal.500">Forgot your password?</Link>
                    </Box>
                  </Stack>

                  <Button variant="primary" width="full" mt={10} type="submit">
                    Sign in
                  </Button>
                </form>
              )}
            </Formik>
          </Box>

          <Box textAlign="center">
            <HStack>
              <Divider
                my={8}
                borderColor="gray.300"
                background="gray.300"
                borderWidth="1px"
              />
              <Text px={5}>or</Text>
              <Divider
                my={8}
                borderColor="gray.300"
                background="gray.300"
                borderWidth="1px"
              />
            </HStack>
            <Center my={3}>
              <GoogleLogin
                onSuccess={(response) => {
                  handleSubmitGoogleLogin({
                    token: (response as any).credential,
                  });
                }}
                type="standard"
                shape="circle"
                theme="outline"
                text="signin_with"
              />
            </Center>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
