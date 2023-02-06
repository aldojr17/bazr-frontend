import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  IVoucherFormProps,
  IVoucherPayload,
} from "../../../interfaces/Voucher";

function VoucherForm(props: IVoucherFormProps) {
  const [voucherCode, setVoucherCode] = useState({
    prefix: "",
    code: "",
  });

  const voucherValidationSchema = Yup.object().shape({
    code: Yup.string().min(1).max(5).required("Required"),
    quota: Yup.number().min(1).required("Required"),
    benefit: Yup.number().min(0),
    benefit_percentage: Yup.number()
      .min(0)
      .max(99)
      .when("benefit", {
        is: (benefit: number) => benefit > 0,
        then: (b) =>
          b.test(
            "benefit_percentage",
            "fill in one of the benefit or benefit percentage fields",
            (value) => value === undefined || value === 0
          ),
      })
      .when("benefit", {
        is: (benefit: number) => benefit === 0 || benefit === undefined,
        then: (b) =>
          b.test(
            "benefit_percentage",
            "fill in one of the benefit or benefit percentage fields",
            (value) => value !== undefined && value !== 0
          ),
      }),
    min_purchase: Yup.number().min(0).required("Required"),
    start_date: Yup.date().required("Required"),
    expiry_date: Yup.date()
      .required("Required")
      .min(
        Yup.ref("start_date"),
        "expiry date must be greater or equal than start date"
      )
      .test(
        "current date",
        "expiry date must be greater or equal than current date",
        (value) => {
          return value !== undefined && value >= new Date();
        }
      ),
  });

  const extractCode = () => {
    if (props.code.length > 5) {
      setVoucherCode({
        prefix: props.code.slice(0, -5),
        code: props.code.slice(-5),
      });
    } else {
      setVoucherCode({
        prefix: props.code.toUpperCase(),
        code: "",
      });
    }
  };

  useEffect(() => {
    extractCode();
  }, [props.code]);

  return (
    <>
      <Card variant={"outline"} rounded={"lg"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              {props.title}
            </Text>
          </Flex>
        </CardHeader>
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: props.id,
            code: voucherCode.code,
            name: props.name,
            quota: props.quota,
            benefit: props.benefit,
            benefit_percentage: props.benefit_percentage,
            min_purchase: props.min_purchase,
            start_date: props.start_date,
            expiry_date: props.expiry_date,
          }}
          validationSchema={voucherValidationSchema}
          onSubmit={(values) => {
            props.onSubmit({
              ...values,
              benefit: Number(values.benefit),
              benefit_percentage: Number(values.benefit_percentage),
              code: values.code.toUpperCase(),
            } as IVoucherPayload);
          }}
        >
          {({ handleSubmit, errors, touched, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      sm: 1,
                      md: 2,
                      xl: 4,
                    }}
                    spacingX={10}
                    spacingY={5}
                  >
                    <FormControl isInvalid={!!errors.code && touched.code}>
                      <FormLabel>Code</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <InputGroup>
                          <InputLeftAddon children={voucherCode.prefix} />
                          <Field
                            as={Input}
                            borderStartRadius={0}
                            type="text"
                            name="code"
                            textTransform="uppercase"
                            maxLength={5}
                            variant={
                              props.isDisabled || props.isEdit
                                ? "filled"
                                : "outline"
                            }
                            _disabled={{
                              opacity: 1,
                            }}
                            isDisabled={props.isDisabled || props.isEdit}
                          />
                        </InputGroup>
                      </Skeleton>
                      <FormErrorMessage>{errors.code}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.quota && touched.quota}>
                      <FormLabel>Quota</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <Field
                          as={Input}
                          type="number"
                          name="quota"
                          variant={props.isDisabled ? "filled" : "outline"}
                          _disabled={{
                            opacity: 1,
                          }}
                          isDisabled={props.isDisabled}
                        />
                      </Skeleton>
                      <FormErrorMessage>{errors.quota}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.benefit && touched.benefit}
                    >
                      <FormLabel>Benefit</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <InputGroup>
                          <InputLeftAddon children="Rp" />
                          <Field
                            as={Input}
                            borderStartRadius={0}
                            type="number"
                            name="benefit"
                            variant={
                              props.isDisabled || values.benefit_percentage > 0
                                ? "filled"
                                : "outline"
                            }
                            _disabled={{
                              opacity: 1,
                            }}
                            isDisabled={
                              props.isDisabled || values.benefit_percentage > 0
                            }
                          />
                        </InputGroup>
                      </Skeleton>
                      <FormErrorMessage>{errors.benefit}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.benefit_percentage &&
                        touched.benefit_percentage
                      }
                    >
                      <FormLabel>Benefit Percentage</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <InputGroup>
                          <Field
                            as={Input}
                            borderEndRadius={0}
                            type="number"
                            name="benefit_percentage"
                            variant={
                              props.isDisabled || values.benefit > 0
                                ? "filled"
                                : "outline"
                            }
                            _disabled={{
                              opacity: 1,
                            }}
                            isDisabled={props.isDisabled || values.benefit > 0}
                          />
                          <InputRightAddon children="%" />
                        </InputGroup>
                      </Skeleton>
                      <FormErrorMessage>
                        {errors.benefit_percentage}
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                  <SimpleGrid
                    pt={5}
                    columns={{
                      base: 1,
                      sm: 1,
                      lg: 3,
                    }}
                    spacingX={10}
                    spacingY={5}
                  >
                    <FormControl
                      isInvalid={!!errors.min_purchase && touched.min_purchase}
                    >
                      <FormLabel>Min Purchase</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <InputGroup>
                          <InputLeftAddon children="Rp" />
                          <Field
                            as={Input}
                            borderStartRadius={0}
                            type="number"
                            name="min_purchase"
                            variant={props.isDisabled ? "filled" : "outline"}
                            _disabled={{
                              opacity: 1,
                            }}
                            isDisabled={props.isDisabled}
                          />
                        </InputGroup>
                      </Skeleton>
                      <FormErrorMessage>{errors.min_purchase}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.start_date && touched.start_date}
                    >
                      <FormLabel>Start Date</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <Field
                          as={Input}
                          type="datetime-local"
                          name="start_date"
                          variant={props.isDisabled ? "filled" : "outline"}
                          _disabled={{
                            opacity: 1,
                          }}
                          isDisabled={props.isDisabled}
                        />
                      </Skeleton>
                      <FormErrorMessage>{errors.start_date}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.expiry_date && touched.expiry_date}
                    >
                      <FormLabel>Expiry Date</FormLabel>
                      <Skeleton isLoaded={!props.isLoading}>
                        <Field
                          as={Input}
                          type="datetime-local"
                          name="expiry_date"
                          variant={props.isDisabled ? "filled" : "outline"}
                          _disabled={{
                            opacity: 1,
                          }}
                          isDisabled={props.isDisabled}
                        />
                      </Skeleton>
                      <FormErrorMessage>{errors.expiry_date}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="gray"
                      onClick={() => props.onCancel()}
                    >
                      Cancel
                    </Button>
                    {props.isDisabled ? null : (
                      <Button
                        variant={"primary"}
                        type="submit"
                        isLoading={props.isLoading}
                      >
                        Save
                      </Button>
                    )}
                  </ButtonGroup>
                </CardFooter>
              </form>
            );
          }}
        </Formik>
      </Card>
    </>
  );
}

export default VoucherForm;
