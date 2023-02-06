import {
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import TransactionDetailActionButton from "../../components/Button/TransactionDetailActionButton";
import ProductListItem from "../../components/Card/ProductListItem";
import StoreListItem from "../../components/Card/StoreListItem";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import {
  CListToShowAddReview,
  CListToShowOrderReceived,
  ITransaction,
} from "../../interfaces/Transaction";
import routes from "../../routes/Routes";
import { formatCurrency } from "../../util/util";

function OrderHistory() {
  const {
    fetchTransactionHistory,
    transactionOrderHistory,
    deliveryStatus,
    page,
    setShowTransactionDetail,
  } = useTransactionOrderHistory();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const openTransactionDetail = (transaction: ITransaction) => {
    setShowTransactionDetail({
      transactionId: transaction.id,
    });
  };

  useEffect(() => {
    fetchTransactionHistory({
      page: page,
      status: deliveryStatus,
    }).finally(() => setIsLoading(false));
  }, [deliveryStatus, page]);

  return (
    <>
      {transactionOrderHistory.data.length !== 0 ? (
        transactionOrderHistory.data.map((transaction, h) => (
          <Flex
            key={`${transaction.id};${h}`}
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
                  {transaction.id}
                </Text>
              </HStack>
              <Flex direction={"column"}>
                <HStack>
                  <Text fontWeight={"bold"} fontSize={"sm"}>
                    Payment Method:
                  </Text>
                  <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
                    {transaction.payment_method}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight={"bold"} fontSize={"sm"}>
                    Payment Date:
                  </Text>
                  <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
                    {dayjs(transaction.transaction_date).format("DD MMM YYYY")}
                  </Text>
                </HStack>
              </Flex>
            </Grid>
            {transaction.orders.map((order, index) => (
              <Flex
                key={`${order.shop_name};${index}`}
                direction="column"
                border={"2px solid"}
                borderColor={"lightLighten"}
                borderRadius={"lg"}
                p={5}
                my={2}
              >
                {transaction.orders.length > 1 && (
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
                    <Flex direction={"row"} gap={3}>
                      {CListToShowOrderReceived.includes(
                        order.delivery_status
                      ) && (
                        <TransactionDetailActionButton
                          label="Confirm Order Received"
                          role="button"
                          onClick={() => {
                            openTransactionDetail(transaction);
                          }}
                        />
                      )}
                      {!order.order_is_reviewed &&
                        CListToShowAddReview.includes(
                          order.delivery_status
                        ) && (
                          <TransactionDetailActionButton
                            label="Add review"
                            role="button"
                            onClick={() => {
                              openTransactionDetail(transaction);
                            }}
                          />
                        )}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider borderWidth={1} borderColor={"light"} />
                <Flex direction={"column"} my={3}>
                  <ProductListItem
                    name={order.list_of_products[0].name}
                    qty={order.list_of_products[0].qty}
                    regularPrice={order.list_of_products[0].price}
                    discountedPrice={
                      order.list_of_products[0].price_after_discount
                    }
                    total={order.list_of_products[0].total}
                    variantName={order.list_of_products[0].variant_type_name
                      .split(",")
                      .join(", ")}
                    productPhoto={order.list_of_products[0].photo}
                    onClick={() =>
                      navigate(
                        routes.PDP(
                          order.list_of_products[0].product_id,
                          order.list_of_products[0].name
                        )
                      )
                    }
                  />
                  {order.list_of_products.length > 1 && (
                    <Text
                      as={"i"}
                      align={"right"}
                      color={"darkLighten"}
                      fontSize={"xs"}
                      fontWeight={"semibold"}
                    >
                      and {order.list_of_products.length - 1} more{" "}
                      {order.list_of_products.length - 1 > 1
                        ? "products"
                        : "product"}
                    </Text>
                  )}
                </Flex>
                <Divider borderWidth={1} borderColor={"light"} />
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  alignItems={"start"}
                  gap={10}
                  py={3}
                >
                  <GridItem></GridItem>

                  <HStack justifyContent={"space-between"}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                    >
                      Subtotal:
                    </Text>
                    <Text color={"dark"} fontWeight={"medium"} fontSize={"sm"}>
                      Rp{formatCurrency(order.total)}
                    </Text>
                  </HStack>
                </Grid>
              </Flex>
            ))}
            <Grid
              templateColumns={"repeat(2,1fr)"}
              alignItems={"start"}
              gap={10}
              py={3}
              px={5}
            >
              <Text
                variant={"link"}
                cursor={"pointer"}
                onClick={() => openTransactionDetail(transaction)}
              >
                See transaction detail
                <Icon.ChevronRight width={4} pb={"2px"} />
              </Text>
              <HStack justifyContent={"space-between"}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"md"}
                  textTransform={"uppercase"}
                >
                  Total:
                </Text>
                <Text
                  color={"primaryDarken"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                >
                  Rp{formatCurrency(transaction.grand_total)}
                </Text>
              </HStack>
            </Grid>
          </Flex>
        ))
      ) : (
        <Skeleton isLoaded={!isLoading} p={10} my={5}>
          <Flex paddingTop={5} justifyContent="center">
            No Transactions
          </Flex>
        </Skeleton>
      )}
    </>
  );
}

export default OrderHistory;
