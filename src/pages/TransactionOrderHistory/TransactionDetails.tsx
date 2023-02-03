import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import TransactionDetailActionButton from "../../components/Button/TransactionDetailActionButton";
import CreateRefundModal from "../../components/Modal/CreateRefundModal";
import TableData from "../../components/TableData/TableData";
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

  const refetch = () => {
    setVarToRefetch(Math.random());
  };

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
      <Box padding={5}>
        <Text
          role="button"
          onClick={() => setShowTransactionDetail(undefined)}
          variant="outline"
          fontWeight="bold"
          color="primary"
        >
          {"< Back"}
        </Text>
      </Box>
      <Divider marginY={2} />
      <Flex
        direction="column"
        marginY={3}
        borderRadius="xl"
        padding={5}
        bg="gray.300"
      >
        <Flex justifyContent="space-between">
          <TableData
            rows={[
              {
                key: "Transaction ID",
                value: transactionDetails?.id,
                fontWeightKey: "thin",
                fontWeightValue: "thin",
              },
              {
                key: "Payment Method",
                value: transactionDetails?.payment_method,
                fontWeightKey: "thin",
                fontWeightValue: "thin",
              },
            ]}
          />
          <TableData
            rows={[
              {
                key: "Date",
                value: dayjs(transactionDetails?.transaction_date).format(
                  "DD MMM YYYY"
                ),
                fontWeightKey: "thin",
                fontWeightValue: "thin",
              },
            ]}
          />
        </Flex>
        <Box>
          {transactionDetails?.orders.map((order, i) => (
            <Flex
              direction="column"
              marginY={2}
              padding={3}
              bg="gray.200"
              borderRadius="xl"
              key={`${order.shop_name};${i}`}
            >
              <Flex
                alignItems="center"
                paddingX={3}
                justifyContent="space-between"
              >
                <Box
                  fontSize={{ base: "xl", sm: "xx-large" }}
                  fontWeight="bold"
                >
                  {order.shop_name}
                </Box>
                <Box fontWeight="bold" fontSize="lg" color="primary">
                  {order.delivery_status}
                </Box>
              </Flex>
              <Divider marginY={4} />
              {order.items.map((item, j) => (
                <Box
                  bg="gray.50"
                  marginY={1}
                  key={`${item.name};${j}`}
                  borderRadius="lg"
                >
                  <Flex margin={3}>
                    <Image src={item.photo} width="24" height="24" />
                    <Flex
                      justifyContent="space-between"
                      margin={1}
                      key={`${item.name};${j}`}
                      width="100%"
                      alignItems="center"
                    >
                      <Flex marginStart={3} direction="column">
                        <Box fontWeight="bold">{item.name}</Box>
                        <Box>x {item.qty}</Box>
                      </Flex>
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Flex>
                          <Box>Rp</Box>
                          <Box>{formatCurrency(item.price)}</Box>
                        </Flex>
                        {CListToShowAddReview.includes(
                          order.delivery_status
                        ) ? (
                          item.is_reviewed === false ? (
                            <TransactionDetailActionButton
                              label="Add Review"
                              role="button"
                              onClick={() => {
                                setProductOrderIdToReview(item.id);
                                openAddReviewModal();
                              }}
                            />
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              ))}
              <Flex justifyContent="end" margin={3}>
                {CListToShowOrderReceived.includes(order.delivery_status) ? (
                  <TransactionDetailActionButton
                    label="Confirm Order Received"
                    role="button"
                    onClick={() => {
                      addConfirmUserReceivedOrder(order.id).then(() => {
                        successToast("Confirm Order Received Success");
                        refetch();
                      });
                    }}
                  />
                ) : (
                  ""
                )}
                {CListToShowRefund.includes(order.delivery_status) ? (
                  <TransactionDetailActionButton
                    label="Refund"
                    role="button"
                    onClick={() => {
                      onRefundOpen();
                      setRefundOrderId(order.id);
                    }}
                  />
                ) : (
                  ""
                )}
              </Flex>
              <Divider marginY={4} />
              <Flex justifyContent="end" marginY={3}>
                <TableData
                  rows={[
                    {
                      key: "Subtotal Product",
                      value: `Rp${formatCurrency(order.subtotal)}`,
                      justifyContentValue: "end",
                    },
                    {
                      key: "Subtotal Discount",
                      value: `Rp${formatCurrency(order.total_discount)}`,
                      justifyContentValue: "end",
                    },
                    {
                      key: "Subtotal Delivery Fee",
                      value: `Rp${formatCurrency(order.delivery_fee)}`,
                      justifyContentValue: "end",
                    },
                    {
                      key: "Subtotal",
                      value: `Rp${formatCurrency(order.total)}`,
                      justifyContentValue: "end",
                      fontSizeValue: "lg",
                      colorValue: "primary",
                    },
                  ]}
                />
              </Flex>
            </Flex>
          ))}
        </Box>
        <Flex
          bg="#eaf5f5"
          borderRadius="xl"
          padding={5}
          justifyContent="end"
          marginTop={3}
        >
          <TableData
            rows={[
              {
                key: "Total Product",
                value: transactionDetails
                  ? `Rp${formatCurrency(transactionDetails.subtotal)}`
                  : undefined,
                justifyContentValue: "end",
              },
              {
                key: "Total Discount",
                value: transactionDetails
                  ? `Rp${formatCurrency(transactionDetails.total_discount)}`
                  : undefined,
                justifyContentValue: "end",
                addOn: transactionDetails ? (
                  <Tooltip
                    label={`Include Marketplace Discount Rp${formatCurrency(
                      transactionDetails.marketplace_discount
                    )}`}
                  >
                    <Box marginStart={1} role="button">
                      <Icon.InfoCircle width="0.7em" />
                    </Box>
                  </Tooltip>
                ) : undefined,
              },
              {
                key: "Total Delivery Fee",
                value: transactionDetails
                  ? `Rp${formatCurrency(transactionDetails.total_delivery_fee)}`
                  : undefined,
                justifyContentValue: "end",
              },
              {
                key: "Total",
                value: transactionDetails
                  ? `Rp${formatCurrency(transactionDetails.total)}`
                  : undefined,
                justifyContentValue: "end",
                fontSizeValue: "x-large",
                colorValue: "primary",
                fontWeightKey: "semibold",
              },
            ]}
          />
        </Flex>
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
