import { AspectRatio, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IHoverCartProps } from "../../interfaces/Cart";
import { formatCurrency } from "../../util/util";

const HoverCartItem = (props: IHoverCartProps) => {
  const { image, name, variantName, quantity, price } = props;

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"start"}
      spacing={3}
      width="100%"
    >
      <AspectRatio ratio={1} minWidth={"4em"} borderRadius={"lg"}>
        <Image
          src={image}
          alt={name}
          fallbackSrc={"./image-fallback.png"}
          borderRadius={"lg"}
        />
      </AspectRatio>
      <VStack flex={2} alignItems={"flex-start"} width="40%" spacing={1}>
        <Text textTransform={"uppercase"} fontWeight={"bold"}>
          {name}
        </Text>
        <Text fontWeight={"semibold"} fontSize={"xs"} color={"gray.500"}>
          {variantName !== "DEFAULT" && `${variantName} - `}
          {quantity} {quantity > 1 ? "items" : "item"}
        </Text>
        <Text color={"dark"} fontSize={"sm"} fontWeight={"semibold"}>
          Rp {formatCurrency(price)}
        </Text>
      </VStack>
      <Text
        as="span"
        fontWeight={"bold"}
        color={"primary"}
        noOfLines={1}
        textAlign={"end"}
        pt={1}
      >
        Rp {formatCurrency(price * quantity)}
      </Text>
    </HStack>
  );
};

export default HoverCartItem;
