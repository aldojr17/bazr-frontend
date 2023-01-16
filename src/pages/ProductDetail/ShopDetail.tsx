import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
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
    <Box>
      <Flex
        background={"gray.100"}
        my={10}
        px={5}
        py={5}
        borderRadius={"lg"}
        direction={"row"}
        gap={5}
      >
        <SkeletonCircle isLoaded={!loading} size={"14"}>
          <Avatar
            as={Link}
            href={routes.SHOP(shopDetail?.username!)}
            size={"lg"}
          />
        </SkeletonCircle>
        <Box flex={1} ms={2}>
          <SkeletonText my={"2"} isLoaded={!loading}>
            <Heading
              as={Link}
              href={routes.SHOP(shopDetail?.username!)}
              variant={"productShopName"}
            >
              {shopDetail?.name!}
            </Heading>
            <Flex
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
              gap={5}
            >
              <HStack my={1} alignItems={"center"}>
                <Icon.Location fill={"secondary"} />
                <Text fontWeight={"semibold"}>{shopDetail?.city!}</Text>
              </HStack>
              <Center display={{ base: "none", lg: "block" }} height="20px">
                <Divider orientation="vertical" />
              </Center>
              <HStack>
                <Text>Product: </Text>
                <Text>{shopDetail?.total_product!}</Text>
              </HStack>
            </Flex>
          </SkeletonText>
        </Box>
      </Flex>
    </Box>
  );
}

export default ShopDetail;
