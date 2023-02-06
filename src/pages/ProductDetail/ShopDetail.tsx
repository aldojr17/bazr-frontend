import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Link,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import useShop from "../../hooks/useShop";
import { IShopDetailProps, IShopProfilePayload } from "../../interfaces/Shop";
import routes from "../../routes/Routes";

function ShopDetail(props: IShopDetailProps) {
  const { shopId } = props;
  const { fetchShopProfileById } = useShop();

  const [loading, setLoading] = useState(true);
  const [shopDetail, setShopDetail] = useState<IShopProfilePayload | null>(
    null
  );

  useEffect(() => {
    fetchShopProfileById(shopId)
      .then((response) => setShopDetail(response))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Flex
      background={"gray.100"}
      my={5}
      p={5}
      borderRadius={"lg"}
      direction={"row"}
      gap={5}
      alignItems={"start"}
    >
      <SkeletonCircle isLoaded={!loading} size={"9"}>
        <Avatar
          as={Link}
          href={routes.SHOP(shopDetail?.username!)}
          src={shopDetail?.profile_picture}
        />
      </SkeletonCircle>
      <Box flex={1} ms={2}>
        <SkeletonText isLoaded={!loading}>
          <Flex direction={"column"} alignItems={"start"} gap={0}>
            <Text
              as={Link}
              href={routes.SHOP(shopDetail?.username!)}
              fontSize={"lg"}
              textTransform={"none"}
              noOfLines={1}
              wordBreak={"break-all"}
            >
              {shopDetail?.name!}
            </Text>
            <Text
              color={"lightDarken"}
              fontWeight={"semibold"}
              fontSize={{ base: "xs", lg: "sm" }}
              noOfLines={1}
              wordBreak={"break-all"}
            >
              @{shopDetail?.username!}
            </Text>
          </Flex>
          <Flex direction={"row"} alignItems={"center"} gap={4} mt={2}>
            <Flex direction={"row"} gap={1} alignItems={"center"}>
              <Icon.Location
                fill={"primaryDarken"}
                boxSize={{ base: 4, lg: 5 }}
              />
              <Text
                fontWeight={"semibold"}
                fontSize={{ base: "xs", lg: "sm" }}
                color={"dark"}
                noOfLines={1}
                wordBreak={"break-all"}
              >
                {shopDetail?.city!}
              </Text>
            </Flex>
            <Center display={"block"} height={{ base: "13px", lg: "15px" }}>
              <Divider
                orientation="vertical"
                borderWidth={1}
                borderColor={"darkLighten"}
              />
            </Center>
            <HStack>
              <Text
                fontWeight={"semibold"}
                fontSize={{ base: "xs", lg: "sm" }}
                color={"dark"}
              >
                Product:{" "}
              </Text>
              <Text
                fontWeight={"medium"}
                fontSize={{ base: "xs", lg: "sm" }}
                color={"dark"}
              >
                {shopDetail?.total_product!}
              </Text>
            </HStack>
          </Flex>
        </SkeletonText>
      </Box>
    </Flex>
  );
}

export default ShopDetail;
