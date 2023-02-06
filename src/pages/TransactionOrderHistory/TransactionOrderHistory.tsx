import { useEffect } from "react";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import OrderHistory from "./OrderHistory";
import PaginationTransactionOrderHistory from "./PaginationTransactionOrderHistory";
import TabsTransactionOrderHistory from "./TabsTransactionOrderHistory";
import TransactionDetails from "./TransactionDetails";

function TransactionOrderHistory() {
  const { showTransactionDetail, setShowTransactionDetail } =
    useTransactionOrderHistory();

  useEffect(() => {
    setShowTransactionDetail(undefined);
  }, []);

  return (
    <>
      {showTransactionDetail === undefined ? (
        <>
          <TabsTransactionOrderHistory />
          <OrderHistory />
          <PaginationTransactionOrderHistory />
        </>
      ) : (
        <TransactionDetails />
      )}
    </>
  );
}

export default TransactionOrderHistory;
