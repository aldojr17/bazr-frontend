import { useParams } from "react-router-dom";
import {
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShop from "../../hooks/useShop";
import { customTheme } from "../../theme/theme";
import dayjs from "dayjs";
import ShopProfileDetail from "../../components/Shop/ShopProfileDetail";
import Icon from "../../assets/icons";
import { IShopProfilePayload } from "../../interfaces/Shop";
import ShopHomeProducts from "./ShopHomeProducts";

function ShopHome() {
  const { shopId } = useParams();
  const [isFetchShopProfileLoaded, setIsFetchShopProfileLoaded] =
    useState(true);
  const [shopProfile, setShopProfile] = useState<IShopProfilePayload | null>({
    id: 0,
    name: "",
    username: "",
    city: "",
    joined_at: "",
    total_product: 0,
  });
  const { fetchShopProfile } = useShop();
  useEffect(() => {
    const _useEffectAsync = async () => {
      setIsFetchShopProfileLoaded(false);
      const response = await fetchShopProfile(parseInt(shopId!));
      setShopProfile(response);
      setIsFetchShopProfileLoaded(true);
    };
    _useEffectAsync();
  }, []);
  return (
    <Container maxW="8xl">
      <Skeleton isLoaded={isFetchShopProfileLoaded}>
        <Stack
          align="center"
          className="p-3"
          direction={{ base: "column", md: "row" }}
          maxW="8xl"
          backgroundColor="lightLighten"
          borderRadius="lg"
          my={10}
          boxShadow="default"
        >
          <Flex
            className="p-2"
            width={{ base: "100%", md: "50%", lg: "30%" }}
            align="center"
          >
            <Avatar
              borderRadius="full"
              boxSize={{
                base: "75px",
                md: "100px",
                lg: "150px",
              }}
              // TODO: update shop profile
              src=""
            />
            <Flex className="px-4" direction="column">
              <Text
                maxWidth="15rem"
                noOfLines={2}
                fontSize="x-large"
                className="px-1"
                as="b"
              >
                {shopProfile?.name}
              </Text>
              <Flex direction="row">
                <Text color={customTheme.colors.darkLighten}>@</Text>
                <Text noOfLines={1} color={customTheme.colors.darkLighten}>
                  {shopProfile?.username}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <SimpleGrid
            columns={{
              base: 1,
              lg: 2,
            }}
            width={{ base: "100%", md: "50", lg: "70%" }}
            spacingY="20px"
            justifyContent="space-evenly"
          >
            <ShopProfileDetail
              icon={<Icon.Shop />}
              title="Products"
              value={shopProfile!.total_product.toString()}
            />
            <ShopProfileDetail
              icon={<Icon.GeoMap />}
              title="City"
              value={shopProfile!.city}
            />
            <ShopProfileDetail
              icon={<Icon.PersonCheck />}
              title="Joined At"
              value={dayjs(shopProfile?.joined_at).format("MMMM YYYY")}
            />
          </SimpleGrid>
        </Stack>
      </Skeleton>
      <Container maxW="8xl">
        <Tabs>
          <TabList>
            <Tab>Home</Tab>
            <Tab>Product</Tab>
            <Tab>Review</Tab>
          </TabList>

          <TabPanels>
            <TabPanel className="p-0">
              <ShopHomeProducts shopId={parseInt(shopId!)} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Container>
  );
}

export default ShopHome;
