import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../assets/icons";
import useShop from "../../../hooks/useShop";
import { IShopDashboard } from "../../../interfaces/Shop";
import routes from "../../../routes/Routes";
import { formatCurrency } from "../../../util/util";

function Home() {
  const { fetchShopDashboard } = useShop();

  const [shopData, setShopData] = useState<IShopDashboard | null>(null);

  useEffect(() => {
    fetchShopDashboard().then((res) => setShopData(res));
  }, []);

  return (
    <Container maxW={"container.xl"}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows={"repeat(2, 1fr)"}
        gap={6}
      >
        <GridItem rowSpan={2}>
          <Card variant={"outline"} rounded={"xl"} bgColor={"white"}>
            <CardBody>
              <Flex direction={"column"} gap={5}>
                <Flex direction={"row"} gap={5} alignItems={"start"}>
                  <Avatar src={shopData?.profile_picture} boxSize={20} />
                  <Flex
                    direction={"column"}
                    alignItems={"start"}
                    gap={0}
                    mt={2}
                  >
                    <Text
                      fontSize={"xl"}
                      fontWeight={"bold"}
                      textTransform={"none"}
                      noOfLines={1}
                      wordBreak={"break-all"}
                    >
                      {shopData?.name!}
                    </Text>
                    <Text
                      color={"lightDarken"}
                      fontWeight={"semibold"}
                      fontSize={{ base: "xs", lg: "sm" }}
                      noOfLines={1}
                      wordBreak={"break-all"}
                    >
                      @{shopData?.username!}
                    </Text>
                  </Flex>
                </Flex>

                <VStack align={"start"}>
                  <HStack mt={2}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={{ base: "xs", lg: "sm" }}
                      color={"dark"}
                    >
                      Location:{" "}
                    </Text>
                    <Text
                      fontWeight={"medium"}
                      fontSize={{ base: "xs", lg: "sm" }}
                      color={"dark"}
                    >
                      {shopData?.city!}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontWeight={"bold"}
                      fontSize={{ base: "xs", lg: "sm" }}
                      color={"dark"}
                    >
                      Join date:{" "}
                    </Text>
                    <Text
                      fontWeight={"medium"}
                      fontSize={{ base: "xs", lg: "sm" }}
                      color={"dark"}
                    >
                      {dayjs(shopData?.joined_at!).format("DD MMMM YYYY")}
                    </Text>
                  </HStack>
                </VStack>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <Card variant={"outline"} rounded={"xl"} bgColor={"white"}>
            <CardHeader>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Heading
                  color={"darkLighten"}
                  fontSize={"md"}
                  textTransform={"none"}
                >
                  Order Summary
                </Heading>
                <HStack alignItems={"center"}>
                  <Text as={Link} to={routes.SELLER_ORDER} variant={"link"}>
                    see more orders
                    <Icon.ChevronRight width={4} pb={"2px"} />
                  </Text>
                </HStack>
              </Flex>
            </CardHeader>
            <CardBody pt={0}>
              <Flex direction={"row"} justifyContent={"space-between"}>
                <Flex direction={"column"} align={"start"} gap={1}>
                  <Heading color={"dark"} fontSize={"sm"}>
                    Total Order
                  </Heading>
                  <Heading
                    color={"primaryDarken"}
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                    textTransform={"none"}
                  >
                    {shopData?.total_order!}
                  </Heading>
                </Flex>
                <Flex direction={"column"} align={"start"} gap={1}>
                  <Heading color={"dark"} fontSize={"sm"}>
                    New Order
                  </Heading>
                  <Heading
                    color={"primaryDarken"}
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                    textTransform={"none"}
                  >
                    {shopData?.new_order!}
                  </Heading>
                </Flex>
                <Flex direction={"column"} align={"start"} gap={1}>
                  <Heading color={"dark"} fontSize={"sm"}>
                    Ongoing Order
                  </Heading>
                  <Heading
                    color={"primaryDarken"}
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                    textTransform={"none"}
                  >
                    {shopData?.ongoing_order!}
                  </Heading>
                </Flex>
                <Flex direction={"column"} align={"start"} gap={1}>
                  <Heading color={"dark"} fontSize={"sm"}>
                    Completed Order
                  </Heading>
                  <Heading
                    color={"primaryDarken"}
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                    textTransform={"none"}
                  >
                    {shopData?.completed_order!}
                  </Heading>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card variant={"outline"} rounded={"xl"} bgColor={"white"}>
            <CardBody>
              <Heading color={"dark"} fontSize={"sm"}>
                Total Revenue
              </Heading>
              <Heading
                textAlign={"center"}
                mt={3}
                color={"primaryDarken"}
                fontSize={"4xl"}
                fontWeight={"bold"}
                textTransform={"none"}
              >
                Rp{formatCurrency(shopData?.total_sales!)},-
              </Heading>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card variant={"outline"} rounded={"xl"} bgColor={"white"}>
            <CardBody>
              <Heading color={"dark"} fontSize={"sm"}>
                Total products sold
              </Heading>
              <Heading
                textAlign={"center"}
                mt={3}
                color={"primaryDarken"}
                fontSize={"4xl"}
                fontWeight={"bold"}
                textTransform={"none"}
              >
                {shopData?.total_product_sold!}
              </Heading>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Home;
