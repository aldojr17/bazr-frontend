import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";
import {
  IProductPaginationPayload,
  IProductPayload,
} from "../../../interfaces/Product";
import {
  IPromotionProductForm,
  IPromotionShopProductProps,
  IPromotionVariantForm,
} from "../../../interfaces/promotion";
import { formatCurrency } from "../../../util/util";

function PromotionShopProduct(props: IPromotionShopProductProps) {
  const { getShopProducts } = useProduct();
  const [products, setProducts] = useState<IProductPaginationPayload>();
  const [checked, setChecked] = useState<IPromotionProductForm[]>([]);

  const isChecked = (productId: number): boolean => {
    return checked.some((product) => product.id === productId);
  };

  const isCheckedDisabled = (productId: number): boolean => {
    return checked.some(
      (product) => product.id === productId && product.in_form
    );
  };

  const handleCheckProduct = (isChecked: boolean, product: IProductPayload) => {
    const productForm = convertProductToProductForm(product);
    if (isChecked) {
      setChecked([...checked, productForm]);
    } else {
      setChecked(checked.filter((item) => item.id !== product.id));
    }
  };

  const convertProductToProductForm = (
    product: IProductPayload,
    inForm: boolean = false
  ): IPromotionProductForm => {
    const newVariants = product.variant_group?.variant_types.map((variant) => {
      return {
        variant_type_id: variant.id,
        variant_name: variant.name,
        benefit: 0,
        benefit_percentage: 0,
        is_active: true,
        max_buy_qty: 0,
        quota: 0,
      } as IPromotionVariantForm;
    });

    return {
      id: product.id,
      name: product.name,
      in_form: inForm,
      variants: newVariants,
    } as IPromotionProductForm;
  };

  const handleNextPage = () => {
    const page = (products?.current_page ?? 0) + 1;

    getShopProducts(1, { page: page, limit: 5 }).then((response) =>
      setProducts(response as IProductPaginationPayload)
    );
  };

  const handlePrevPage = () => {
    const page = (products?.current_page ?? 0) - 1;

    getShopProducts(1, { page: page, limit: 5 }).then((response) =>
      setProducts(response as IProductPaginationPayload)
    );
  };

  useEffect(() => {
    getShopProducts(1, { page: 1, limit: 5 }).then((response) =>
      setProducts(response as IProductPaginationPayload)
    );
  }, []);

  useEffect(() => {
    setChecked([...props.checkedProduct]);
  }, [props.checkedProduct]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent rounded={"lg"}>
          <ModalHeader>Choose Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Name</Th>
                    <Th>Unit Sold</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products?.data.map((product, index) => (
                    <Tr key={index}>
                      <Td>
                        <Checkbox
                          isDisabled={isCheckedDisabled(product.id)}
                          isChecked={isChecked(product.id)}
                          onChange={(event) =>
                            handleCheckProduct(event.target.checked, product)
                          }
                        ></Checkbox>
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>{product.unit_sold}</Td>
                      <Td>
                        Rp{formatCurrency(product.lowest_price)}- Rp
                        {formatCurrency(product.lowest_price)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Flex pt={"5"} justifyContent={"space-between"} mb={5}>
                <Text fontSize={"sm"}>Total {products?.total}</Text>
                <Flex alignItems={"center"}>
                  <Button
                    size={"sm"}
                    isDisabled={(products?.current_page ?? 0) <= 1}
                    fontWeight={"normal"}
                    onClick={() => {
                      handlePrevPage();
                    }}
                  >
                    Prev
                  </Button>
                  <Text px={3}>
                    {products?.current_page} of {products?.total_page}
                  </Text>
                  <Button
                    size={"sm"}
                    isDisabled={
                      (products?.current_page ?? 0) >=
                      (products?.total_page ?? 0)
                    }
                    fontWeight={"normal"}
                    onClick={() => {
                      handleNextPage();
                    }}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </TableContainer>
          </ModalBody>
          <ModalFooter justifyContent={"end"}>
            <Button variant="ghost" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"red"}
              isLoading={props.isLoading}
              onClick={() => props.onConfirm(checked)}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PromotionShopProduct;
