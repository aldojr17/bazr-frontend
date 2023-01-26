import { Text, VStack } from "@chakra-ui/react";
import { IStoreListItemProps } from "../../interfaces/Components";

const StoreListItem = (props: IStoreListItemProps) => {
  return (
    <VStack alignItems={"start"} spacing={0} pb={3}>
      <Text fontWeight={"bold"}>{props.shopName}</Text>
      <Text fontSize={"sm"} fontWeight={"semibold"} color={"gray.500"}>
        {props.shopCityName}
      </Text>
    </VStack>
  );
};

export default StoreListItem;
