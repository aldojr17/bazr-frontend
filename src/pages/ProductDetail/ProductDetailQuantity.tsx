import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import QuantitySelector from "../../components/Default/QuantitySelector";
import { IProductDetailQuantityProps } from "../../interfaces/Components/PDP";

function ProductDetailQuantity(props: IProductDetailQuantityProps) {
  const { stock, minQty, maxQty, onQuantityChange } = props;

  return (
    <>
      <Box p={3}>
        <Text fontWeight={"semibold"} fontSize={"lg"}>
          Select amount:
        </Text>
        <QuantitySelector
          minQty={minQty}
          maxQty={maxQty}
          stock={stock!}
          onQuantityChange={onQuantityChange}
        />

        {stock !== null && (
          <HStack>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Availability:
            </Text>
            <Text fontSize={"sm"} color="teal.400" fontWeight={"semibold"}>
              {stock}
            </Text>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              left in stock
            </Text>
          </HStack>
        )}

        {minQty > 1 && (
          <HStack>
            <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
              Min. order:
            </Text>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              {minQty}
            </Text>
            <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
              pcs
            </Text>
          </HStack>
        )}

        {maxQty > 0 && maxQty < stock! && (
          <HStack>
            <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
              Max. order:
            </Text>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              {maxQty}
            </Text>
            <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
              pcs
            </Text>
          </HStack>
        )}
      </Box>
      <Divider variant={"solidLight"} my={5} />
    </>
  );
}

export default ProductDetailQuantity;
