import { Box, TabList, Tabs } from "@chakra-ui/react";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import { EOrderHistoryStatus } from "../../interfaces/Transaction";
import "../User/style.css";
import TabFilter from "./TabFilter";

function TabsTransactionOrderHistory() {
  const { setDeliveryStatus, setPage } = useTransactionOrderHistory();

  const setDeliveryStatusPage = (deliveryStatus: EOrderHistoryStatus) => {
    setDeliveryStatus(deliveryStatus);
    setPage(1);
  };

  return (
    <Box>
      <Tabs>
        <TabList
          h="fit-content"
          overflowX="scroll"
          overflowY="hidden"
          className="example"
        >
          <TabFilter
            text="All"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.ALL)}
          />
          <TabFilter
            text="Waiting For Seller"
            onClick={() =>
              setDeliveryStatusPage(EOrderHistoryStatus.WAITING_SELLER)
            }
          />
          <TabFilter
            text="On Process"
            onClick={() =>
              setDeliveryStatusPage(EOrderHistoryStatus.ON_PROCESS)
            }
          />
          <TabFilter
            text="On Delivery"
            onClick={() =>
              setDeliveryStatusPage(EOrderHistoryStatus.ON_DELIVERY)
            }
          />
          <TabFilter
            text="Delivered"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.DELIVERED)}
          />
          <TabFilter
            text="Received"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.RECEIVED)}
          />
          <TabFilter
            text="Completed"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.COMPLETED)}
          />
          <TabFilter
            text="Canceled"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.CANCELED)}
          />
          <TabFilter
            text="Refunded"
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.REFUNDED)}
          />
        </TabList>
      </Tabs>
    </Box>
  );
}

export default TabsTransactionOrderHistory;
