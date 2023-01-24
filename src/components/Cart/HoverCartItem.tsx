import { AspectRatio, HStack, Image, Text } from "@chakra-ui/react";
import { IHoverCartProps } from "../../interfaces/Cart";
import { formatCurrency, handleImageOnError } from "../../util/util";

const HoverCartItem = (props: IHoverCartProps) => {
  const { image, name, price } = props;

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"start"}
      spacing={3}
      width="100%"
    >
      <AspectRatio
        ratio={1}
        flex={"2"}
        maxWidth={14}
        border={"1px solid"}
        borderColor={"light"}
        borderRadius={"xl"}
        boxShadow={"default"}
      >
        <Image
          src={image}
          objectFit={"cover"}
          onError={handleImageOnError}
          borderRadius={"xl"}
        />
      </AspectRatio>
      <Text
        as="span"
        fontWeight={"semibold"}
        color={"dark"}
        textTransform={"uppercase"}
        noOfLines={1}
        textAlign={"start"}
        pt={1}
        flex={"1"}
      >
        {name}
      </Text>
      <Text
        as="span"
        fontWeight={"semibold"}
        color={"primary"}
        noOfLines={1}
        textAlign={"end"}
        pt={1}
      >
        Rp{formatCurrency(price!)}
      </Text>
    </HStack>
  );
};

export default HoverCartItem;
