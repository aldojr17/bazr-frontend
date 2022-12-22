import { AspectRatio, Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import React from "react";
import { formatCurrency } from "../../util/util";

const ProductCard = () => {
  return (
    <Box>
      <AspectRatio
        ratio={1}
        width={{
          base: "250px",
          sm: "200px",
          md: "100%",
          lg: "100%",
          xl: "100%",
        }}
      >
        <Image src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png" />
      </AspectRatio>
      <Stack gap={1}>
        <Text marginTop={5} marginBottom={1} noOfLines={1}>
          Smartphones
        </Text>
        <Flex gap={2}>
          <Icon.Star fill={"orange"} />
          4.0
        </Flex>
        <HStack justifyContent={"space-between"}>
          <Text>Rp {formatCurrency(30000)}</Text>
          <Text>45 Sold</Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
