import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../assets/icons";
import SealabsPay from "../../assets/icons/SealabsPay";
import SealabsPayPaymentModal from "../../components/Modal/SealabsPayPaymentModal";
import useSealabsPay from "../../hooks/useSealabsPay";
import { IOrderSummaryCardProps } from "../../interfaces/Components";
import { MarketplaceVoucherInitial } from "../../interfaces/InitialState";

import routes from "../../routes/Routes";
import { formatCurrency } from "../../util/util";

const OrderSummaryCard = ({ ...props }: IOrderSummaryCardProps) => {
  const navigate = useNavigate();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { sealabsPay, chosenSealabsPay } = useSealabsPay();
  const [warning, setWarning] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    isOpen: isOpenSp,
    onOpen: onOpenSp,
    onClose: onCloseSp,
  } = useDisclosure();

  const handleRemoveVoucher = () => {
    props.setMarketplaceVoucher(MarketplaceVoucherInitial);
  };

  const handleButtonDisabled = () => {
    if (props.payload.cart.some((val) => val.courier_id === 0)) {
      setWarning("Please choose couriers first before placing order.");
      setIsButtonDisabled(true);
      return;
    }
    if (props.paymentMethod === 0) {
      setWarning("Please choose your payment method.");
      setIsButtonDisabled(true);
      return;
    } else if (props.paymentMethod === 1) {
      if (!props.user.wallet_detail.is_activated) {
        setWarning("You haven't activated your wallet yet.");
        setIsButtonDisabled(true);
        return;
      } else if (props.user.wallet_detail.balance < props.payload.total) {
        setWarning("Insufficient wallet balance. Please top up!");
        setIsButtonDisabled(true);
        return;
      }
    } else if (props.paymentMethod === 2) {
      if (sealabsPay) {
        if (sealabsPay.length < 1) {
          setWarning(
            "You haven't added a sealabs pay account yet. Please add one!"
          );
          setIsButtonDisabled(true);
          return;
        }
      }

      if (chosenSealabsPay.id === 0) {
        setWarning(
          "Please choose one of your sealabs pay account to place order."
        );
        setIsButtonDisabled(true);
        return;
      }
    }
    setWarning("");
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    handleButtonDisabled();
  }, [
    props.payload,
    props.paymentMethod,
    props.user,
    sealabsPay,
    chosenSealabsPay,
  ]);

  return (
    <>
      <Card
        boxShadow={"default"}
        border="2px"
        borderColor={"light"}
        borderRadius={"lg"}
      >
        <CardBody>
          <Stack spacing="4">
            <Skeleton isLoaded={!props.isLoading}>
              {props.marketplaceVoucher.id !== 0 ? (
                <VStack spacing={0}>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                    borderRadius={"lg"}
                    border={"3px solid"}
                    borderColor={"light"}
                    px={3}
                    py={2}
                  >
                    <HStack gap={3} ms={2}>
                      <Icon.Percentage boxSize={6} fill={"darkLighten"} />
                      <Flex direction={"column"} alignItems={"start"}>
                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                          {props.marketplaceVoucher.code}
                        </Text>
                        <Text
                          fontSize={"xs"}
                          fontWeight={"semibold"}
                          color={"darkLighten"}
                        >
                          Disc.{" "}
                          {props.marketplaceVoucher.benefit !== 0
                            ? `Rp${formatCurrency(
                                props.marketplaceVoucher.benefit
                              )}`
                            : `${props.marketplaceVoucher.benefit_percentage}%`}
                        </Text>
                      </Flex>
                    </HStack>
                    <Text
                      color={"primary"}
                      fontWeight={"extrabold"}
                      fontSize={"lg"}
                    >
                      {props.marketplaceVoucher.code}
                    </Text>
                  </HStack>
                  <Button
                    variant={"primaryLink"}
                    _active={{
                      bg: "none",
                    }}
                    alignSelf={"end"}
                    p={0}
                    fontSize={"sm"}
                    onClick={handleRemoveVoucher}
                  >
                    Remove voucher
                  </Button>
                </VStack>
              ) : (
                <Button
                  variant={"outline"}
                  width={"100%"}
                  borderRadius={"lg"}
                  onClick={props.getMarketplaceVoucher}
                  mb={3}
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
              )}
              <Box>
                <Text textTransform={"uppercase"} fontWeight={"bold"} my={3}>
                  Order Summary
                </Text>
                <Divider />
              </Box>
              <Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} pt="3">
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                    >
                      Total Items (
                      {props.payload.total_item > 1
                        ? `${props.payload.total_item} products`
                        : `${props.payload.total_item} product`}
                      )
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                      align="right"
                    >
                      Rp{formatCurrency(props.payload.subtotal)}
                    </Text>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} py="2">
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                    >
                      Total Delivery Fee
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                      align="right"
                    >
                      Rp{formatCurrency(props.payload.total_delivery_fee)}
                    </Text>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} pb="3">
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                    >
                      Total Discount
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                      color={"gray.500"}
                      align="right"
                    >
                      Rp{formatCurrency(props.payload.total_discount)}
                    </Text>
                  </GridItem>
                </Grid>
                <Divider borderBottomWidth={"0.1em"} />
                <HStack width="100%" justifyContent={"space-between"} py={5}>
                  <Text fontWeight={"bold"} textTransform={"uppercase"}>
                    Total Payment
                  </Text>
                  <Text fontWeight={"bold"}>
                    Rp{formatCurrency(props.payload.total)}
                  </Text>
                </HStack>
                <Divider />
              </Box>
              <Box my={5} width="100%">
                <Text pb={3} fontWeight={"bold"}>
                  Select Payment Method
                </Text>
                <Flex
                  justifyContent={"space-around"}
                  direction={{ base: "column", xl: "row" }}
                  gap={{ base: 3, xl: 3 }}
                >
                  <Box
                    border={"2px solid"}
                    borderColor={
                      props.paymentMethod === 1 ? "light" : "primaryLighten"
                    }
                    backgroundColor={
                      props.paymentMethod === 1 ? "teal.100" : "white"
                    }
                    width={{ base: "100%", xl: "11em" }}
                    height={"4em"}
                    as={Button}
                    variant={"paymentMethod"}
                    onClick={() => {
                      props.user.wallet_detail.is_activated
                        ? props.setPaymentMethod(1)
                        : navigate(routes.WALLET);
                    }}
                    justifyContent={"center"}
                  >
                    <Flex
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Icon.Wallet fill={"darkLighten"} boxSize={6} />
                      <VStack alignItems={"start"} spacing={1}>
                        <Text fontWeight={"bold"}>My Wallet </Text>
                        <Text
                          fontSize={"xs"}
                          color={"darkLighten"}
                          fontWeight={"semibold"}
                        >
                          {props.user !== null &&
                          props.user.wallet_detail.is_activated
                            ? `Rp${formatCurrency(
                                props.user?.wallet_detail.balance!
                              )}`
                            : "Activate now!"}
                        </Text>
                      </VStack>
                    </Flex>
                  </Box>
                  <Box
                    border={"2px solid"}
                    borderColor={
                      props.paymentMethod === 2 ? "light" : "primaryLighten"
                    }
                    backgroundColor={
                      props.paymentMethod === 2 ? "teal.100" : "white"
                    }
                    width={{ base: "100%", xl: "11em" }}
                    height={"4em"}
                    px={5}
                    as={Button}
                    variant={"paymentMethod"}
                    onClick={() => {
                      props.setPaymentMethod(2);
                    }}
                  >
                    <Flex
                      // flexWrap={"wrap"}
                      direction={"column"}
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Flex
                        gap={4}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <SealabsPay />
                        <Text fontWeight={"bold"}>SeaLabs Pay</Text>
                      </Flex>
                      <Flex>
                        <Text
                          _hover={{
                            color: "secondary",
                            textDecoration: "underline",
                          }}
                          color={"teal"}
                          onClick={props.onOpenSealabsPay}
                        >
                          {chosenSealabsPay.card_number
                            ? chosenSealabsPay.card_number
                            : "Choose Account"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Box pt={3}>
                {warning && (
                  <Alert mb={4} status="error">
                    <AlertIcon />
                    {warning}
                  </Alert>
                )}
                <Button
                  variant="primary"
                  width="100%"
                  onClick={() => {
                    if (props.paymentMethod === 1) {
                      props.onOpen();
                    } else if (props.paymentMethod === 2) {
                      setIsOrderPlaced(true);
                      onOpenSp();
                    }
                  }}
                  isDisabled={isButtonDisabled}
                >
                  Place Order
                </Button>
              </Box>
            </Skeleton>
          </Stack>
        </CardBody>
      </Card>
      <SealabsPayPaymentModal
        isOpen={isOpenSp}
        onClose={onCloseSp}
        isOrderPlaced={isOrderPlaced}
        setIsOrderPlaced={setIsOrderPlaced}
      />
    </>
  );
};

export default OrderSummaryCard;
