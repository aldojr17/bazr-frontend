import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import { Box, Divider, Flex, Image } from "@chakra-ui/react";
import { formatCurrency } from "../../util/util";
import { useEffect } from "react";

function OrderHistory() {
  const {
    fetchTransactionHistory,
    transactionOrderHistory,
    deliveryStatus,
    page,
  } = useTransactionOrderHistory();

  useEffect(() => {
    fetchTransactionHistory({
      page: page,
      status: deliveryStatus,
    });
  }, [deliveryStatus, page]);

  return (
    <Box>
      {transactionOrderHistory.data.data.length !== 0 ? (
        transactionOrderHistory.data.data.map((transaction, i) => (
          <Flex
            direction="column"
            className="my-2 p-3"
            bg="gray.200"
            key={`${transaction.shop_name};${i}`}
          >
            <Flex
              alignItems="center"
              className="px-3"
              justifyContent="space-between"
            >
              <Box fontSize={{ base: "xl", sm: "xx-large" }} fontWeight="bold">
                {transaction.shop_name}
              </Box>
              <Box fontSize={{ base: "xs", sm: "unset" }} color="primary">
                {transaction.delivery_status}
              </Box>
            </Flex>
            <Divider className="my-2" />
            {transaction.list_of_products.map((product, j) => (
              <Box bg="gray.50" className="my-1" key={`${product.name};${j}`}>
                <Flex className="m-1">
                  <Image src={product.photo} width="20" height="20" />
                  <Flex
                    justifyContent="space-between"
                    className="m-1"
                    key={`${product.name};${j}`}
                    width="100%"
                    alignItems="center"
                  >
                    <Flex direction="column">
                      <Box fontWeight="bold">{product.name}</Box>
                      <Box>x {product.qty}</Box>
                    </Flex>
                    <Box>Rp{formatCurrency(product.price)}</Box>
                  </Flex>
                </Flex>
              </Box>
            ))}
            <Divider className="my-2" />
            <Flex alignItems="center" className="px-3" justifyContent="end">
              <Box className="pe-3">Total:</Box>
              <Box fontSize={{ base: "unset", sm: "xx-large" }} color="primary">
                Rp{formatCurrency(transaction.total)}
              </Box>
            </Flex>
          </Flex>
        ))
      ) : (
        <Flex className="pt-5" justifyContent="center">
          No Transactions
        </Flex>
      )}
    </Box>
  );
}

export default OrderHistory;
