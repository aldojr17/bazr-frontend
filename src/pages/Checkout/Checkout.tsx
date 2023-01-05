import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Image,
  Button,
  VStack,
  Divider,
  HStack,
  AspectRatio,
  RadioGroup,
  Radio,
  Select,
  Skeleton,
  Link,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import useTitle from "../../hooks/useTitle";
import useUser from "../../hooks/useUser";
import { ICartPayload } from "../../interfaces/Cart";
import { IUserPayload } from "../../interfaces/User";
import { formatCurrency } from "../../util/util";
import transactionService from "../../api/service/transaction";
import {
  IOrderDetailPayload,
  IOrderPayload,
  ITransactionRequestPayload,
} from "../../interfaces/Transaction";

const Checkout = () => {
  useTitle("Checkout");

  const { checkoutCart } = useCart();
  const { fetchProfile } = useUser();
  const toast = useToast();

  const [formattedCart, setFormattedCart] = useState<
    Record<number, Record<number, ICartPayload>>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserPayload | null>(null);
  const [shopSubtotal, setShopSubtotal] = useState<Record<number, number>>({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [payload, setPayload] = useState<ITransactionRequestPayload>({
    payment_method_id: 0,
    subtotal: 0,
    total: 0,
    orders: [],
  });

  useEffect(() => {
    setIsLoading(true);
    fetchProfile()
      .then((response) => setUser(response))
      .finally(() => setIsLoading(false));

    if (checkoutCart.length !== 0) {
      let newFormattedCart: Record<number, Record<number, ICartPayload>> = {};
      let newShopSubtotal: Record<number, number> = {};
      let total = 0;
      let initialPayload: ITransactionRequestPayload;

      checkoutCart.forEach((val) => {
        newFormattedCart[val.shop_id] = {
          ...newFormattedCart[val.shop_id],
          [val.cart_id]: val,
        };

        newShopSubtotal[val.shop_id] = newShopSubtotal[val.shop_id]
          ? newShopSubtotal[val.shop_id] + val.quantity * val.variant_type_price
          : 0 + val.quantity * val.variant_type_price;

        total += val.quantity * val.variant_type_price;
      });

      setShopSubtotal(newShopSubtotal);
      setFormattedCart(newFormattedCart);
      setGrandTotal(total);

      initialPayload = {
        payment_method_id: paymentMethod,
        subtotal: total,
        total: total + 10000,
        orders: [],
      };

      Object.entries(newFormattedCart).map(([key, val], index) => {
        let orderPayload: IOrderPayload = {
          courier_id: 1,
          delivery_fee: 8000,
          subtotal: 0,
          total: 0,
          shop_id: parseInt(key),
          order_details: [],
        };

        Object.values(val).map((childVal, childIndex) => {
          let orderDetailPayload: IOrderDetailPayload;

          orderDetailPayload = {
            product_id: childVal.product_id!,
            variant_id: childVal.variant_type_id,
            quantity: childVal.quantity,
            total: childVal.variant_type_price * childVal.quantity,
          };

          orderPayload.order_details.push(orderDetailPayload);
        });

        orderPayload.subtotal = newShopSubtotal[parseInt(key)];
        orderPayload.total = orderPayload.subtotal + orderPayload.delivery_fee;

        initialPayload.orders.push(orderPayload);
      });
      setPayload(initialPayload);
    }
  }, [checkoutCart]);

  const handleOrderSubmit = async (payload: ITransactionRequestPayload) => {
    payload.payment_method_id = paymentMethod;

    const response = await transactionService.createTransaction(payload);

    if (response.is_success) {
      toast({
        title: "Successfully created order",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to create order",
        description: response.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      px={{
        base: "1em",
        sm: "2em",
        md: "3em",
        lg: "6em",
        xl: "12em",
      }}
      py={{
        base: "1em",
        sm: "1.5em",
        md: "2em",
        lg: "2.5em",
        xl: "4em",
      }}
    >
      <Heading
        pb={3}
        size={{
          base: "md",
          sm: "lg",
        }}
      >
        Checkout
      </Heading>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={10}
        width="100%"
        mb={{
          base: "7em",
          sm: "6em",
          md: "6em",
          lg: 0,
          xl: 0,
        }}
      >
        <GridItem
          colSpan={{
            base: 3,
            sm: 3,
            md: 3,
            lg: 2,
            xl: 2,
          }}
        >
          <VStack spacing={5}>
            <Box width="100%">
              <Skeleton isLoaded={!isLoading}>
                <VStack alignItems={"flex-start"}>
                  <Divider />
                  <HStack width="100%">
                    <Heading
                      size={{
                        base: "sm",
                        sm: "sm",
                      }}
                      pt="5"
                    >
                      Delivery Address
                    </Heading>
                    <Link
                      color="secondary"
                      href="#"
                      size={{
                        base: "sm",
                        sm: "sm",
                      }}
                      pt="5"
                      pl="5"
                    >
                      Change Address
                    </Link>
                  </HStack>
                  <Text fontSize="sm">
                    {user?.address_detail.recipient_name}
                  </Text>
                  <Text fontSize="sm">
                    {user?.address_detail.recipient_phone}
                  </Text>
                  <Text fontSize="sm" pb="5">
                    {user?.address_detail.street_name}
                    {", "}
                    {user?.address_detail.district_ward}
                    {", "}
                    {user?.address_detail.sub_district}
                    {", "}
                    {user?.address_detail.city_name}
                    {", "}
                    {user?.address_detail.province_name}
                    {", "}
                    {user?.address_detail.zip_code}
                  </Text>
                </VStack>
                <Divider />
              </Skeleton>
            </Box>
            <Box width="100%">
              <Skeleton isLoaded={!isLoading}>
                {Object.entries(formattedCart).map(([key, val], index) => (
                  <Box key={key} width={"100%"}>
                    <Box width={"100%"}>
                      <VStack alignItems={"flex-start"} py="5">
                        <Text as="b">
                          {Object.values(val).at(0)?.shop_name}
                        </Text>
                        <Text>Jakarta Selatan</Text>
                        {Object.values(val).map((childVal, childIndex) => (
                          <Box key={childVal.cart_id} width={"100%"}>
                            <HStack justifyContent={"space-between"} pb={4}>
                              <AspectRatio
                                ratio={1}
                                width={{
                                  base: "5em",
                                  sm: "5em",
                                  md: "6em",
                                  lg: "6em",
                                  xl: "7em",
                                }}
                              >
                                <Image
                                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                  alt="Caffe Latte"
                                />
                              </AspectRatio>
                              <VStack alignItems={"flex-start"} width="40%">
                                <Text>{childVal.product_name}</Text>
                                <Text>{childVal.quantity} item(s)</Text>
                                <Text>
                                  Rp
                                  {formatCurrency(
                                    childVal.variant_type_price *
                                      childVal.quantity
                                  )}
                                </Text>
                              </VStack>
                              <VStack alignItems={"flex-start"} width="40%">
                                <Text fontSize="lg">Courier Option</Text>
                                <Select
                                  bg="primary"
                                  borderColor="primary"
                                  color="white"
                                >
                                  <option style={{ color: "black" }} value="1">
                                    JNE - Regular (Rp8.000)
                                  </option>
                                  <option style={{ color: "black" }} value="2">
                                    Tiki - Regular (Rp8.000)
                                  </option>
                                  <option style={{ color: "black" }} value="3">
                                    Pos Indonesia - Regular (Rp8.000)
                                  </option>
                                </Select>
                                <Text fontSize="sm">
                                  Estimated Delivery 1 Jan - 3 Jan
                                </Text>
                              </VStack>
                            </HStack>
                            <Divider borderBottomWidth={"0.1em"} />
                          </Box>
                        ))}
                        <HStack justifyContent={"space-between"} width="100%">
                          <Text as="b">Subtotal</Text>
                          <Text as="b">
                            Rp
                            {formatCurrency(shopSubtotal[parseInt(key)] + 8000)}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                ))}
              </Skeleton>
            </Box>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={1}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          }}
        >
          <Card>
            <CardBody>
              <Stack spacing="4">
                <Skeleton isLoaded={!isLoading}>
                  <Box>
                    <Heading size="md">Order Summary</Heading>
                    <Divider borderColor={"blue"} />
                  </Box>
                  <Box>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} pt="3">
                      <GridItem>
                        <Text pt="2" fontSize="md">
                          Total Items ({checkoutCart.length} products)
                        </Text>
                      </GridItem>
                      <GridItem>
                        <Text pt="2" fontSize="md" align="right">
                          Rp{formatCurrency(grandTotal)}
                        </Text>
                      </GridItem>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} pb="3">
                      <GridItem>
                        <Text pt="2" fontSize="md">
                          Delivery Fee
                        </Text>
                      </GridItem>
                      <GridItem>
                        <Text pt="2" fontSize="md" align="right">
                          Rp10.000
                        </Text>
                      </GridItem>
                    </Grid>
                    <Divider borderColor={"blue"} borderBottomWidth={"0.1em"} />
                    <HStack
                      width="100%"
                      justifyContent={"space-between"}
                      py={5}
                    >
                      <Text fontSize="md" as="b">
                        Total Payment
                      </Text>
                      <Text fontSize="md" as="b">
                        Rp{formatCurrency(grandTotal + 10000)}
                      </Text>
                    </HStack>
                    <Divider borderColor={"blue"} />
                  </Box>
                  <Box>
                    <RadioGroup
                      defaultValue="1"
                      py={7}
                      onChange={(val: string) => {
                        console.log(val);
                        setPaymentMethod(parseInt(val));
                      }}
                    >
                      <Stack spacing={5}>
                        <Text as="b" fontSize="md">
                          Select Payment Method
                        </Text>
                        <Radio value="1">My Wallet</Radio>
                        <Radio value="2">SeaLabs Pay</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box pt={3}>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      width="100%"
                      onClick={() => {
                        handleOrderSubmit(payload);
                      }}
                      isDisabled={payload.total === 0}
                    >
                      Place Order
                    </Button>
                  </Box>
                </Skeleton>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Checkout;
