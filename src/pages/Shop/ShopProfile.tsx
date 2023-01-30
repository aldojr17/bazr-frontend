import {
  Avatar,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Icon from "../../assets/icons";
import ShopProfileDetail from "../../components/Shop/ShopProfileDetail";
import { IShopProfileProps } from "../../interfaces/Shop";

function ShopProfile(props: IShopProfileProps) {
  const { shopProfile, isLoaded } = props;

  return (
    <Skeleton isLoaded={isLoaded}>
      <Stack
        align="start"
        p={8}
        direction={{ base: "column", md: "row" }}
        maxW="8xl"
        backgroundColor="lightLighten"
        borderRadius="lg"
        my={10}
        boxShadow="default"
      >
        <HStack
          width={{ base: "100%", md: "50%", lg: "30%" }}
          align="start"
          gap={5}
        >
          <Avatar
            borderRadius="full"
            boxSize={20}
            src={shopProfile?.profile_picture}
          />
          <Flex direction="column">
            <Heading variant={"productTitle"}>{shopProfile?.name}</Heading>
            <Text
              noOfLines={1}
              color={"darkLighten"}
              fontWeight={"semibold"}
              fontSize={"lg"}
            >
              @{shopProfile?.username}
            </Text>
          </Flex>
        </HStack>
        <SimpleGrid
          columns={{
            base: 1,
            lg: 2,
          }}
          width={{ base: "100%", md: "50", lg: "70%" }}
          spacingY={3}
        >
          <ShopProfileDetail
            icon={<Icon.GeoMap boxSize={5} />}
            title="City"
            value={shopProfile!.city}
          />
          <ShopProfileDetail
            icon={<Icon.Shop boxSize={5} />}
            title="Products"
            value={shopProfile!.total_product.toString()}
          />
          <ShopProfileDetail
            icon={<Icon.PersonCheck boxSize={5} />}
            title="Joined At"
            value={dayjs(shopProfile?.joined_at).format("MMMM YYYY")}
          />
        </SimpleGrid>
      </Stack>
    </Skeleton>
  );
}

export default ShopProfile;
