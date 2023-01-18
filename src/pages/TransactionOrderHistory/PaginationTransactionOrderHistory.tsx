import { Box } from "@chakra-ui/react";
import Pagination from "../../components/Pagination/Pagination";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";

function PaginationTransactionOrderHistory() {
  const { transactionOrderHistory, setPage } = useTransactionOrderHistory();
  return (
    <Box>
      {transactionOrderHistory.data.data.length !== 0 ? (
        <Pagination
          data={{
            current_page: transactionOrderHistory.data.current_page,
            total_page: transactionOrderHistory.data.total_page,
          }}
          setPage={setPage}
        />
      ) : (
        ""
      )}
    </Box>
  );
}

export default PaginationTransactionOrderHistory;
