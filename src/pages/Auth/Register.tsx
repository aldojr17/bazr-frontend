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
  Link,
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../api/service/auth";
import Icon from "../../assets/icons";
import AuthTemplate from "../../components/Auth/AuthTemplate";
import useTitle from "../../hooks/useTitle";
import useToast from "../../hooks/useToast";
import { IRegisterRequestPayload } from "../../interfaces/Auth";

const Register = () => {
  useTitle("Register | BAZR");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitRegister = async (formData: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    const payload: IRegisterRequestPayload = {
      ...formData,
      isOauth: state ? true : false,
    };

    const response = await authService
      .register(payload)
      .finally(() => setIsLoading(false));

    if (response.is_success) {
      if (state) {
        successToast("Your account has been created!");
        navigate("/");
      } else {
        successToast("Your account has been created! Please log in.");
        navigate("/login");
      }
    } else {
      errorToast("Failed to register", response.message);
    }
  };

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z ]*$/, "Must not contain any number"),
    username: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any space and symbol"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must contain at least 8 characters")
      .matches(
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
      <AuthTemplate>
        <Box textAlign="center">
          <Heading>Sign up</Heading>
          <Text mt={2}>
            Or{" "}
            <Link as={RouterLink} to="/login" color="teal.500">
              sign in now!
            </Link>
          </Text>
        </Box>

        <Box textAlign="left" mt={4}>
          <Formik
            initialValues={{
              name: state ? (state.fullname as string) : "",
              username: "",
              email: state ? (state.email as string) : "",
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
                <FormControl
                  mt={4}
                  isInvalid={!!errors.name && touched.name}
                  isDisabled={state ? true : false}
                >
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
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Field
                    as={Input}
                    name="confirmPassword"
                    type="password"
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
      </AuthTemplate>
    </>
  );
};

export default Register;
