import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
  Text,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { IOrderSummaryCardProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const OrderSummaryCard = ({ ...props }: IOrderSummaryCardProps) => {
  return (
    <Card width="35vw">
      <CardBody>
        <Stack spacing="4">
          <Skeleton isLoaded={!props.isLoading}>
            <Box>
              <Heading size="md">Order Summary</Heading>
              <Divider borderColor={"blue"} />
            </Box>
            <Box>
              <Grid templateColumns="repeat(2, 1fr)" gap={6} pt="3">
                <GridItem>
                  <Text pt="2" fontSize="md">
                    Total Items ({props.checkoutCart.length} products)
                  </Text>
                </GridItem>
                <GridItem>
                  <Text pt="2" fontSize="md" align="right">
                    Rp{formatCurrency(props.grandTotal)}
                  </Text>
                </GridItem>
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={6} pb="3">
                <GridItem>
                  <Text pt="2" fontSize="md">
                    Delivery Fee
                  </Text>
                </GridItem>
                <GridItem>
                  <Text pt="2" fontSize="md" align="right">
                    Rp10.000
                  </Text>
                </GridItem>
              </Grid>
              <Divider borderColor={"blue"} borderBottomWidth={"0.1em"} />
              <HStack width="100%" justifyContent={"space-between"} py={5}>
                <Text fontSize="md" as="b">
                  Total Payment
                </Text>
                <Text fontSize="md" as="b">
                  Rp{formatCurrency(props.grandTotal + 10000)}
                </Text>
              </HStack>
              <Divider borderColor={"blue"} />
            </Box>
            <Box my={5} width="100%">
              <Text pb={3} fontWeight={"bold"}>
                Select Payment Method
              </Text>
              <Flex justifyContent={"space-around"}>
                <Box
                  border={"3px solid"}
                  borderColor={
                    props.paymentMethod === 1 ? "green.600" : "darkLighten"
                  }
                  backgroundColor={
                    props.paymentMethod === 1 ? "green.200" : "white"
                  }
                  width="45%"
                  as={Button}
                  variant={"paymentMethod"}
                  onClick={() => props.setPaymentMethod(1)}
                >
                  <Flex
                    flexWrap={"wrap"}
                    gap={4}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Icon.Wallet boxSize={8} />
                    <Flex
                      alignItems={{ base: "center", xl: "start" }}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Text fontWeight={"bold"}>My Wallet </Text>
                      <Text fontSize={"13px"}>
                        Rp {formatCurrency(props.user?.wallet_detail.balance!)}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
                <Box
                  border={"3px solid"}
                  borderColor={
                    props.paymentMethod === 2 ? "secondary" : "darkLighten"
                  }
                  backgroundColor={
                    props.paymentMethod === 2 ? "secondaryLighten" : "white"
                  }
                  width="45%"
                  as={Button}
                  variant={"paymentMethod"}
                  onClick={() => props.setPaymentMethod(2)}
                >
                  <Flex
                    flexWrap={"wrap"}
                    gap={4}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Icon.SeaPay boxSize={8} />
                    <Text fontWeight={"bold"}>SeaLabs Pay</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box pt={3}>
              <Button
                variant="solid"
                colorScheme="blue"
                width="100%"
                onClick={() => props.onOpen()}
                isDisabled={props.payload.total === 0}
              >
                Place Order
              </Button>
            </Box>
          </Skeleton>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default OrderSummaryCard;
