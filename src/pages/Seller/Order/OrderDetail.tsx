import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  SimpleGrid,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { BsArrowLeft, BsClockFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import useShopOrder from "../../../hooks/useShopOrder";
import useUser from "../../../hooks/useUser";
import {
  IDeliveryStatusTaracking,
  IShopOrderDetailPayload,
} from "../../../interfaces/Order";
import routes from "../../../routes/Routes";
import { formatCurrency } from "../../../util/util";
import OrderTracking from "./OrderTracking";

function OrderDetail() {
  const { user } = useUser();
  const { isLoading, shopOrder, fetchShopOrder } = useShopOrder();
  const { id } = useParams();
  const navigate = useNavigate();
  const deliveryStatus = [
    "Waiting for Seller",
    "Cancelled",
    "Processed",
    "On Delivery",
    "Delivered",
    "Received",
    "Refunded",
    "Completed",
  ];

  const getCurrentStatus = (status: string): IDeliveryStatusTaracking[] => {
    const index = deliveryStatus.findIndex((val) => val === status);
    let currStatus: IDeliveryStatusTaracking[] = [];

    deliveryStatus.forEach((val, ind) => {
      if (ind <= index) {
        currStatus.push({
          status: val,
          isActive: true,
        });
      } else {
        currStatus.push({
          status: val,
          isActive: false,
        });
      }
    });

    return currStatus;
  };

  const totalProduct = (orders: IShopOrderDetailPayload[]): number => {
    let totalProduct = 0;
    orders.forEach((order) => {
      totalProduct += order.quantity;
    });
    return totalProduct;
  };

  useEffect(() => {
    fetchShopOrder(user?.shop_id ?? 0, Number(id));
  }, []);

  return (
    <>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Detail Order
            </Text>

            <Button
              leftIcon={<BsArrowLeft />}
              variant={"primary"}
              onClick={() => navigate(routes.SELLER_ORDER)}
            >
              Back
            </Button>
          </Flex>
        </CardHeader>

        <CardBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <AccordionButton py="4">
                <Text fontSize="lg" fontWeight={"medium"}>
                  Transaction
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4}>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 1,
                    md: 2,
                    lg: 4,
                  }}
                  spacingX={10}
                  spacingY={5}
                  pb={5}
                >
                  <FormControl>
                    <FormLabel>Order ID</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={shopOrder?.order_id}
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Courier</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={shopOrder?.delivery_detail.courier_name}
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Transaction Date</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.transaction_date
                            ? dayjs(
                                shopOrder?.transaction_detail.transaction_date
                              ).format("YYYY-MM-DD hh:mmA")
                            : ""
                        }
                      />
                    </Skeleton>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Payment</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={shopOrder?.transaction_detail.payment_method}
                      />
                    </Skeleton>
                  </FormControl>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton py="4">
                <Text fontSize="lg" fontWeight={"medium"}>
                  Address
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4}>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 1,
                    md: 4,
                  }}
                  spacingX={10}
                  spacingY={5}
                  pb={5}
                >
                  <FormControl>
                    <FormLabel>Recipient</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.recipient_name
                        }
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.recipient_phone
                        }
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Zip Code</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={shopOrder?.transaction_detail.address.zip_code}
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Province</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.province_name
                        }
                      />
                    </Skeleton>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 1,
                    md: 3,
                  }}
                  spacingX={10}
                  spacingY={5}
                  pb={5}
                >
                  <FormControl>
                    <FormLabel>District Ward</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.district_ward
                        }
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sub District</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.sub_district
                        }
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Street Name</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.address.street_name
                        }
                      />
                    </Skeleton>
                  </FormControl>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton py="4">
                <Text fontSize="lg" fontWeight={"medium"}>
                  Voucher
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4}>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 1,
                    md: 3,
                  }}
                  spacingX={10}
                  spacingY={5}
                  pb={5}
                >
                  <FormControl>
                    <FormLabel>Voucher Code</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={shopOrder?.transaction_detail.voucher.code ?? ""}
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Voucher Benefit</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <Input
                        variant={"filled"}
                        _disabled={{
                          opacity: 1,
                        }}
                        isDisabled={true}
                        value={
                          shopOrder?.transaction_detail.voucher.benefit ?? ""
                        }
                      />
                    </Skeleton>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Benefit Percentage</FormLabel>
                    <Skeleton isLoaded={!isLoading}>
                      <InputGroup>
                        <Input
                          variant={"filled"}
                          _disabled={{
                            opacity: 1,
                          }}
                          isDisabled={true}
                          value={
                            shopOrder?.transaction_detail.voucher
                              .benefit_percentage ?? ""
                          }
                        />
                        <InputRightAddon children="%" />
                      </InputGroup>
                    </Skeleton>
                  </FormControl>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton py="4">
                <Text fontSize="lg" fontWeight={"medium"}>
                  Product
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4}>
                <Skeleton isLoaded={!isLoading}>
                  <TableContainer>
                    <Table variant={"striped"}>
                      <Thead>
                        <Tr>
                          <Th>Produk</Th>
                          <Th>Variant</Th>
                          <Th>Quantity</Th>
                          <Th>Price</Th>
                          <Th>Notes</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {shopOrder?.order_details.map((product, index) => (
                          <Tr key={index}>
                            <Td>{product.product_name}</Td>
                            <Td>{product.variant_type_name}</Td>
                            <Td>{product.quantity}</Td>
                            <Td>Rp{formatCurrency(product.total)}</Td>
                            <Td>{product.notes}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Skeleton>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton py="4">
                <Text fontSize="lg" fontWeight={"medium"}>
                  Tracking
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4}>
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 1,
                    lg: 2,
                  }}
                  spacingX={10}
                  spacingY={5}
                  alignItems={"center"}
                >
                  <List spacing={3}>
                    {getCurrentStatus(shopOrder?.order_status ?? "").map(
                      (val, ind) => {
                        if (val.isActive === true) {
                          return (
                            <OrderTracking
                              key={ind}
                              status="complete"
                              text={val.status}
                            />
                          );
                        }
                        return (
                          <OrderTracking
                            key={ind}
                            status="process"
                            text={val.status}
                          />
                        );
                      }
                    )}
                  </List>
                  <Flex justifyItems={"center"} alignItems={"center"}>
                    <Icon
                      as={BsClockFill}
                      color={"primary"}
                      boxSize={{ sm: "30px", lg: "70px" }}
                      me={5}
                    />
                    <Box justifyContent={"center"}>
                      <Text fontSize={"xl"} fontWeight={"medium"}>
                        Estimated Delivery Date
                      </Text>
                      <Text fontSize={"xl"} fontWeight={"medium"}>
                        {dayjs(shopOrder?.estimated_delivery_date).format(
                          "DD MMMM YYYY"
                        )}
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Flex justifyContent={"end"} mt={10}>
            <Box>
              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 1,
                  md: 2,
                }}
                justifyContent={"end"}
                spacingX={10}
                spacingY={2}
                fontSize={"xl"}
              >
                <Text>
                  Total Item ({totalProduct(shopOrder?.order_details ?? [])}{" "}
                  Products)
                </Text>
                <Text fontWeight={"medium"} textColor={"green"} textAlign="end">
                  {formatCurrency(shopOrder?.subtotal ?? 0)}
                </Text>
                <Text>Delivery fee</Text>
                <Text fontWeight={"medium"} textColor={"green"} textAlign="end">
                  {formatCurrency(shopOrder?.delivery_detail.delivery_fee ?? 0)}
                </Text>
                <GridItem colSpan={2}>
                  <Divider />
                </GridItem>
                <Text>Total</Text>
                <Text fontWeight={"medium"} textColor={"green"} textAlign="end">
                  {formatCurrency(shopOrder?.total ?? 0)}
                </Text>
              </SimpleGrid>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export default OrderDetail;
