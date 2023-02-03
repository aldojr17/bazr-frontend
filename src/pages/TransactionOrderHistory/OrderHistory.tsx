import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../util/util";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  CListToShowAddReview,
  CListToShowOrderReceived,
  CListToShowRefund,
  ITransaction,
} from "../../interfaces/Transaction";
import TransactionDetailActionButton from "../../components/Button/TransactionDetailActionButton";

function OrderHistory() {
  const {
    fetchTransactionHistory,
    transactionOrderHistory,
    deliveryStatus,
    page,
    setShowTransactionDetail,
  } = useTransactionOrderHistory();

  useEffect(() => {
    fetchTransactionHistory({
      page: page,
      status: deliveryStatus,
    });
  }, [deliveryStatus, page]);

  const openTransactionDetail = (transaction: ITransaction) => {
    setShowTransactionDetail({
      transactionId: transaction.id,
    });
  };

  return (
    <Box>
      {transactionOrderHistory.data.length !== 0 ? (
        transactionOrderHistory.data.map((transaction, h) => (
          <Flex
            direction="column"
            marginY={3}
            borderRadius="xl"
            padding={5}
            bg="gray.300"
            key={`${transaction.id};${h}`}
          >
            <Box marginBottom={3} paddingX={5}>
              <Flex fontWeight="thin" justifyContent="space-between">
                <Flex>
                  <Text marginEnd={3}>Transaction ID :</Text>
                  <Text>{transaction.id}</Text>
                </Flex>
                <Box>
                  <Flex>
                    <Text marginEnd={3}>Payment Date :</Text>
                    <Text>
                      {dayjs(transaction.transaction_date).format(
                        "DD MMM YYYY"
                      )}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Flex fontWeight="thin">
                <Text marginEnd={3}>Payment Method :</Text>
                <Text>{transaction.payment_method}</Text>
              </Flex>
            </Box>
            <Box>
              {transaction.orders.map((order, i) => (
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
                  {order.list_of_products.map((product, j) => (
                    <Box
                      bg="gray.50"
                      marginY={1}
                      key={`${product.name};${j}`}
                      role="button"
                      borderRadius="lg"
                      onClick={() => openTransactionDetail(transaction)}
                    >
                      <Flex margin={3}>
                        <Image src={product.photo} width="24" height="24" />
                        <Flex
                          justifyContent="space-between"
                          margin={1}
                          key={`${product.name};${j}`}
                          width="100%"
                          alignItems="center"
                        >
                          <Flex marginStart={3} direction="column">
                            <Box fontWeight="bold">{product.name}</Box>
                            <Box>x {product.qty}</Box>
                          </Flex>
                          <Flex direction="column" alignItems="center">
                            <Flex>
                              <Box>Rp</Box>
                              <Box>{formatCurrency(product.price)}</Box>
                            </Flex>
                            {CListToShowRefund.includes(
                              order.delivery_status
                            ) ? (
                              <TransactionDetailActionButton label="Refund" />
                            ) : (
                              ""
                            )}
                            {CListToShowAddReview.includes(
                              order.delivery_status
                            ) ? (
                              product.is_reviewed ? (
                                ""
                              ) : (
                                <TransactionDetailActionButton label="Add Review" />
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
                    {CListToShowOrderReceived.includes(
                      order.delivery_status
                    ) ? (
                      <TransactionDetailActionButton
                        label="Confirm Order Received"
                        role="button"
                        onClick={() => {
                          openTransactionDetail(transaction);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </Flex>
                  <Divider marginY={4} />
                  <Flex alignItems="center" paddingX={3} justifyContent="end">
                    <Box paddingEnd={3}>Subtotal:</Box>
                    <Box
                      fontSize={{ base: "unset", sm: "x-large" }}
                      color="primary"
                    >
                      <Flex>
                        <Box>Rp</Box>
                        <Box>{formatCurrency(order.total)}</Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              ))}
            </Box>
            <Box marginTop={3} paddingX={5}>
              <Flex alignItems="center" justifyContent="end">
                <Text fontWeight="semibold" marginEnd={3}>
                  Total :
                </Text>
                <Flex
                  fontSize={{ base: "unset", sm: "xx-large" }}
                  color="primary"
                >
                  <Flex>
                    <Box>Rp</Box>
                    <Box>{formatCurrency(transaction.grand_total)}</Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        ))
      ) : (
        <Flex paddingTop={5} justifyContent="center">
          No Transactions
        </Flex>
      )}
    </Box>
  );
}

export default OrderHistory;
