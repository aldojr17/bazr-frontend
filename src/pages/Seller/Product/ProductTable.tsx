import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Image,
  Select,
  Spinner,
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
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import useShop from "../../../hooks/useShop";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import { IProductPaginationPayload } from "../../../interfaces/Product";
import routes from "../../../routes/Routes";
import { formatCurrency } from "../../../util/util";

function ProductTable() {
  const navigate = useNavigate();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProductPaginationPayload | null>();
  const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
  const [limit, setLimit] = useState<number>(5);

  const { user } = useUser();
  const { successToast, errorToast } = useToast();

  const { fetchShopProducts } = useProduct();
  const { updateShopProductStatus } = useShop();

  const handleCheckAllProduct = (isChecked: boolean) => {
    setIsCheckedAll((val) => !val);

    if (isChecked) {
      const productIds: number[] = [];
      products?.data.forEach((product) => productIds.push(product.id));
      setCheckedProducts(productIds);
    } else {
      setCheckedProducts([]);
    }
  };

  const handleCheckProduct = (isChecked: boolean, productId: number) => {
    if (isChecked) {
      setCheckedProducts([...checkedProducts, productId]);
      if (checkedProducts.length + 1 === products?.data.length) {
        setIsCheckedAll(true);
      }
    } else {
      setIsCheckedAll(false);
      setCheckedProducts(checkedProducts.filter((val) => val !== productId));
    }
  };

  const handleUpdateStatus = () => {
    if (checkedProducts.length < 1) {
      errorToast("min checked 1 product");
      return;
    }

    setIsLoading(true);
    updateShopProductStatus({
      status: isActive,
      product_ids: checkedProducts,
    })
      .then((res) => {
        if (!res.is_success) {
          errorToast(res.message);
          return;
        }

        successToast(res.message);
        fetchShopProducts(user?.shop_id ?? 0, {
          limit: limit,
          page: 1,
          sort: "desc",
        }).then((res) => {
          handleCheckAllProduct(false);
          setIsCheckedAll(false);
          setProducts(res);
        });
      })
      .catch(() => {
        errorToast("Failed update status");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    fetchShopProducts(user?.shop_id ?? 0, {
      limit: Number(e.currentTarget.value),
      page: 1,
      sort: "desc",
    })
      .then((res) => setProducts(res))
      .finally(() => setIsLoading(false));

    setLimit(Number(e.currentTarget.value));
  };

  const handleNextPage = () => {
    setIsCheckedAll(false);
    setCheckedProducts([]);
    const page = (products?.current_page ?? 0) + 1;
    fetchShopProducts(user?.shop_id ?? 0, {
      limit: limit,
      page: page,
      sort: "desc",
    })
      .then((res) => setProducts(res))
      .finally(() => setIsLoading(false));
  };

  const handlePrevPage = () => {
    setIsCheckedAll(false);
    setCheckedProducts([]);
    const page = (products?.current_page ?? 0) - 1;
    fetchShopProducts(user?.shop_id ?? 0, {
      limit: limit,
      page: page,
      sort: "desc",
    })
      .then((res) => setProducts(res))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchShopProducts(user?.shop_id ?? 0, {
      limit: limit,
      page: 1,
      sort: "desc",
    })
      .then((res) => setProducts(res))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Box border={"1px"} rounded={"md"} borderColor={"gray.300"} p={6} mb={5}>
        <Flex
          alignItems={{ base: "center", md: "center" }}
          justifyContent={{
            base: "center",
            lg: "space-between",
          }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Flex marginEnd={5} alignItems={"center"} mb={{ base: 5, lg: 0 }}>
            <Text me={5} fontWeight={"medium"}>
              Limit
            </Text>
            <Select variant={"outline"} onChange={handleOnChangeLimit}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </Flex>
          <Flex
            alignItems={"center"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex mb={{ base: 5, md: 0 }}>
              <Switch
                me={2}
                colorScheme="teal"
                size="lg"
                alignItems={"start"}
                isChecked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <Text me={8} fontWeight={"medium"}>
                {isActive ? "Active" : "Not Active"}
              </Text>
            </Flex>
            <Button
              isDisabled={isLoading}
              variant={"solid"}
              colorScheme={"purple"}
              px={10}
              onClick={() => handleUpdateStatus()}
            >
              Apply
            </Button>
          </Flex>
        </Flex>
      </Box>
      <TableContainer
        border={"1px"}
        rounded={"md"}
        borderColor={"gray.300"}
        pt={5}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={isCheckedAll}
                  me={5}
                  onChange={(e) =>
                    handleCheckAllProduct(e.currentTarget.checked)
                  }
                ></Checkbox>
              </Th>
              <Th minWidth={"50px"}>Product Name</Th>
              <Th>Variant</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : null}

            {!isLoading && products?.data.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  Empty Data
                </Td>
              </Tr>
            ) : null}

            {!isLoading &&
              products?.data.map((product, index1) =>
                product.variant_group?.variant_types.map((variant, index2) => (
                  <Tr key={`${index1}-${index2}`}>
                    {(product.variant_group?.variant_types.length ?? 0) > 1 ? (
                      index2 === 0 ? (
                        <>
                          <Td
                            rowSpan={
                              product.variant_group?.variant_types.length
                            }
                          >
                            <Checkbox
                              isChecked={checkedProducts.includes(product.id)}
                              onChange={(e) =>
                                handleCheckProduct(
                                  e.currentTarget.checked,
                                  product.id
                                )
                              }
                            />
                          </Td>
                          <Td
                            minWidth={"150px"}
                            maxWidth={"250px"}
                            rowSpan={
                              product.variant_group?.variant_types.length
                            }
                          >
                            <Flex alignItems={"center"}>
                              <Image
                                boxSize="80px"
                                objectFit="cover"
                                marginEnd={4}
                                src={product?.product_photo?.url ?? ""}
                                alt="Product photo"
                              />
                              <Text
                                fontWeight={"medium"}
                                textOverflow={"ellipsis"}
                                noOfLines={1}
                              >
                                {product.name}
                              </Text>
                            </Flex>
                          </Td>
                        </>
                      ) : null
                    ) : (
                      <>
                        <Td>
                          <Checkbox
                            isChecked={checkedProducts.includes(product.id)}
                            onChange={(e) =>
                              handleCheckProduct(
                                e.currentTarget.checked,
                                product.id
                              )
                            }
                          />
                        </Td>
                        <Td minWidth={"150px"} maxWidth={"250px"}>
                          <Flex alignItems={"center"}>
                            <Image
                              boxSize="80px"
                              objectFit="cover"
                              marginEnd={4}
                              src={product?.product_photo?.url ?? ""}
                              alt="Product photo"
                            />
                            <Text
                              fontWeight={"medium"}
                              textOverflow={"ellipsis"}
                              noOfLines={1}
                            >
                              {product.name}
                            </Text>
                          </Flex>
                        </Td>
                      </>
                    )}

                    <Td>{variant.name}</Td>
                    <Td>Rp{formatCurrency(variant.price)}</Td>
                    <Td>{variant.stock}</Td>

                    {(product.variant_group?.variant_types.length ?? 0) > 1 ? (
                      index2 === 0 ? (
                        <>
                          <Td
                            rowSpan={
                              product.variant_group?.variant_types.length
                            }
                          >
                            {product.is_active ? (
                              <Tag colorScheme={"teal"}>Active</Tag>
                            ) : (
                              <Tag colorScheme={"gray"}>Not Active</Tag>
                            )}
                          </Td>
                          <Td
                            rowSpan={
                              product.variant_group?.variant_types.length
                            }
                          >
                            <Tooltip
                              hasArrow
                              label="Edit"
                              bg="gray.300"
                              color="black"
                            >
                              <IconButton
                                mx={1}
                                aria-label="Edit"
                                bgColor={"yellow.300"}
                                icon={<BsPencil />}
                                onClick={() =>
                                  navigate(
                                    routes.SELLER_PRODUCT_EDIT(product.id)
                                  )
                                }
                              />
                            </Tooltip>
                          </Td>
                        </>
                      ) : null
                    ) : (
                      <>
                        <Td>
                          {product.is_active ? (
                            <Tag colorScheme={"teal"}>Active</Tag>
                          ) : (
                            <Tag colorScheme={"gray"}>Not Active</Tag>
                          )}
                        </Td>
                        <Td>
                          <Tooltip
                            hasArrow
                            label="Edit"
                            bg="gray.300"
                            color="black"
                          >
                            <IconButton
                              mx={1}
                              aria-label="Edit"
                              bgColor={"yellow.300"}
                              icon={<BsPencil />}
                              onClick={() =>
                                navigate(routes.SELLER_PRODUCT_EDIT(product.id))
                              }
                            />
                          </Tooltip>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))
              )}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex pt={"5"} justifyContent={"space-between"}>
        <Text>Total {products?.total}</Text>
        <Flex alignItems={"center"}>
          <Button
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
            isDisabled={
              (products?.current_page ?? 0) >= (products?.total_page ?? 0)
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
    </>
  );
}

export default ProductTable;
