import { AspectRatio, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IHoverCartProps } from "../../interfaces/Cart";
import { formatCurrency } from "../../util/util";

const HoverCart = ({ ...props }: IHoverCartProps) => {
  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"start"}
      spacing={5}
      width="100%"
    >
      <AspectRatio ratio={1} flex={"2"} maxWidth={14}>
        <Image
          src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png"
          objectFit={"cover"}
        />
      </AspectRatio>
      <Text
        as="span"
        fontWeight={"semibold"}
        textTransform={"capitalize"}
        noOfLines={1}
        textAlign={"start"}
        flex={"4"}
      >
        {props.name}
      </Text>
      <Text
        as="span"
        fontWeight={"semibold"}
        color={"purple.600"}
        noOfLines={1}
        textAlign={"end"}
        flex={"2"}
      >
        Rp{formatCurrency(props.price!)}
      </Text>
    </HStack>
  );
};

export default HoverCart;
