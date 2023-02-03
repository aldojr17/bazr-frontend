import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { Link } from "react-router-dom";
import routes from "../../../routes/Routes";
import VoucherTable from "./VoucherTable";

function Voucher() {
  return (
    <>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Voucher List
            </Text>
            <Button
              leftIcon={<BsPlusCircleDotted />}
              as={Link}
              to={routes.SELLER_VOUCHER_CREATE}
            >
              Create Voucher
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Tabs variant="enclosed" isLazy={true}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Ongoing</Tab>
              <Tab>Upcoming</Tab>
              <Tab>Has ended</Tab>
            </TabList>
            <TabPanels>
              <TabPanel paddingX={0}>
                <VoucherTable status="all" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <VoucherTable status="ongoing" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <VoucherTable status="upcoming" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <VoucherTable status="ended" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default Voucher;
