import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import QuantitySelector from "../../components/Default/QuantitySelector";
import { IProductDetailQuantityProps } from "../../interfaces/Components/PDP";

function ProductDetailQuantity(props: IProductDetailQuantityProps) {
  const { stock, minQty, maxQty, onQuantityChange } = props;

  return (
    <>
      <Box p={3}>
        <Heading fontSize={"md"} mb={3}>
          Select amount:
        </Heading>
        <QuantitySelector
          minQty={minQty}
          maxQty={maxQty}
          stock={stock!}
          onQuantityChange={onQuantityChange}
          defaultValue={minQty}
          disabled={!stock || stock < minQty}
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
