import { Box } from "@chakra-ui/react";
import OrderHistory from "./OrderHistory";
import PaginationTransactionOrderHistory from "./PaginationTransactionOrderHistory";
import TabsTransactionOrderHistory from "./TabsTransactionOrderHistory";

function TransactionOrderHistory() {
  return (
    <Box>
      <TabsTransactionOrderHistory />
      <OrderHistory />
      <PaginationTransactionOrderHistory />
    </Box>
  );
}

export default TransactionOrderHistory;
