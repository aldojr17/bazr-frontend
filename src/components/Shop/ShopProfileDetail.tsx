import { Flex, Text } from "@chakra-ui/react";
import { IPropsShopProfileDetail } from "../../interfaces/Shop";

function ShopProfileDetail(props: IPropsShopProfileDetail) {
  return (
    <Flex direction="row" alignItems="center">
      <div className="pe-2">{props.icon}</div>
      {props.title}:&nbsp;&nbsp;
      <Text color="#FF3A4A">{props.value}</Text>
    </Flex>
  );
}

export default ShopProfileDetail;
