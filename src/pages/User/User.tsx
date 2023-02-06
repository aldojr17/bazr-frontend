import {
  Avatar,
  Container,
  Divider,
  Flex,
  HStack,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useUser from "../../hooks/useUser";
import { formatCurrency } from "../../util/util";
import Address from "../Address/Address";
import TransactionOrderHistory from "../TransactionOrderHistory/TransactionOrderHistory";
import UserOngoingRefund from "./UserOngoingRefund";
import UserProfile from "./UserProfile";

function User() {
  const { user } = useUser();

  return (
    <Container maxW="container.xl" py={5}>
      <HStack width={"100%"} alignItems={"start"}>
        <Skeleton
          display={{ base: "none", lg: "block" }}
          width={"30%"}
          isLoaded={user ? true : false}
        >
          <Flex
            direction={"column"}
            borderWidth="1px"
            borderRadius="lg"
            marginEnd={5}
            padding={4}
          >
            <HStack>
              <Avatar size="md" name="Avatar" src={user?.profile_picture} />
              <Text fontSize="md" fontWeight="bold">
                {user?.name}
              </Text>
            </HStack>
            <Divider borderWidth={1} my={4} />
            <Flex direction={"row"} justifyContent={"space-between"}>
              <HStack>
                <Icon.Wallet fill={"primary"} />
                <Text fontWeight={"semibold"}>Wallet</Text>
              </HStack>
              <Text
                textAlign={"end"}
                color={"darkLighten"}
                fontWeight={"semibold"}
              >
                Rp{formatCurrency(user?.wallet_detail?.balance ?? 0)}
              </Text>
            </Flex>
          </Flex>
        </Skeleton>

        <Skeleton
          width={{ base: "100%", lg: "70%" }}
          isLoaded={user ? true : false}
        >
          <Flex borderWidth="1px" borderRadius="lg">
            <Tabs isLazy p={2} variant={"default"} width={"100%"}>
              <TabList>
                <Tab>Profile</Tab>
                <Tab>Address</Tab>
                <Tab>My Purchase</Tab>
                <Tab>Manage Refund</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserProfile />
                </TabPanel>
                <TabPanel>
                  <Address />
                </TabPanel>
                <TabPanel>
                  <TransactionOrderHistory />
                </TabPanel>
                <TabPanel>
                  <UserOngoingRefund />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Skeleton>
      </HStack>
    </Container>
  );
}

export default User;
