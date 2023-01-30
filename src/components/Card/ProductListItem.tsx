import { AspectRatio, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IProductListItemProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const ProductListItem = (props: IProductListItemProps) => {
  const { name, qty, total, variantName, onClick, disabled, productPhoto } =
    props;

  return (
    <HStack alignItems={"start"} gap={3} width={"100%"}>
      <AspectRatio ratio={1} minWidth={"4em"} borderRadius={"lg"}>
        <Image
          src={productPhoto}
          alt={name}
          fallbackSrc={"./image-fallback.png"}
          borderRadius={"lg"}
          opacity={disabled ? 0.5 : 1}
        />
      </AspectRatio>
      <VStack alignItems={"flex-start"} width="40%" spacing={1}>
        <Text
          textTransform={"uppercase"}
          fontWeight={"bold"}
          onClick={onClick}
          opacity={disabled ? 0.5 : 1}
          _hover={{ textDecoration: disabled ? "none" : "underline" }}
        >
          {name}
        </Text>
        <Text fontWeight={"semibold"} fontSize={"xs"} color={"gray.500"}>
          {variantName} - {qty} item(s)
        </Text>
        <Text
          color={"darkDarken"}
          fontSize={"sm"}
          fontWeight={"bold"}
          opacity={disabled ? 0.5 : 1}
        >
          Rp
          {formatCurrency(total)}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ProductListItem;
