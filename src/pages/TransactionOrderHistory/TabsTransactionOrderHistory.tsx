import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import { EOrderHistoryStatus } from "../../interfaces/Transaction";
import "../User/style.css";

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
          <Tab
            w="max-content"
            whiteSpace="nowrap"
            _selected={{
              color: "primary",
              borderBottomColor: "primary",
            }}
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.ALL)}
          >
            All
          </Tab>
          <Tab
            w="max-content"
            whiteSpace="nowrap"
            _selected={{
              color: "primary",
              borderBottomColor: "primary",
            }}
            onClick={() =>
              setDeliveryStatusPage(EOrderHistoryStatus.ON_PROCESS)
            }
          >
            On Process
          </Tab>
          <Tab
            w="max-content"
            whiteSpace="nowrap"
            _selected={{
              color: "primary",
              borderBottomColor: "primary",
            }}
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.DELIVERED)}
          >
            Delivered
          </Tab>
          <Tab
            w="max-content"
            whiteSpace="nowrap"
            _selected={{
              color: "primary",
              borderBottomColor: "primary",
            }}
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.COMPLETED)}
          >
            Completed
          </Tab>
          <Tab
            w="max-content"
            whiteSpace="nowrap"
            _selected={{
              color: "primary",
              borderBottomColor: "primary",
            }}
            onClick={() => setDeliveryStatusPage(EOrderHistoryStatus.CANCELED)}
          >
            Canceled
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}

export default TabsTransactionOrderHistory;
