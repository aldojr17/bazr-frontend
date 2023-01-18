import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  WrapItem,
  Avatar,
  Divider,
  Hide,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useUser from "../../hooks/useUser";
import { formatCurrency } from "../../util/util";
import TransactionOrderHistory from "../TransactionOrderHistory/TransactionOrderHistory";
import UserProfile from "./UserProfile";
import "./style.css";

function User() {
  const { user } = useUser();

  return (
    <>
      <Container maxW="container.xl" py={5}>
        <HStack alignItems={"start"}>
          <Hide below="md">
            <Skeleton isLoaded={user ? true : false}>
              <Box
                width={250}
                borderWidth="1px"
                borderRadius="lg"
                marginEnd={5}
                padding={4}
              >
                <WrapItem>
                  <Avatar size="md" name="Avatar" src={user?.profile_picture} />
                  <Box marginStart={5} alignSelf={"center"}>
                    <Text fontSize="md" fontWeight="bold">
                      {user?.name}
                    </Text>
                  </Box>
                </WrapItem>
                <Divider borderWidth={1} my={4} />
                <Flex justifyContent={"space-between"}>
                  <HStack>
                    <Icon.Wallet fill={"primary"} />
                    <Text>Wallet</Text>
                  </HStack>
                  <Text textAlign={"end"}>
                    Rp {formatCurrency(user?.wallet_detail?.balance ?? 0)}
                  </Text>
                </Flex>
              </Box>
            </Skeleton>
          </Hide>

          <Box flex="1" borderWidth="1px" borderRadius="lg">
            <Skeleton isLoaded={user ? true : false}>
              <Tabs padding={2} maxW="calc(100vw - 2rem)">
                <TabList
                  overflowX="scroll"
                  overflowY="hidden"
                  className="hidescrollbar"
                >
                  <Tab
                    _selected={{
                      color: "primary",
                      borderBottomColor: "primary",
                    }}
                  >
                    Profile
                  </Tab>
                  <Tab
                    _selected={{
                      color: "primary",
                      borderBottomColor: "primary",
                    }}
                  >
                    Address
                  </Tab>
                  <Tab
                    _selected={{
                      color: "primary",
                      borderBottomColor: "primary",
                    }}
                  >
                    Payment
                  </Tab>
                  <Tab
                    _selected={{
                      color: "primary",
                      borderBottomColor: "primary",
                    }}
                  >
                    My Purchase
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <UserProfile />
                  </TabPanel>
                  <TabPanel>
                    <p>Adress</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Pembayaran</p>
                  </TabPanel>
                  <TabPanel padding="0">
                    <TransactionOrderHistory />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Skeleton>
          </Box>
        </HStack>
      </Container>
    </>
  );
}

export default User;
