import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import React from "react";
import { formatCurrency } from "../../util/util";

const ProductCard = () => {
  return (
    <Box>
      <Image
        src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png"
        height={"250px"}
        width={"250px"}
      />
      <Box maxWidth={"250px"}>
        <Text marginTop={5} marginBottom={1} noOfLines={1}>
          Smartphones
        </Text>
        <Flex gap={3}>
          <Icon.Star fill size={20} />
          4.0
        </Flex>
        <HStack justifyContent={"space-between"}>
          <Text>Rp {formatCurrency(30000)}</Text>
          <Text>Terjual 45</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
