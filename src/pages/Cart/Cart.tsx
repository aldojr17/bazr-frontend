import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  RenderProps,
  Text,
  ToastId,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import StoreListItem from "../../components/Card/StoreListItem";
import CartItem from "../../components/Cart/CartItem";
import Toast from "../../components/Toast/Toast";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import useTitle from "../../hooks/useTitle";
import { ICartPayload } from "../../interfaces/Cart";
import { ICheckoutOrderPayload } from "../../interfaces/Transaction";
import routes from "../../routes/Routes";
import { formatCurrency } from "../../util/util";

const Cart = () => {
  useTitle("Cart | BAZR");
  const {
    cart,
    setCheckoutData,
    deleteCart,
    deleteItem,
    undoDeleteItem,
    setCheckoutCartIds,
  } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();
  const { createCheckout } = useOrder();

  const [undoDelete, setUndoDelete] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<
    Record<number | string, boolean>
  >({});
  const [formattedCart, setFormattedCart] = useState<
    Record<number, Record<number, ICartPayload>>
  >({});
  const [checkoutCartState, setCheckoutCartState] = useState<ICartPayload[]>(
    []
  );
  const [total, setTotal] = useState<number>(0);

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setCheckoutCartState(cart);
    } else {
      setCheckoutCartState([]);
    }
  };

  const handleSelectFromShop = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.currentTarget.checked) {
      setCheckoutCartState([
        ...checkoutCartState,
        ...cart.filter((val) => val.shop_id === id),
      ]);
    } else {
      setCheckoutCartState(
        checkoutCartState.filter((val) => val.shop_id !== id)
      );
    }
  };

  const handleSelectItem = (
    event: ChangeEvent<HTMLInputElement>,
    id: number,
    shopId: number
  ) => {
    if (event.currentTarget.checked) {
      setCheckoutCartState([
        ...checkoutCartState,
        cart.find((val) => val.cart_id === id && val.shop_id === shopId)!,
      ]);
    } else {
      setCheckoutCartState(
        checkoutCartState.filter(
          (val) => val.cart_id !== id && val.shop_id !== shopId
        )
      );
    }
  };

  const handleBuyNow = async () => {
    let orders: ICheckoutOrderPayload[] = [];
    let ids: number[] = [];

    checkoutCartState.forEach((value) => {
      if (
        orders.length === 0 ||
        orders.findIndex((val) => val.shop_id === value.shop_id) === -1
      ) {
        orders = [
          ...orders,
          {
            shop_id: value.shop_id,
            order_details: [
              {
                cart_id: value.cart_id,
              },
            ],
          },
        ];
      } else {
        orders
          .find((val) => val.shop_id === value.shop_id)
          ?.order_details.push({
            cart_id: value.cart_id,
          });
      }

      ids.push(value.cart_id);
    });

    const response = await createCheckout({
      orders: orders,
    });
    if (response.is_success) {
      setCheckoutData(response.data);
      setCheckoutCartIds(ids);
      navigate(routes.CART_SHIPMENT, { replace: true });
    }
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(id);
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast({
      description: "Item deleted.",
      duration: 3000,
      position: "top",
      onCloseComplete: () => {
        deleteCart(id);
      },
      render: (renderProps: RenderProps) => (
        <Toast
          description={renderProps.description}
          isUpdated={false}
          onClick={() => setUndoDelete(true)}
        />
      ),
    });
  };

  useEffect(() => {
    if (toastIdRef.current && undoDelete) {
      undoDeleteItem();
      toast.update(toastIdRef.current, {
        description: "Success undo delete item.",
        duration: 3000,
        position: "top",
        onCloseComplete: () => {},
        render: (renderProps: RenderProps) => (
          <Toast
            description={renderProps.description}
            isUpdated={true}
            onClick={() => toast.close(toastIdRef.current!)}
          />
        ),
      });
      setUndoDelete(false);
    }
  }, [undoDelete]);

  useEffect(() => {
    let newIsSelected: Record<number | string, boolean> = {
      all: cart.length !== 0 ? checkoutCartState.length === cart.length : false,
    };

    Object.keys(formattedCart).forEach((key) => {
      newIsSelected[key] =
        checkoutCartState.filter((val) => val.shop_id === parseInt(key))
          .length === Object.values(formattedCart[parseInt(key)]).length;
    });

    let newTotal = checkoutCartState.reduce(
      (acc, val) => acc + val.variant_type_price * val.quantity,
      0
    );

    setTotal(newTotal);
    setIsSelected({
      ...newIsSelected,
    });
  }, [checkoutCartState]);

  useEffect(() => {
    if (cart.length !== 0) {
      let newFormattedCart: Record<number, Record<number, ICartPayload>> = {};

      cart.forEach((val) => {
        newFormattedCart[val.shop_id] = {
          ...newFormattedCart[val.shop_id],
          [val.cart_id]: val,
        };
      });

      setFormattedCart(newFormattedCart);
    }
  }, [cart]);

  return (
    <Container maxW="container.xl">
      <Box
        px={{
          base: "1em",
          sm: "2em",
          md: "3em",
          lg: "4em",
          xl: "4em",
        }}
        py={{
          base: "1em",
          sm: "1.5em",
          md: "2em",
          lg: "2.5em",
          xl: "4em",
        }}
      >
        {cart.length !== 0 ? (
          <>
            <Heading
              pb={3}
              size={{
                base: "md",
                sm: "lg",
              }}
            >
              Cart
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
                    <HStack justifyContent={"space-between"}>
                      <Checkbox
                        isChecked={isSelected["all"]}
                        onChange={handleSelectAll}
                        textTransform={"uppercase"}
                        fontWeight={"extrabold"}
                        spacing={4}
                        colorScheme={"default"}
                      >
                        Select All
                      </Checkbox>
                      <Button
                        variant={"unstyled"}
                        color={"primary"}
                        fontSize={"xs"}
                        visibility={
                          checkoutCartState.length !== 0 ? "initial" : "hidden"
                        }
                      >
                        Clear cart
                      </Button>
                    </HStack>
                    <Divider />
                  </Box>

                  {Object.entries(formattedCart).map(([key, val], index) => (
                    <Box key={key} width={"100%"}>
                      <Box width={"100%"}>
                        <HStack alignItems={"start"} gap={2}>
                          <Checkbox
                            isChecked={isSelected[key]}
                            onChange={(event) =>
                              handleSelectFromShop(event, parseInt(key))
                            }
                            mt={1}
                            colorScheme={"default"}
                          />
                          <StoreListItem
                            shopName={Object.values(val).at(0)?.shop_name!}
                            shopCityName={Object.values(val).at(0)?.city_name!}
                          />
                        </HStack>

                        <VStack>
                          {Object.values(val).map((childVal, childIndex) => (
                            <Box key={childVal.cart_id} width={"100%"}>
                              <CartItem
                                handleSelectItem={handleSelectItem}
                                data={childVal}
                                selectedCart={
                                  checkoutCartState.findIndex(
                                    (val) => val.cart_id === childVal.cart_id
                                  ) !== -1
                                }
                                handleDeleteItem={handleDeleteItem}
                              />
                              {childIndex < Object.values(val).length - 1 && (
                                <Divider borderBottomWidth={"0.1em"} />
                              )}
                            </Box>
                          ))}
                        </VStack>
                      </Box>
                      {index < Object.entries(formattedCart).length && (
                        <Divider />
                      )}
                    </Box>
                  ))}
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
                <VStack boxShadow={"md"} p={4} spacing={5} borderRadius={"lg"}>
                  <Button
                    variant={"outline"}
                    width={"100%"}
                    borderRadius={"lg"}
                  >
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <Text fontWeight={"semibold"}>Select Voucher</Text>
                      <Icon.ChevronRight />
                    </HStack>
                  </Button>

                  <Divider />

                  <Text
                    fontWeight={"bold"}
                    textAlign={"start"}
                    width={"100%"}
                    textTransform={"uppercase"}
                  >
                    Order Summary
                  </Text>

                  <VStack alignItems={"start"} width="100%" spacing={0}>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"sm"}
                        color={"gray.500"}
                      >
                        Total Price (Item)
                      </Text>
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"sm"}
                        color={"gray.500"}
                      >
                        Rp{formatCurrency(total)}
                      </Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"sm"}
                        color={"gray.500"}
                      >
                        Total Discount Item(s)
                      </Text>
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"sm"}
                        color={"gray.500"}
                      >
                        Rp{formatCurrency(0)}
                      </Text>
                    </HStack>
                  </VStack>

                  <Divider borderBottomWidth={"0.1em"} />

                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                    fontWeight={"bold"}
                    textAlign={"start"}
                  >
                    <Text textTransform={"uppercase"}>Grand Total</Text>
                    <Text color={"primary"}>Rp{formatCurrency(total)}</Text>
                  </HStack>

                  <Button
                    borderRadius={"lg"}
                    width={"100%"}
                    shadow={"none"}
                    onClick={handleBuyNow}
                    variant={"primary"}
                    isDisabled={checkoutCartState.length === 0}
                  >
                    Checkout ({checkoutCartState.length})
                  </Button>
                </VStack>
              </GridItem>
            </Grid>

            <Box
              background={"white"}
              position={"fixed"}
              right={0}
              bottom={0}
              left={0}
              p={5}
              borderTop="1px"
              borderColor={"primary"}
              display={{
                base: "block",
                sm: "block",
                md: "block",
                lg: "none",
                xl: "none",
              }}
            >
              <VStack spacing={5}>
                <Button variant={"outline"} width={"100%"} borderRadius={"lg"}>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Icon.Plus />
                    <Text fontWeight={"semibold"}>Select Voucher</Text>
                    <Icon.ChevronRight />
                  </HStack>
                </Button>
                <HStack width={"100%"} justifyContent={"space-between"}>
                  <VStack alignItems={"start"}>
                    <Text>Total Price</Text>
                    <HStack spacing={0}>
                      <Text fontWeight={"semibold"}>
                        Rp{formatCurrency(total)}
                      </Text>
                      <IconButton
                        size={"md"}
                        aria-label="chevron up"
                        variant={"ghost"}
                        icon={<Icon.ChevronUp />}
                        onClick={onOpen}
                      />
                    </HStack>
                  </VStack>
                  <Button
                    borderRadius={"lg"}
                    shadow={"none"}
                    onClick={handleBuyNow}
                    variant={
                      checkoutCartState.length === 0
                        ? "basicOutline"
                        : "primary"
                    }
                    isDisabled={checkoutCartState.length === 0}
                  >
                    Buy ({checkoutCartState.length})
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>Shopping summary</DrawerHeader>
                <DrawerBody>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Text>Total Price (Item)</Text>
                    <Text>Rp{formatCurrency(total)}</Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Text>Total Discount Item(s)</Text>
                    <Text>Rp{formatCurrency(0)}</Text>
                  </HStack>
                </DrawerBody>
                <DrawerFooter borderTopWidth={"1px"}>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                    fontWeight={"semibold"}
                  >
                    <Text>Grand Total</Text>
                    <Text>Rp{formatCurrency(total)}</Text>
                  </HStack>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Center>
            <VStack>
              <Text>Your Cart is Empty</Text>
              <Button
                borderRadius={"lg"}
                shadow={"none"}
                color="white"
                onClick={() => navigate(routes.HOME, { replace: true })}
              >
                Shop Now
              </Button>
            </VStack>
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
