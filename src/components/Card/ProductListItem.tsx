import {
  AspectRatio,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IProductListItemProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const ProductListItem = (props: IProductListItemProps) => {
  const {
    name,
    qty,
    regularPrice,
    discountedPrice,
    total,
    variantName,
    onClick,
    disabled,
    productPhoto,
  } = props;

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
      <VStack alignItems={"flex-start"} flexGrow={2} spacing={1}>
        <Text
          role="button"
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
        <Flex direction={"row"} justifyContent={"space-between"} width={"100%"}>
          {discountedPrice !== 0 ? (
            <Flex direction={"row"} gap={1}>
              <Text
                fontSize={"sm"}
                color={"gray.500"}
                textDecor={"line-through"}
                fontWeight={"bold"}
              >
                Rp{formatCurrency(regularPrice)}
              </Text>
              <Text fontSize={"md"} color={"red.400"} fontWeight={"bold"}>
                Rp{formatCurrency(discountedPrice)}
              </Text>
            </Flex>
          ) : (
            <Text
              color={"darkDarken"}
              fontSize={"sm"}
              fontWeight={"bold"}
              opacity={disabled ? 0.5 : 1}
            >
              Rp
              {formatCurrency(regularPrice)}
            </Text>
          )}
          <Text
            color={"darkDarken"}
            fontSize={"sm"}
            fontWeight={"bold"}
            opacity={disabled ? 0.5 : 1}
          >
            Rp
            {formatCurrency(total)}
          </Text>
        </Flex>
      </VStack>
    </HStack>
  );
};

export default ProductListItem;
