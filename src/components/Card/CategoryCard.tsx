import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const CategoryCard = () => {
  return (
    <Box>
      <Image
        src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png"
        height={"200px"}
        minWidth={"150px"}
      />
      <Text align={"center"} marginTop={5} marginBottom={3}>
        Smartphones
      </Text>
    </Box>
  );
};

export default CategoryCard;
