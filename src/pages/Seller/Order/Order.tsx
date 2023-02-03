import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import OrderTable from "./OrderTable";
import RefundTable from "./RefundTable";

function Order() {
  return (
    <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"2xl"} fontWeight="bold">
            Order List
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Tabs variant="customEnclosed" colorScheme={"default"} isLazy={true}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Need To Be Processed</Tab>
            <Tab>Refunds</Tab>
            <Tab>Done</Tab>
          </TabList>
          <TabPanels>
            <TabPanel paddingX={0}>
              <OrderTable status="all" />
            </TabPanel>
            <TabPanel paddingX={0}>
              <OrderTable status="pending" />
            </TabPanel>
            <TabPanel paddingX={0}>
              <RefundTable />
            </TabPanel>
            <TabPanel paddingX={0}>
              <OrderTable status="done" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default Order;
