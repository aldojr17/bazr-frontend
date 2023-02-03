import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Skeleton,
  Switch,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Field, FieldArray, getIn } from "formik";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { IPromotionProductFormProps } from "../../../interfaces/Promotion";
import { formatCurrency } from "../../../util/util";

function PromotionProductForm(props: IPromotionProductFormProps) {
  return (
    <>
      <Skeleton isLoaded={!props.isLoading}>
        <TableContainer
          border={"1px"}
          rounded={"lg"}
          borderColor={"gray.200"}
          py={3}
        >
          <Table variant={"unstyled"}>
            <Thead>
              <Tr>
                <Th>Variant</Th>
                <Th isNumeric>Quota</Th>
                <Th isNumeric>Benefit</Th>
                <Th isNumeric>Benefit percentage</Th>
                <Th isNumeric>Max Buy</Th>
                <Th>Active</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <FieldArray
                name={"products"}
                render={(arrayHelpers1) => {
                  return (
                    <>
                      {props.values.products.length === 0 ? (
                        <Tr>
                          <Td colSpan={7} textAlign={"center"}>
                            Empty Data
                          </Td>
                        </Tr>
                      ) : null}

                      {props.values.products.map((product, index1) => (
                        <React.Fragment key={index1}>
                          <Tr bgColor={"gray.100"}>
                            <Td colSpan={6}>{product.name}</Td>
                            <Td>
                              {props.isDisabled ? null : (
                                <Tooltip label="Delete Product">
                                  <IconButton
                                    aria-label="Delete"
                                    bgColor={"red"}
                                    icon={<BsTrash />}
                                    onClick={() => {
                                      props.onDeleteProduct(product.id);
                                      arrayHelpers1.remove(index1);
                                    }}
                                  />
                                </Tooltip>
                              )}
                            </Td>
                          </Tr>
                          <FieldArray
                            name={`products.${index1}.variants`}
                            render={() => {
                              return (
                                <>
                                  {product.variants.map((variant, index2) => (
                                    <Tr key={index2}>
                                      <Td verticalAlign={"top"}>
                                        <Text my={3}>
                                          {variant.variant_name}{" "}
                                          <Tag colorScheme={"gray"}>
                                            Rp
                                            {formatCurrency(variant.price)}
                                          </Tag>
                                        </Text>
                                      </Td>
                                      <Td
                                        verticalAlign={"top"}
                                        isNumeric
                                        alignItems={"start"}
                                      >
                                        <FormControl
                                          isInvalid={
                                            !!getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.quota`
                                            ) &&
                                            getIn(
                                              props.touched,
                                              `products.${index1}.variants.${index2}.quota`
                                            )
                                          }
                                        >
                                          <Field
                                            as={Input}
                                            type="number"
                                            name={`products.${index1}.variants.${index2}.quota`}
                                            variant={
                                              props.isDisabled ||
                                              !props.values.products[index1]
                                                .variants[index2].is_active
                                                ? "filled"
                                                : "outline"
                                            }
                                            _disabled={{
                                              opacity: 1,
                                            }}
                                            isDisabled={
                                              props.isDisabled ||
                                              !props.values.products[index1]
                                                .variants[index2].is_active
                                            }
                                          />
                                          <FormErrorMessage>
                                            {getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.quota`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Td>
                                      <Td verticalAlign={"top"} isNumeric>
                                        <FormControl
                                          isInvalid={
                                            !!getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.benefit`
                                            ) &&
                                            getIn(
                                              props.touched,
                                              `products.${index1}.variants.${index2}.benefit`
                                            )
                                          }
                                        >
                                          <InputGroup>
                                            <InputLeftAddon children="Rp" />
                                            <Field
                                              as={Input}
                                              type="number"
                                              name={`products.${index1}.variants.${index2}.benefit`}
                                              minWidth={"150px"}
                                              borderStartRadius={0}
                                              variant={
                                                props.isDisabled ||
                                                !props.values.products[index1]
                                                  .variants[index2].is_active ||
                                                props.values.products[index1]
                                                  .variants[index2]
                                                  .benefit_percentage > 0
                                                  ? "filled"
                                                  : "outline"
                                              }
                                              _disabled={{
                                                opacity: 1,
                                              }}
                                              isDisabled={
                                                props.isDisabled ||
                                                !props.values.products[index1]
                                                  .variants[index2].is_active ||
                                                props.values.products[index1]
                                                  .variants[index2]
                                                  .benefit_percentage > 0
                                              }
                                            />
                                          </InputGroup>
                                          <FormErrorMessage>
                                            {getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.benefit`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Td>
                                      <Td verticalAlign={"top"} isNumeric>
                                        <FormControl
                                          isInvalid={
                                            !!getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.benefit_percentage`
                                            ) &&
                                            getIn(
                                              props.touched,
                                              `products.${index1}.variants.${index2}.benefit_percentage`
                                            )
                                          }
                                        >
                                          <InputGroup>
                                            <Field
                                              as={Input}
                                              type="number"
                                              min={0}
                                              max={100}
                                              borderEndRadius={0}
                                              name={`products.${index1}.variants.${index2}.benefit_percentage`}
                                              variant={
                                                props.isDisabled ||
                                                !props.values.products[index1]
                                                  .variants[index2].is_active ||
                                                props.values.products[index1]
                                                  .variants[index2].benefit > 0
                                                  ? "filled"
                                                  : "outline"
                                              }
                                              _disabled={{
                                                opacity: 1,
                                              }}
                                              isDisabled={
                                                props.isDisabled ||
                                                !props.values.products[index1]
                                                  .variants[index2].is_active ||
                                                props.values.products[index1]
                                                  .variants[index2].benefit > 0
                                              }
                                            />
                                            <InputRightAddon children="%" />
                                          </InputGroup>
                                          <FormErrorMessage>
                                            {getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.benefit_percentage`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Td>
                                      <Td verticalAlign={"top"} isNumeric>
                                        <FormControl
                                          isInvalid={
                                            !!getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.max_buy_qty`
                                            ) &&
                                            getIn(
                                              props.touched,
                                              `products.${index1}.variants.${index2}.max_buy_qty`
                                            )
                                          }
                                        >
                                          <Field
                                            as={Input}
                                            type="number"
                                            name={`products.${index1}.variants.${index2}.max_buy_qty`}
                                            variant={
                                              props.isDisabled ||
                                              !props.values.products[index1]
                                                .variants[index2].is_active
                                                ? "filled"
                                                : "outline"
                                            }
                                            _disabled={{
                                              opacity: 1,
                                            }}
                                            isDisabled={
                                              props.isDisabled ||
                                              !props.values.products[index1]
                                                .variants[index2].is_active
                                            }
                                          />
                                          <FormErrorMessage>
                                            {getIn(
                                              props.errors,
                                              `products.${index1}.variants.${index2}.max_buy_qty`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Td>
                                      <Td verticalAlign={"top"}>
                                        <Switch
                                          my={1}
                                          size="lg"
                                          name={`products.${index1}.variants.${index2}.is_active`}
                                          isDisabled={props.isDisabled}
                                          isChecked={
                                            props.values.products[index1]
                                              .variants[index2].is_active
                                          }
                                          onChange={(e) => {
                                            props.handleChange(e);
                                          }}
                                        />
                                      </Td>
                                    </Tr>
                                  ))}
                                </>
                              );
                            }}
                          ></FieldArray>
                        </React.Fragment>
                      ))}
                    </>
                  );
                }}
              ></FieldArray>
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </>
  );
}

export default PromotionProductForm;
