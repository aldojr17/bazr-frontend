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
import UserProfile from "./UserProfile";

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
              <Tabs padding={2}>
                <TabList>
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
