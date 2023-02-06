import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import TransactionDetailActionButton from "../../components/Button/TransactionDetailActionButton";
import ProductListItem from "../../components/Card/ProductListItem";
import StoreListItem from "../../components/Card/StoreListItem";
import CreateRefundModal from "../../components/Modal/CreateRefundModal";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import {
  CListToShowAddReview,
  CListToShowOrderReceived,
  CListToShowRefund,
} from "../../interfaces/Transaction";
import { IAddUserReviewRequestPayload } from "../../interfaces/User";
import { IWalletTransactionDetail } from "../../interfaces/Wallet";
import routes from "../../routes/Routes";
import { formatCurrency } from "../../util/util";

function TransactionDetails() {
  const {
    setShowTransactionDetail,
    showTransactionDetail,
    fetchTransactionDetail,
  } = useTransactionOrderHistory();
  const { addConfirmUserReceivedOrder, addUserReview } = useUser();
  const [transactionDetails, setTransactionDetails] = useState<
    IWalletTransactionDetail | undefined
  >(undefined);
  const [varToRefetch, setVarToRefetch] = useState(0);
  const { successToast } = useToast();
  const {
    isOpen: isAddReviewModalOpen,
    onOpen: openAddReviewModal,
    onClose: closeAddReviewModal,
  } = useDisclosure();
  const [productOrderIdToReview, setProductOrderIdToReview] = useState(-1);
  const [refundOrderId, setRefundOrderId] = useState(0);
  const {
    isOpen: isRefundOpen,
    onOpen: onRefundOpen,
    onClose: onRefundClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const refetch = () => {
    setVarToRefetch(Math.random());
  };

  useEffect(() => {
    if (showTransactionDetail) {
      fetchTransactionDetail(showTransactionDetail?.transactionId).then(
        (res) => {
          if (res) {
            setTransactionDetails(res);
          }
        }
      );
    }
  }, [isRefundOpen]);

  useEffect(() => {
    const _useEffectAsync = async () => {
      if (showTransactionDetail) {
        const _transactionDetails = await fetchTransactionDetail(
          showTransactionDetail.transactionId
        );
        if (_transactionDetails) {
          setTransactionDetails(_transactionDetails);
        }
      }
    };
    _useEffectAsync();
  }, [showTransactionDetail, varToRefetch]);

  return (
    <Flex direction="column">
      <Text
        role="button"
        onClick={() => setShowTransactionDetail(undefined)}
        variant="outline"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        {"< Back"}
      </Text>
      <Divider borderWidth={1} borderColor={"light"} />
      <Flex
        direction="column"
        marginY={5}
        border={"2px solid"}
        borderColor={"lightLighten"}
        borderRadius="lg"
        padding={5}
      >
        <Grid
          templateColumns={"repeat(2,1fr)"}
          alignItems={"start"}
          gap={10}
          p={5}
        >
          <HStack>
            <Text fontWeight={"bold"} fontSize={"sm"}>
              Transaction ID:
            </Text>
            <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
              {transactionDetails?.id}
            </Text>
          </HStack>
          <Flex direction={"column"}>
            <HStack>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                Payment Method:
              </Text>
              <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
                {transactionDetails?.payment_method}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                Payment Date:
              </Text>
              <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
                {dayjs(transactionDetails?.transaction_date).format(
                  "DD MMM YYYY"
                )}
              </Text>
            </HStack>
          </Flex>
        </Grid>
        {transactionDetails?.orders.map((order, index) => (
          <Flex
            key={`${order.shop_name};${index}`}
            direction="column"
            border={"2px solid"}
            borderColor={"lightLighten"}
            borderRadius={"lg"}
            p={5}
            my={2}
          >
            {transactionDetails?.orders.length > 1 && (
              <Text fontWeight={"bold"} textTransform={"uppercase"} mb={3}>
                Order {index + 1}
              </Text>
            )}
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <StoreListItem
                shopName={order.shop_name}
                shopCityName={"Jakarta"}
                onClick={() => navigate(routes.SHOP(order.shop_username))}
              />
              <Flex
                direction={"column"}
                justifyContent={"start"}
                alignItems={"end"}
                mb={2}
              >
                <Text
                  color={"primary"}
                  fontWeight={"bold"}
                  fontSize={"md"}
                  textTransform={"uppercase"}
                >
                  {order.delivery_status}
                </Text>
                {CListToShowOrderReceived.includes(order.delivery_status) && (
                  <TransactionDetailActionButton
                    label="Confirm Order Received"
                    role="button"
                    onClick={() => {
                      addConfirmUserReceivedOrder(order.id).then(() => {
                        successToast("Order Received!");
                        refetch();
                      });
                    }}
                  />
                )}
              </Flex>
            </Flex>
            <Divider borderWidth={1} borderColor={"light"} />
            <Box my={5}>
              {order.items.map((product, j) => (
                <Flex direction={"column"} key={`${product.name};${j}`} mb={3}>
                  <ProductListItem
                    name={product.name}
                    qty={product.qty}
                    regularPrice={product.price}
                    discountedPrice={product.price_after_discount}
                    total={product.total_price}
                    variantName={product.variant_type_name
                      .split(",")
                      .join(", ")}
                    productPhoto={product.photo}
                    onClick={() =>
                      navigate(routes.PDP(product.product_id, product.name))
                    }
                  />
                  {CListToShowAddReview.includes(order.delivery_status) &&
                    !product.is_reviewed && (
                      <>
                        <Flex justifyContent={"end"}>
                          <TransactionDetailActionButton
                            label="Add Review"
                            role="button"
                            onClick={() => {
                              setProductOrderIdToReview(product.id);
                              openAddReviewModal();
                            }}
                          />
                        </Flex>
                        {order.items.length - 1 !== j && (
                          <Divider
                            borderWidth={1}
                            borderColor={"light"}
                            mt={3}
                          />
                        )}
                      </>
                    )}
                </Flex>
              ))}
            </Box>
            <Divider borderWidth={1} borderColor={"light"} mb={1} />
            <Accordion width={"100%"} allowMultiple border={"none"}>
              <AccordionItem border={"none"}>
                <AccordionButton
                  px={0}
                  _hover={{
                    background: "none",
                  }}
                >
                  <HStack justifyContent={"space-between"} width="100%">
                    <Text fontWeight={"bold"} textTransform={"uppercase"}>
                      Total
                    </Text>
                    <Text fontWeight={"bold"}>
                      Rp
                      {formatCurrency(order.total)}
                    </Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                  <HStack justifyContent={"space-between"} width="100%" pb={2}>
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
                      {formatCurrency(order.subtotal)}
                    </Text>
                  </HStack>
                  <HStack justifyContent={"space-between"} width="100%" pb={2}>
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
                      {formatCurrency(order.delivery_fee)}
                    </Text>
                  </HStack>
                  <HStack justifyContent={"space-between"} width="100%" pb={2}>
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
                      - Rp
                      {formatCurrency(order.discount_shop)}
                    </Text>
                  </HStack>
                  <HStack justifyContent={"space-between"} width="100%" pb={2}>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      color={"gray.500"}
                    >
                      Discount from BAZR
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      color={"gray.500"}
                    >
                      - Rp
                      {formatCurrency(order.discount_marketplace)}
                    </Text>
                  </HStack>
                  {order.shop_voucher.code !== "" && (
                    <Flex
                      justifyContent={"start"}
                      alignItems={"center"}
                      mt={2}
                      gap={3}
                    >
                      <Text
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        color={"primaryDarken"}
                      >
                        Voucher applied:
                      </Text>
                      <HStack
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        borderRadius={"lg"}
                        border={"2px solid"}
                        borderColor={"light"}
                        p={1}
                      >
                        <Icon.Percentage boxSize={4} fill={"darkLighten"} />
                        <Text
                          color={"dark"}
                          fontWeight={"semibold"}
                          fontSize={"sm"}
                        >
                          {order.shop_voucher.code}
                        </Text>
                        <Text
                          fontSize={"xs"}
                          fontWeight={"semibold"}
                          color={"darkLighten"}
                        >
                          Disc.{" "}
                          {order.shop_voucher.benefit !== 0
                            ? `Rp${formatCurrency(order.shop_voucher.benefit)}`
                            : `${order.shop_voucher.benefit_percentage}%`}
                        </Text>
                      </HStack>
                    </Flex>
                  )}
                  <Flex justifyContent={"end"} mt={2}>
                    {CListToShowRefund.includes(order.delivery_status) && (
                      <Text
                        color={"darkLighten"}
                        fontSize={"xs"}
                        fontWeight={"semibold"}
                        _hover={{
                          color: "danger",
                        }}
                        onClick={() => {
                          onRefundOpen();
                          setRefundOrderId(order.id);
                        }}
                      >
                        Request Refund
                      </Text>
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        ))}
        <Accordion width={"100%"} allowMultiple border={"none"} px={5}>
          <AccordionItem border={"none"}>
            <AccordionButton
              px={0}
              _hover={{
                background: "none",
              }}
            >
              <HStack justifyContent={"space-between"} width="100%">
                <Text fontWeight={"bold"} textTransform={"uppercase"}>
                  Grand Total
                </Text>
                <Text fontWeight={"bold"}>
                  Rp
                  {formatCurrency(transactionDetails?.total!)}
                </Text>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0}>
              <HStack justifyContent={"space-between"} width="100%" pb={2}>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"sm"}
                  color={"gray.500"}
                >
                  Total ({transactionDetails?.total_qty!}{" "}
                  {transactionDetails?.total_qty! > 1 ? "products" : "product"})
                </Text>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"sm"}
                  color={"gray.500"}
                >
                  Rp
                  {formatCurrency(transactionDetails?.subtotal!)}
                </Text>
              </HStack>
              <HStack justifyContent={"space-between"} width="100%" pb={2}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Total Delivery Fee
                </Text>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Rp
                  {formatCurrency(transactionDetails?.total_delivery_fee!)}
                </Text>
              </HStack>
              <HStack justifyContent={"space-between"} width="100%" pb={2}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  Total Discount
                </Text>
                <Text
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.500"}
                >
                  - Rp
                  {formatCurrency(transactionDetails?.total_discount!)}
                </Text>
              </HStack>
              {transactionDetails?.voucher.code !== "" && (
                <Flex
                  justifyContent={"start"}
                  alignItems={"center"}
                  mt={2}
                  gap={3}
                >
                  <Text
                    fontSize={"sm"}
                    fontWeight={"semibold"}
                    color={"primaryDarken"}
                  >
                    Voucher applied:
                  </Text>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    borderRadius={"lg"}
                    border={"2px solid"}
                    borderColor={"light"}
                    p={1}
                  >
                    <Icon.Percentage boxSize={4} fill={"darkLighten"} />
                    <Text
                      color={"dark"}
                      fontWeight={"semibold"}
                      fontSize={"sm"}
                    >
                      {transactionDetails?.voucher.code}
                    </Text>
                    <Text
                      fontSize={"xs"}
                      fontWeight={"semibold"}
                      color={"darkLighten"}
                    >
                      Disc.{" "}
                      {transactionDetails?.voucher.benefit !== 0
                        ? `Rp${formatCurrency(
                            transactionDetails?.voucher.benefit!
                          )}`
                        : `${transactionDetails?.voucher.benefit_percentage!}%`}
                    </Text>
                  </HStack>
                </Flex>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>

      <CreateRefundModal
        orderId={refundOrderId}
        isOpen={isRefundOpen}
        onClose={onRefundClose}
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isAddReviewModalOpen}
        size="sm"
        isCentered
        onClose={closeAddReviewModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex direction="column">
              <Flex>Your review means a lot to us</Flex>
              <Divider marginY={2} />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingY={5}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const selectRating = document.getElementById(
                  "selectAddReviewRating"
                ) as HTMLSelectElement;
                const selectRatingValueInt = parseInt(selectRating.value);
                const payload: IAddUserReviewRequestPayload = {
                  rating_score: selectRatingValueInt,
                };
                addUserReview(productOrderIdToReview, payload).then(() => {
                  refetch();
                });
                closeAddReviewModal();
              }}
            >
              <Flex direction="column">
                <Box>
                  <Select required id="selectAddReviewRating">
                    <option value="">Add Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Select>
                </Box>
                <Divider marginY={2} />
                <Flex justifyContent="end">
                  <Button type="submit">Add Review</Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default TransactionDetails;
