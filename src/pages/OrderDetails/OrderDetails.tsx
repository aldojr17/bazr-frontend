import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import {
  initialOrderDetails,
  IOrderDetails,
} from "../../interfaces/Transaction";
import { formatCurrency } from "../../util/util";

function OrderDetails() {
  const { setShowOrderDetail, fetchOrderDetails, showOrderDetail } =
    useTransactionOrderHistory();
  const [orderDetails, setOrderDetail] =
    useState<IOrderDetails>(initialOrderDetails);

  useEffect(() => {
    const _useEffectAsync = async () => {
      if (showOrderDetail) {
        const _orderDetails = await fetchOrderDetails(
          showOrderDetail.showOrderDetailId
        );
        if (_orderDetails) {
          setOrderDetail(_orderDetails);
        }
      }
    };
    _useEffectAsync();
  }, [showOrderDetail]);

  const myConst = {
    deliveryStatus: {
      RECEIVED: "Received",
    },
  };

  return (
    <Flex direction="column" bg="gray.200">
      <Box padding={5}>
        <Text
          role="button"
          onClick={() => setShowOrderDetail(undefined)}
          variant="outline"
          fontWeight="bold"
        >
          {"< Back"}
        </Text>
      </Box>
      <Divider marginY={2} />
      <Flex padding={5} direction="column">
        <Flex alignItems="center" justifyContent="space-between" paddingX={3}>
          <Text fontSize="xx-large" fontWeight="bold">
            {showOrderDetail?.showOrderDetailShopName}
          </Text>
          <Text color="primary">
            {showOrderDetail?.showOrderDetailDeliveryStatus}
          </Text>
        </Flex>
        {orderDetails.items.map((item, i) => (
          <Box bg="gray.50" marginY={1} key={`${item.product_name};${i}`}>
            <Flex margin={1}>
              <Image
                loading="lazy"
                src={item.photo.url}
                width="20"
                height="20"
              />
              <Flex
                justifyContent="space-between"
                margin={1}
                width="100%"
                alignItems="center"
              >
                <Flex direction="column">
                  <Box fontWeight="bold" textTransform="capitalize">
                    {item.product_name}
                  </Box>
                  <Box fontWeight="thin">
                    {item.variant_name} x {item.qty}
                  </Box>
                </Flex>
                <Box>Rp{formatCurrency(item.price)}</Box>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Flex>
      {showOrderDetail?.showOrderDetailDeliveryStatus ===
      myConst.deliveryStatus.RECEIVED ? (
        <Flex alignItems="center" justifyContent="space-between" padding={5}>
          <Link color="primary">Refund</Link>
          <Button>Add Review</Button>
        </Flex>
      ) : (
        ""
      )}
      <Divider marginY={2} />
      <Flex padding={5} direction="column" alignItems="end">
        <TableContainer>
          <Table variant="unstyled" size="sm">
            <Tbody>
              <Tr>
                <Td fontWeight="bold">
                  <Flex justifyContent="end">Subtotal Product</Flex>
                </Td>
                <Td>
                  <Flex justifyContent="end">
                    Rp{formatCurrency(orderDetails.subtotal)}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">
                  <Flex justifyContent="end">Discount</Flex>
                </Td>
                <Td>
                  <Flex justifyContent="end">
                    Rp{formatCurrency(orderDetails.total_discount)}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">
                  <Flex direction="column" alignItems="end">
                    <Text>Delivery Fee</Text>
                    <Text fontWeight="thin">{orderDetails.courier_name}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex justifyContent="end">
                    Rp{formatCurrency(orderDetails.total_delivery_fee)}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">
                  <Flex justifyContent="end">Total</Flex>
                </Td>
                <Td>
                  <Flex fontSize="xl" color="primary" justifyContent="end">
                    Rp{formatCurrency(orderDetails.total)}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">
                  <Flex justifyContent="end">Payment Method</Flex>
                </Td>
                <Td>
                  <Flex justifyContent="end">
                    {orderDetails.payment_method}
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}

export default OrderDetails;
