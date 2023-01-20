import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { Field, FieldProps, Formik } from "formik";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import Icon from "../../assets/icons";
import useTitle from "../../hooks/useTitle";
import useToast from "../../hooks/useToast";
import {
  ILoginGoogleRequestPayload,
  ILoginRequestPayload,
} from "../../interfaces/Auth";

const Login = () => {
  useTitle("Login | BAZR");
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitLogin = async (payload: ILoginRequestPayload) => {
    setIsLoading(true);
    const response = await authService
      .login(payload)
      .finally(() => setIsLoading(false));

    if (response.is_success) {
      successToast("Welcome back!");
      navigate("/");
    } else {
      errorToast("Failed to login", response.message);
    }
  };

  const handleSubmitGoogleLogin = async (
    payload: ILoginGoogleRequestPayload
  ) => {
    const response = await authService.loginGoogle(payload);

    if (response.is_success) {
      if (response.data.is_registered) {
        successToast("Welcome back!");
        navigate("/");
      } else {
        navigate("/register", { state: response.data });
      }
    } else {
      errorToast("Failed to login", response.message);
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <>
      <Box textAlign="center">
        <Heading>Sign in to your account</Heading>
        <Text mt={2}>
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

              <Stack isInline justifyContent="end" mt={4}>
                <Box>
                  <Link color="teal.500" href="/reset-request">
                    Forgot your password?
                  </Link>
                </Box>
              </Stack>

              <Button
                variant="primary"
                width="full"
                mt={10}
                type="submit"
                isLoading={isLoading}
              >
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
    </>
  );
};

export default Login;
