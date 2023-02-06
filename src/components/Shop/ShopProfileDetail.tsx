import { Flex, Text } from "@chakra-ui/react";
import { IPropsShopProfileDetail } from "../../interfaces/Shop";

function ShopProfileDetail(props: IPropsShopProfileDetail) {
  return (
    <Flex direction="row" alignItems="center" gap={3}>
      {props.icon}
      <Text fontWeight={"semibold"}>{props.title}:</Text>
      <Text color={"primaryDarken"} fontWeight={"semibold"}>
        {props.value}
      </Text>
    </Flex>
  );
}

export default ShopProfileDetail;
