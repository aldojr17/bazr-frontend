import { Text, VStack } from "@chakra-ui/react";
import { IStoreListItemProps } from "../../interfaces/Components";

const StoreListItem = (props: IStoreListItemProps) => {
  const { shopName, shopCityName } = props;

  return (
    <VStack alignItems={"start"} spacing={0} pb={3}>
      <Text fontWeight={"bold"}>{shopName}</Text>
      <Text fontSize={"sm"} fontWeight={"semibold"} color={"gray.500"}>
        {shopCityName}
      </Text>
    </VStack>
  );
};

export default StoreListItem;
