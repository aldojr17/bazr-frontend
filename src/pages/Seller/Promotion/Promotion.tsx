import {
  Button,
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
import { BsPlusCircleDotted } from "react-icons/bs";
import { Link } from "react-router-dom";
import routes from "../../../routes/Routes";
import PromotionTable from "./PromotionTable";

function Promotion() {
  return (
    <>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Promotion List
            </Text>
            <Button
              leftIcon={<BsPlusCircleDotted />}
              as={Link}
              to={routes.SELLER_PROMOTION_CREATE}
            >
              Create Promotion
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
                <PromotionTable status="all" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <PromotionTable status="ongoing" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <PromotionTable status="upcoming" />
              </TabPanel>
              <TabPanel paddingX={0}>
                <PromotionTable status="ended" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default Promotion;
