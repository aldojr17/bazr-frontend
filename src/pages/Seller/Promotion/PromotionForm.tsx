import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import * as Yup from "yup";
import useToast from "../../../hooks/useToast";
import {
  IPromotionBulkForm,
  IPromotionForm,
  IPromotionProductForm,
  IPromotionProps,
  IShopPromotionPayload,
  IShopPromotionProductPayload,
} from "../../../interfaces/Promotion";
import PromotionBulkForm from "./PromotionBulkForm";
import PromotionProductForm from "./PromotionProductForm";
import PromotionShopProduct from "./PromotionShopProduct";

function PromotionForm(props: IPromotionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { errorToast } = useToast();
  const [checked, setChecked] = useState<IPromotionProductForm[]>([]);

  const promotionValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
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
    products: Yup.array().of(
      Yup.object().shape({
        variants: Yup.array().of(
          Yup.object().shape({
            quota: Yup.number().when("is_active", {
              is: true,
              then: Yup.number()
                .min(1, "Must be greater than 0")
                .required("Required"),
            }),
            benefit: Yup.number().lessThan(
              Yup.ref("price"),
              `benefit must be less than price`
            ),
            benefit_percentage: Yup.number().when("is_active", {
              is: true,
              then: Yup.number()
                .min(0, "min 0 and max 100")
                .max(100, "min 0 and max 100")
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
                  is: (benefit: number) =>
                    benefit === 0 || benefit === undefined,
                  then: (b) =>
                    b.test(
                      "benefit_percentage",
                      "fill in one of the benefit or benefit percentage fields",
                      (value) => value !== undefined && value !== 0
                    ),
                }),
            }),
            max_buy_qty: Yup.number().when("is_active", {
              is: true,
              then: Yup.number().required("Required"),
            }),
          })
        ),
      })
    ),
  });

  const initialPromotionForm: IPromotionForm = {
    id: props.id,
    name: props.name,
    start_date: props.start_date,
    expiry_date: props.expiry_date,
    products: props.product,
  };

  const handleAddProduct = (
    setValues: (
      values: React.SetStateAction<IPromotionForm>,
      shouldValidate?: boolean | undefined
    ) => void,
    values: IPromotionForm,
    products: IPromotionProductForm[]
  ) => {
    let newProducts: IPromotionProductForm[] = [];

    products.forEach((product) => {
      if (product.in_form === false) {
        newProducts.push({ ...product, in_form: true });
      }
    });

    setValues({ ...values, products: [...values.products, ...newProducts] });
    setChecked([...checked, ...newProducts]);
    onClose();
  };

  const handleDeleteProduct = (productId: number) => {
    setChecked(checked.filter((product) => product.id !== productId));
  };

  const handleSubmitForm = (values: IPromotionForm) => {
    const shopPromotionProducts: IShopPromotionProductPayload[] = [];

    values.products.forEach((product) => {
      product.variants.forEach((variant) => {
        if (variant.is_active) {
          const shopPromotionProduct: IShopPromotionProductPayload = {
            product_id: product.id,
            product_name: product.name,
            variant_type_id: variant.variant_type_id,
            variant_type_name: variant.variant_name,
            benefit: Number(variant.benefit),
            benefit_percentage: Number(variant.benefit_percentage),
            max_buy_qty: variant.max_buy_qty,
            quota: variant.quota,
          };
          shopPromotionProducts.push(shopPromotionProduct);
        }
      });
    });

    const payload: IShopPromotionPayload = {
      id: values.id,
      name: values.name,
      start_date: values.start_date,
      expiry_date: values.expiry_date,
      shop_promotion_products: shopPromotionProducts,
    };

    if (payload.shop_promotion_products.length <= 0) {
      errorToast("Required product promotion min 1 active");
      return;
    }

    props.onSubmit(payload);
  };

  const handleBulkUpdate = (
    valBulk: IPromotionBulkForm,
    isError: boolean,
    valPromo: IPromotionForm,
    setValues: (
      values: React.SetStateAction<IPromotionForm>,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    if (isError) {
      return;
    }

    let newProducts: IPromotionProductForm[] = [];
    valPromo.products.forEach((product, indexPrduct) => {
      newProducts[indexPrduct] = {
        ...product,
        variants: [],
      };

      product.variants.forEach((variant, indexVariant) => {
        newProducts[indexPrduct].variants[indexVariant] = variant;
        if (variant.is_active) {
          newProducts[indexPrduct].variants[indexVariant] = {
            ...variant,
            quota:
              typeof valBulk.quota !== "number" ? variant.quota : valBulk.quota,
            benefit:
              typeof valBulk.benefit !== "number" ||
              variant.benefit_percentage > 0
                ? variant.benefit
                : valBulk.benefit,
            benefit_percentage:
              typeof valBulk.benefit_percentage !== "number" ||
              variant.benefit > 0
                ? variant.benefit_percentage
                : valBulk.benefit_percentage,
            max_buy_qty:
              typeof valBulk.max_buy_qty !== "number"
                ? variant.max_buy_qty
                : valBulk.max_buy_qty,
          };
        }
      });
    });

    setValues({
      ...valPromo,
      products: newProducts,
    });
  };

  useEffect(() => {
    setChecked(props.product);
  }, [props.product]);

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
          initialValues={initialPromotionForm}
          validationSchema={promotionValidationSchema}
          onSubmit={(values) => {
            handleSubmitForm(values);
          }}
        >
          {({ handleChange, setValues, errors, touched, values }) => {
            return (
              <>
                <Form>
                  <CardBody>
                    <SimpleGrid
                      columns={{
                        base: 1,
                        sm: 1,
                        md: 3,
                      }}
                      spacingX={10}
                      spacingY={5}
                    >
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Skeleton isLoaded={!props.isLoading}>
                          <Field
                            as={Input}
                            type="text"
                            name="name"
                            variant={props.isDisabled ? "filled" : "outline"}
                            isDisabled={props.isDisabled}
                            _disabled={{
                              opacity: 1,
                            }}
                          />
                        </Skeleton>
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
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
                            isDisabled={props.isDisabled}
                            _disabled={{
                              opacity: 1,
                            }}
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
                            isDisabled={props.isDisabled}
                            _disabled={{
                              opacity: 1,
                            }}
                          />
                        </Skeleton>
                        <FormErrorMessage>
                          {errors.expiry_date}
                        </FormErrorMessage>
                      </FormControl>
                    </SimpleGrid>
                    <Divider my={10} />

                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      flexDirection={{
                        base: "column",
                        sm: "row",
                      }}
                      my={5}
                    >
                      <Text fontWeight={"medium"} fontSize={"lg"}>
                        Product Promotion
                      </Text>
                      {props.isDisabled ? null : (
                        <Button
                          leftIcon={<BsPlusCircle />}
                          variant={"outline"}
                          isDisabled={props.isDisabled}
                          onClick={onOpen}
                        >
                          Add Product
                        </Button>
                      )}
                    </Flex>

                    {!props.isDisabled ? (
                      <PromotionBulkForm
                        onSubmit={(valBulk, isError) =>
                          handleBulkUpdate(valBulk, isError, values, setValues)
                        }
                      />
                    ) : null}

                    <PromotionProductForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      isLoading={props.isLoading}
                      isDisabled={props.isDisabled}
                      handleChange={handleChange}
                      onDeleteProduct={(productId) =>
                        handleDeleteProduct(productId)
                      }
                    />
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
                </Form>

                <PromotionShopProduct
                  isLoading={false}
                  isOpen={isOpen}
                  checkedProduct={checked}
                  onClose={onClose}
                  onConfirm={(products) => {
                    handleAddProduct(setValues, values, products);
                  }}
                />
              </>
            );
          }}
        </Formik>
      </Card>
    </>
  );
}

export default PromotionForm;
