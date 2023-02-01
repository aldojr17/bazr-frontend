import { Box, Flex, Text, Image, Divider } from "@chakra-ui/react";
import Barcode from "react-barcode";
import React, { useEffect, useState } from "react";
import { IShopOrderDetailFullPayload } from "../../../interfaces/Order";
import useShop from "../../../hooks/useShop";
import { IShopProfilePayload } from "../../../interfaces/Shop";
import { formatCurrency } from "../../../util/util";

const DeliveryLabelTemplate = React.forwardRef<
  HTMLDivElement,
  IShopOrderDetailFullPayload
>((props: IShopOrderDetailFullPayload, ref) => {
  const { fetchShopProfileById } = useShop();
  const [shop, setShop] = useState<IShopProfilePayload>();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const updateShopDetail = async () => {
    const response = await fetchShopProfileById(props.shop_id);
    setShop(response ? response : undefined);
  };

  useEffect(() => {
    updateShopDetail();
  });

  return (
    <div ref={ref}>
      <Box bg="white">
        <Flex direction={"column"} width="80%" border={"2px"} p={5}>
          <Flex
            direction={"row"}
            width="100%"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Image boxSize={"85px"} src="/logo.svg"></Image>
            <Text fontSize={"35px"} fontWeight={"bold"}>
              REG
            </Text>
            <Text fontSize={"30px"} fontWeight={"semibold"}>
              {props.delivery_detail.courier_name}
            </Text>
          </Flex>
          <Divider border={"5px"} my={3} />
          <Flex direction={"column"} width="100%" alignItems="center">
            <Text
              fontSize={"25px"}
              fontWeight={"semibold"}
              border={"2px"}
              width="100%"
              textAlign={"center"}
              p={3}
            >
              {"Order No: " + props.order_id}
            </Text>
            <Barcode
              width={1}
              value={
                String(props.order_id) +
                String(props.transaction_detail.transaction_date)
              }
            />
          </Flex>
          <Divider border={"5px"} my={3} />
          <Flex direction={"row"} width={"100%"} gap={2}>
            <Flex direction={"column"} width={"50%"}>
              <Text fontSize={"23px"} fontWeight={"semibold"}>
                Reciever:
              </Text>
              <Text fontSize={"18px"} fontWeight="medium">
                {props.transaction_detail.address.recipient_name}
              </Text>
              <Text fontSize={"18px"}>
                {props.transaction_detail.address.street_name +
                  ", " +
                  props.transaction_detail.address.district_ward +
                  ", " +
                  props.transaction_detail.address.sub_district +
                  ", " +
                  props.transaction_detail.address.zip_code}
              </Text>
              <Text fontSize={"18px"}>
                {props.transaction_detail.address.recipient_phone}
              </Text>
            </Flex>
            <Flex direction={"column"} width={"50%"}>
              <Text fontSize={"23px"} fontWeight={"semibold"}>
                Sender:
              </Text>
              <Text fontSize={"18px"} fontWeight="medium">
                {shop?.name}
              </Text>
              <Text fontSize={"18px"}>{shop?.city}</Text>
            </Flex>
          </Flex>
          <Divider border={"5px"} my={3} />
          <Flex direction={"row"} width={"100%"} gap={2}>
            <Flex
              direction={"column"}
              width={"50%"}
              justifyContent="center"
              fontSize={"18px"}
            >
              <Flex
                direction="row"
                width="100%"
                justifyContent={"space-between"}
              >
                <Text fontSize={"18px"} fontWeight="medium">
                  Payment Method:
                </Text>
                <Text fontSize={"18px"}>
                  {props.transaction_detail.payment_method}
                </Text>
              </Flex>
              <Divider />
              <Flex
                direction="row"
                width="100%"
                justifyContent={"space-between"}
              >
                <Text fontSize={"18px"} fontWeight="medium">
                  Order Total:
                </Text>
                <Text fontSize={"18px"}>
                  {"Rp" + formatCurrency(props.total)}
                </Text>
              </Flex>
              <Divider />
              <Flex
                direction="row"
                width="100%"
                justifyContent={"space-between"}
              >
                <Text fontSize={"18px"} fontWeight="medium">
                  Process Date:
                </Text>
                <Text fontSize={"18px"}>{date}</Text>
              </Flex>
            </Flex>
            <Flex direction={"column"} width={"50%"} alignItems={"center"}>
              <Barcode
                width={1}
                value={
                  "SKU" +
                  String(props.order_id) +
                  String(props.transaction_detail.transaction_id) +
                  "0123"
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
});

export default DeliveryLabelTemplate;
