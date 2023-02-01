import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductListItem from "../../components/Card/ProductListItem";
import StoreListItem from "../../components/Card/StoreListItem";
import VoucherCard from "../../components/Card/VoucherCard";
import PaymentPinModal from "../../components/Modal/PaymentPinModal";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import useShipping from "../../hooks/useShipping";
import useTitle from "../../hooks/useTitle";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import useVoucher from "../../hooks/useVoucher";
import useWallet from "../../hooks/useWallet";
import { IPinRequestPayload } from "../../interfaces/Auth";
import { MarketplaceVoucherInitial } from "../../interfaces/InitialState";
import { ICheckoutOrderPayload } from "../../interfaces/Transaction";
import { IUserPayload } from "../../interfaces/User";
import { IMarketplaceVoucherPayload } from "../../interfaces/Voucher";
import { IPaymentWalletRequestPayload } from "../../interfaces/Wallet";
import { formatCurrency } from "../../util/util";
import OrderSummaryCard from "./OrderSummaryCard";
import SealabsPayChooseAccountModal from "../../components/Modal/SealabsPayChooseAccountModal";
import useSealabsPay from "../../hooks/useSealabsPay";
import routes from "../../routes/Routes";
import { IUserAddress } from "../../interfaces/User";
import { ISealabsPayDataResponsePayload } from "../../interfaces/SealabsPay";

const Checkout = () => {
  useTitle("Checkout");

  const {
    cart,
    setCart,
    deleteCart,
    checkoutData,
    setCheckoutData,
    checkoutCart,
  } = useCart();
  const { fetchProfile } = useUser();
  const { errorToast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSealabsPay,
    onOpen: onOpenSealabsPay,
    onClose: onCloseSealabsPay,
  } = useDisclosure();

  const { getSealabsPay, setChosenSealabsPay } = useSealabsPay();
  const voucherModal = useDisclosure();
  const shopVoucherModal = useDisclosure();
  const { verifyPin, createPayment } = useWallet();
  const navigate = useNavigate();
  const { fetchShippingCost } = useShipping();
  const { createCheckout, createTransaction } = useOrder();
  const { getUserAddresses } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserPayload | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [pinInput, setPinInput] = useState("");
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [addressNotif, setAddressNotif] = useState<number>(0);
  const {
    marketplaceVouchers,
    fetchAllMarketplaceVoucher,
    vouchers,
    fetchAllVoucher,
  } = useVoucher();
  const [selectedMarketplaceVoucher, setselectedMarketplaceVoucher] =
    useState<IMarketplaceVoucherPayload>(MarketplaceVoucherInitial);

  const handlePinChange = async (value: string) => {
    if (value.length === 6) {
      let payloadPin: IPinRequestPayload = {
        pin: value,
      };
      const response = await verifyPin(payloadPin);
      if (response.is_success) {
        let txnResponse = await createTransaction({
          payment_method_id: paymentMethod,
        });

        if (!txnResponse.is_success) {
          return;
        }

        let paymentPayload: IPaymentWalletRequestPayload = {
          token: response.data.token,
          user_transaction_id: txnResponse.data!.id,
        };

        let isSuccess = createPayment(paymentPayload);

        if (!isSuccess) {
          return;
        }

        cart.forEach((c) => {
          if (checkoutCart.includes(c.cart_id)) {
            deleteCart(c.cart_id);
          }
        });

        var temp = cart.filter((val) => !checkoutCart.includes(val.cart_id));
        setCart(temp);
        navigate("/", { replace: true });
      } else {
        setPinInput("");
        errorToast("Pin Error", response.message, 3000);
      }
    }
  };

  const handleShippingOption = async (
    courierCode: string,
    shopCity: number,
    totalWeight: number,
    courierId: number,
    shopId: number
  ) => {
    if (checkoutData.address_detail.city_id === 0) {
      errorToast("Please set a delivery address");
      return;
    }

    setIsLoading(true);

    const cost = await fetchShippingCost({
      origin: shopCity.toString(),
      destination: checkoutData.address_detail.city_id.toString(),
      weight: totalWeight,
      courier: courierCode,
    });

    let orders: ICheckoutOrderPayload[];
    orders = checkoutData.cart.map((value) =>
      value.shop_id === shopId
        ? {
            ...value,
            courier_id: courierId,
            delivery_fee: cost.rajaongkir.results[0].costs.find(
              (val) => val.service === "REG" || val.service === "Pos Reguler"
            )?.cost[0].value,
            etd: cost.rajaongkir.results[0].costs.find(
              (val) => val.service === "REG" || val.service === "Pos Reguler"
            )?.cost[0].etd,
          }
        : value
    );

    const response = await createCheckout({
      address_id: addressNotif,
      orders: orders,
      user_voucher_id: selectedMarketplaceVoucher.id,
    });

    if (response.is_success) {
      setCheckoutData(response.data);
      setIsLoading(false);
    } else {
      errorToast(response.message);
      setIsLoading(false);
    }
  };

  const handleGetShopVouchers = async (shopId: number) => {
    const response = await fetchAllVoucher("user", 1, 10, shopId);

    if (response.is_success) {
      shopVoucherModal.onOpen();
    } else {
      errorToast(response.message);
    }
  };

  const handleGetVouchers = async () => {
    const response = await fetchAllMarketplaceVoucher();

    if (response.is_success) {
      voucherModal.onOpen();
    } else {
      errorToast(response.message);
    }
  };

  const handleRemoveShopVoucher = async (shopId: number) => {
    let orders: ICheckoutOrderPayload[];
    orders = checkoutData.cart.map((value) =>
      value.shop_id === shopId
        ? {
            ...value,
            user_shop_voucher_id: 0,
          }
        : value
    );

    const response = await createCheckout({
      address_id: addressNotif,
      orders: orders,
      user_voucher_id: selectedMarketplaceVoucher.id,
    });

    if (response.is_success) {
      setCheckoutData(response.data);
    } else {
      errorToast(response.message);
    }
  };

  const handleSelectShopVoucher = async (shopId: number, voucherId: number) => {
    let orders: ICheckoutOrderPayload[];
    orders = checkoutData.cart.map((value) =>
      value.shop_id === shopId
        ? {
            ...value,
            user_shop_voucher_id: voucherId,
          }
        : value
    );

    const response = await createCheckout({
      address_id: addressNotif,
      orders: orders,
      user_voucher_id: selectedMarketplaceVoucher.id,
    });

    if (response.is_success) {
      setCheckoutData(response.data);
    } else {
      errorToast(response.message);
    }
  };

  const handleSetAddress = async () => {
    if (user?.default_address_id === 0) {
      navigate(routes.PROFILE);
      return;
    }

    const response = await getUserAddresses();

    if (response.is_success) {
      setUserAddresses(response.data);
    } else {
      errorToast(response.message);
    }
  };

  useEffect(() => {
    createCheckout({
      address_id: addressNotif,
      user_voucher_id: selectedMarketplaceVoucher.id,
      orders: checkoutData.cart,
    })
      .then((resp) => setCheckoutData(resp.data))
      .catch((err) => errorToast(err));
  }, [selectedMarketplaceVoucher]);

  useEffect(() => {
    let orders: ICheckoutOrderPayload[];
    orders = checkoutData.cart.map(
      (value) =>
        (value = {
          ...value,
          courier_id: 0,
          delivery_fee: 0,
          etd: "",
        })
    );

    createCheckout({
      address_id: addressNotif,
      user_voucher_id: selectedMarketplaceVoucher.id,
      orders: orders,
    })
      .then((resp) => setCheckoutData(resp.data))
      .catch((err) => errorToast(err));
  }, [addressNotif]);

  useEffect(() => {
    setIsLoading(true);

    fetchProfile()
      .then((response) => {
        setUser(response);
        setPaymentMethod(response?.wallet_detail.is_activated ? 1 : 0);
        getSealabsPay().then((res) =>
          setChosenSealabsPay(
            (res &&
              res.filter(
                (val) => val.id === response?.default_sealabs_pay_id
              )[0]) ||
              ({} as ISealabsPayDataResponsePayload)
          )
        );
        return response?.default_sealabs_pay_id;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container maxW="container.xl">
      <Box
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
                  <VStack alignItems={"flex-start"} spacing={1} pb="3">
                    <Divider />
                    <HStack width="100%" alignItems={"center"} pb={2}>
                      <Text
                        textTransform={"uppercase"}
                        fontWeight={"bold"}
                        pt="5"
                      >
                        Delivery Address
                      </Text>

                      <Popover placement="bottom-end" isLazy offset={[0, 15]}>
                        <PopoverTrigger>
                          <Button
                            variant={"primaryLink"}
                            pt="5"
                            size={"sm"}
                            onClick={handleSetAddress}
                            height={0}
                            _active={{
                              bg: "none",
                            }}
                          >
                            {user?.default_address_id !== 0
                              ? "Change Address"
                              : "Set Address"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          width={"10em"}
                          bg={"gray.100"}
                          borderRadius={"lg"}
                        >
                          <PopoverBody p={0} maxHeight="30%">
                            <VStack
                              width={"100%"}
                              alignItems={"start"}
                              maxHeight="20vh"
                              overflowY={"scroll"}
                            >
                              {userAddresses.map((data) => {
                                return (
                                  <Box
                                    justifyContent={"start"}
                                    width={"100%"}
                                    p={3}
                                    cursor={"pointer"}
                                    fontWeight={"bold"}
                                    fontSize={"sm"}
                                    _hover={{
                                      bg: "light",
                                    }}
                                    onClick={async () => {
                                      setAddressNotif(data.address_id);
                                    }}
                                  >
                                    {data.street_name +
                                      ", " +
                                      data.district_ward}
                                  </Box>
                                );
                              })}
                            </VStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                    {user?.default_address_id !== 0 ? (
                      <>
                        <Text fontSize="md" fontWeight={"bold"}>
                          {checkoutData.address_detail.recipient_name}
                        </Text>
                        <Text
                          fontSize="0.9rem"
                          fontWeight={"bold"}
                          color={"gray.500"}
                        >
                          {checkoutData.address_detail.recipient_phone}
                        </Text>
                        <Text fontSize="sm" fontWeight={"normal"}>
                          {checkoutData.address_detail.street_name}
                          {", "}
                          {checkoutData.address_detail.district_ward}
                        </Text>
                        <Text fontSize="sm" fontWeight={"normal"}>
                          {checkoutData.address_detail.sub_district}
                          {", "}
                          {checkoutData.address_detail.city_name}
                          {", "}
                          {checkoutData.address_detail.province_name}
                          {", "}
                          {checkoutData.address_detail.zip_code}
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                  </VStack>
                  <Divider />
                </Skeleton>
              </Box>
              <Box width="100%">
                <Skeleton isLoaded={!isLoading}>
                  {checkoutData.cart.map((val, index) => (
                    <Box key={val.shop_id} width={"100%"}>
                      <Box width={"100%"}>
                        <VStack
                          alignItems={"flex-start"}
                          pb="2"
                          pt={index === 0 ? "0" : "5"}
                        >
                          {checkoutData.cart.length > 1 ? (
                            <Text
                              fontWeight={"bold"}
                              textTransform={"uppercase"}
                            >
                              Order {index + 1}
                            </Text>
                          ) : (
                            ""
                          )}
                          <StoreListItem
                            shopName={val.shop_name}
                            shopCityName={val.shop_city_name}
                          />
                          {val.order_details.map((childVal, childIndex) => (
                            <>
                              <Box
                                pb={4}
                                pt={childIndex !== 0 ? 3 : 0}
                                width={"100%"}
                              >
                                <ProductListItem
                                  key={childVal.variant_id}
                                  name={childVal.product_name}
                                  qty={childVal.quantity}
                                  total={childVal.total}
                                  variantName={childVal.variant_type_name
                                    .split(",")
                                    .join(", ")}
                                  productPhoto={childVal.product_photo}
                                />
                              </Box>
                              <Divider />
                            </>
                          ))}
                          <Flex
                            width="100%"
                            justifyContent={"space-between"}
                            gap={3}
                            pt={3}
                            pb={5}
                            alignItems={"start"}
                            direction={{ base: "column", sm: "row" }}
                          >
                            <VStack
                              alignItems={"start"}
                              width={{ base: "100% ", sm: "50%" }}
                              spacing={0}
                            >
                              <HStack
                                width={"100%"}
                                justifyContent={"space-between"}
                              >
                                <Text
                                  textTransform={"uppercase"}
                                  fontWeight={"bold"}
                                >
                                  Voucher
                                </Text>
                                <Button
                                  variant={"primaryLink"}
                                  p={0}
                                  height={0}
                                  size={"sm"}
                                  _active={{
                                    bg: "none",
                                  }}
                                  onClick={() =>
                                    val.user_shop_voucher_id !== 0
                                      ? handleRemoveShopVoucher(val.shop_id)
                                      : handleGetShopVouchers(val.shop_id)
                                  }
                                >
                                  {val.user_shop_voucher_id !== 0
                                    ? "Remove Voucher"
                                    : "Select Voucher"}
                                </Button>
                              </HStack>
                              {val.user_shop_voucher_id !== 0 ? (
                                <>
                                  <Text
                                    fontWeight={"semibold"}
                                    color={"darkLighten"}
                                    fontSize={"sm"}
                                  >
                                    {val.shop_voucher_detail.code}
                                  </Text>
                                  <Text
                                    color={"darkDarken"}
                                    pt={2}
                                    fontWeight={"bold"}
                                  >
                                    {val.shop_voucher_detail.benefit !== 0
                                      ? `Rp${formatCurrency(
                                          val.shop_voucher_detail.benefit
                                        )}`
                                      : `${val.shop_voucher_detail.benefit_percentage}%`}
                                  </Text>
                                </>
                              ) : (
                                ""
                              )}
                            </VStack>

                            <Divider
                              orientation={"vertical"}
                              borderWidth={"1px"}
                              height={
                                val.user_shop_voucher_id !== 0 ||
                                val.courier_id !== 0
                                  ? "5em"
                                  : "1.5em"
                              }
                              borderColor={"light"}
                              display={{ base: "none", sm: "block" }}
                            />

                            <Divider
                              orientation={"horizontal"}
                              borderWidth={"1px"}
                              height={"0.5em"}
                              borderColor={"light"}
                              display={{ base: "block", sm: "none" }}
                            />

                            <VStack
                              alignItems={"start"}
                              width={{ base: "100% ", sm: "50%" }}
                              spacing={0}
                            >
                              <HStack
                                width={"100%"}
                                justifyContent={"space-between"}
                              >
                                <Text
                                  textTransform={"uppercase"}
                                  fontWeight={"bold"}
                                >
                                  Shipping
                                </Text>
                                <Popover
                                  placement="bottom-end"
                                  isLazy
                                  offset={[0, 15]}
                                >
                                  <PopoverTrigger>
                                    <Button
                                      variant={"primaryLink"}
                                      p={0}
                                      height={0}
                                      size={"sm"}
                                      _active={{
                                        bg: "none",
                                      }}
                                      disabled={isLoading}
                                    >
                                      {val.courier_id !== 0
                                        ? "Change Courier"
                                        : "Select Courier"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    width={"10em"}
                                    bg={"gray.100"}
                                    borderRadius={"lg"}
                                  >
                                    <PopoverBody p={0}>
                                      <VStack
                                        width={"100%"}
                                        alignItems={"start"}
                                      >
                                        {val.list_couriers.couriers.map(
                                          (courier) => (
                                            <Box
                                              justifyContent={"start"}
                                              width={"100%"}
                                              p={3}
                                              cursor={"pointer"}
                                              fontWeight={"bold"}
                                              fontSize={"sm"}
                                              onClick={() =>
                                                handleShippingOption(
                                                  courier.code,
                                                  val.shop_city,
                                                  val.total_weight,
                                                  val.list_couriers.couriers.find(
                                                    (val) =>
                                                      val.code === courier.code
                                                  )?.id!,
                                                  val.shop_id
                                                )
                                              }
                                              _hover={{
                                                bg: "light",
                                              }}
                                            >
                                              {courier.name}
                                            </Box>
                                          )
                                        )}
                                      </VStack>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </HStack>
                              {val.courier_id !== 0 ? (
                                <>
                                  <Text
                                    fontWeight={"semibold"}
                                    color={"darkLighten"}
                                    fontSize={"sm"}
                                  >
                                    {
                                      val.list_couriers.couriers.find(
                                        (v) => v.id === val.courier_id
                                      )?.name
                                    }{" "}
                                    ({val.etd})
                                  </Text>
                                  <Text
                                    color={"darkDarken"}
                                    pt={2}
                                    fontWeight={"bold"}
                                  >
                                    Rp{formatCurrency(val.delivery_fee)}
                                  </Text>
                                </>
                              ) : (
                                ""
                              )}
                            </VStack>
                          </Flex>
                          <Divider />
                          <Accordion
                            width={"100%"}
                            allowMultiple
                            border={"none"}
                          >
                            <AccordionItem border={"none"}>
                              <AccordionButton
                                px={0}
                                _hover={{
                                  background: "none",
                                }}
                              >
                                <HStack
                                  justifyContent={"space-between"}
                                  width="100%"
                                >
                                  <Text
                                    fontWeight={"bold"}
                                    textTransform={"uppercase"}
                                  >
                                    Total
                                  </Text>
                                  <Text fontWeight={"bold"}>
                                    Rp
                                    {formatCurrency(val.total)}
                                  </Text>
                                </HStack>
                                <AccordionIcon />
                              </AccordionButton>
                              <AccordionPanel px={0}>
                                <HStack
                                  justifyContent={"space-between"}
                                  width="100%"
                                >
                                  <Text
                                    fontWeight={"semibold"}
                                    fontSize={"sm"}
                                    color={"gray.500"}
                                  >
                                    Subtotal
                                  </Text>
                                  <Text
                                    fontWeight={"semibold"}
                                    fontSize={"sm"}
                                    color={"gray.500"}
                                  >
                                    Rp
                                    {formatCurrency(val.subtotal)}
                                  </Text>
                                </HStack>
                                <HStack
                                  justifyContent={"space-between"}
                                  width="100%"
                                  py="2"
                                >
                                  <Text
                                    fontSize={"sm"}
                                    fontWeight={"semibold"}
                                    color={"gray.500"}
                                  >
                                    Delivery Fee
                                  </Text>
                                  <Text
                                    fontSize={"sm"}
                                    fontWeight={"semibold"}
                                    color={"gray.500"}
                                  >
                                    Rp
                                    {formatCurrency(val.delivery_fee)}
                                  </Text>
                                </HStack>
                                <HStack
                                  justifyContent={"space-between"}
                                  width="100%"
                                >
                                  <Text
                                    fontSize={"sm"}
                                    fontWeight={"semibold"}
                                    color={"gray.500"}
                                  >
                                    Discount from shop
                                  </Text>
                                  <Text
                                    fontSize={"sm"}
                                    fontWeight={"semibold"}
                                    color={"gray.500"}
                                  >
                                    Rp
                                    {formatCurrency(val.shop_discount)}
                                  </Text>
                                </HStack>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </VStack>
                      </Box>
                      {index !== checkoutData.cart.length - 1 ? (
                        <Divider />
                      ) : (
                        ""
                      )}
                    </Box>
                  ))}
                </Skeleton>
              </Box>
            </VStack>
          </GridItem>
          <GridItem
            colSpan={{
              base: 3,
              lg: 1,
            }}
            display={{
              base: "block",
              sm: "block",
              md: "block",
              lg: "block",
              xl: "block",
            }}
          >
            <OrderSummaryCard
              isLoading={isLoading}
              user={user!}
              payload={checkoutData}
              onOpen={onOpen}
              onOpenSealabsPay={onOpenSealabsPay}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              getMarketplaceVoucher={handleGetVouchers}
              marketplaceVoucher={selectedMarketplaceVoucher}
              setMarketplaceVoucher={setselectedMarketplaceVoucher}
            />
          </GridItem>
        </Grid>
        <PaymentPinModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          handlePinChange={handlePinChange}
          pinInput={pinInput}
          setPinInput={setPinInput}
        />
        <SealabsPayChooseAccountModal
          isLoading={isLoading}
          isOpen={isOpenSealabsPay}
          onClose={onCloseSealabsPay}
        />
      </Box>

      <Modal
        onClose={voucherModal.onClose}
        isOpen={voucherModal.isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"}>Select Voucher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"100%"} gap={3}>
              {marketplaceVouchers?.filter(
                (val) => checkoutData.subtotal > val.min_purchase
              ).length > 0 ? (
                <VStack width={"100%"}>
                  <Text
                    textAlign={"start"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                    width="100%"
                  >
                    Available Vouchers
                  </Text>
                  <Divider borderColor={"light"} />
                </VStack>
              ) : (
                ""
              )}
              {marketplaceVouchers
                ?.filter((val) => checkoutData.subtotal > val.min_purchase)
                .map((voucher) => (
                  <VoucherCard
                    selectShopVoucher={handleSelectShopVoucher}
                    voucher={voucher}
                    setVoucher={setselectedMarketplaceVoucher}
                    onClose={voucherModal.onClose}
                    isDisabled={false}
                  />
                ))}

              <VStack width={"100%"}>
                {marketplaceVouchers?.filter(
                  (val) => checkoutData.subtotal < val.min_purchase
                ).length > 0 ? (
                  <VStack width={"100%"}>
                    <Text
                      textAlign={"start"}
                      fontWeight={"bold"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                      width="100%"
                    >
                      Unavailable Vouchers
                    </Text>
                    <Divider borderColor={"light"} />
                  </VStack>
                ) : (
                  ""
                )}
              </VStack>
              {marketplaceVouchers
                ?.filter((val) => checkoutData.subtotal < val.min_purchase)
                .map((voucher) => (
                  <VoucherCard
                    selectShopVoucher={handleSelectShopVoucher}
                    voucher={voucher}
                    setVoucher={setselectedMarketplaceVoucher}
                    onClose={voucherModal.onClose}
                    isDisabled={true}
                  />
                ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={voucherModal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        onClose={shopVoucherModal.onClose}
        isOpen={shopVoucherModal.isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"}>Select Voucher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"100%"} gap={3}>
              {vouchers?.data?.filter(
                (val) =>
                  checkoutData.cart.find(
                    (value) => val.shop_id === value.shop_id
                  )?.subtotal! > val.min_purchase
              ).length! > 0 ? (
                <VStack width={"100%"}>
                  <Text
                    textAlign={"start"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                    width="100%"
                  >
                    Available Vouchers
                  </Text>
                  <Divider borderColor={"light"} />
                </VStack>
              ) : (
                ""
              )}
              {vouchers?.data
                ?.filter(
                  (val) =>
                    checkoutData.cart.find(
                      (value) => val.shop_id === value.shop_id
                    )?.subtotal! > val.min_purchase
                )
                .map((voucher) => (
                  <VoucherCard
                    selectShopVoucher={handleSelectShopVoucher}
                    setVoucher={setselectedMarketplaceVoucher}
                    onClose={shopVoucherModal.onClose}
                    shopVoucher={voucher}
                    isDisabled={false}
                  />
                ))}

              {vouchers?.data?.filter(
                (val) =>
                  checkoutData.cart.find(
                    (value) => val.shop_id === value.shop_id
                  )?.subtotal! < val.min_purchase
              ).length! > 0 ? (
                <VStack width={"100%"}>
                  <Text
                    textAlign={"start"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                    width="100%"
                  >
                    Unavailable Vouchers
                  </Text>
                  <Divider borderColor={"light"} />
                </VStack>
              ) : (
                ""
              )}
              {vouchers?.data
                ?.filter(
                  (val) =>
                    checkoutData.cart.find(
                      (value) => val.shop_id === value.shop_id
                    )?.subtotal! < val.min_purchase
                )
                .map((voucher) => (
                  <VoucherCard
                    selectShopVoucher={handleSelectShopVoucher}
                    setVoucher={setselectedMarketplaceVoucher}
                    onClose={shopVoucherModal.onClose}
                    shopVoucher={voucher}
                    isDisabled={true}
                  />
                ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={shopVoucherModal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Checkout;
