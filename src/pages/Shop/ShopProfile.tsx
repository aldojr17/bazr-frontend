import {
  Avatar,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Icon from "../../assets/icons";
import ShopProfileDetail from "../../components/Shop/ShopProfileDetail";
import { IShopProfileProps } from "../../interfaces/Shop";
import { customTheme } from "../../theme/theme";

function ShopProfile(props: IShopProfileProps) {
  const { isFetchShopProfileLoaded, shopProfile } = props;
  return (
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
  );
}

export default ShopProfile;
