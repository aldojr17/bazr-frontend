import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import QuantitySelector from "../../components/Default/QuantitySelector";
import { IProductDetailQuantityProps } from "../../interfaces/Components/PDP";

function ProductDetailQuantity(props: IProductDetailQuantityProps) {
  const { stock, minQty, maxQty, isVariantSelected, onQuantityChange } = props;

  return (
    <>
      <Box px={3} py={{ base: 0, lg: 3 }}>
        <Heading fontSize={{ base: "sm", lg: "md" }} mb={{ base: 0, lg: 3 }}>
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

        {isVariantSelected && (
          <>
            {stock !== null ? (
              <>
                <HStack>
                  <Text fontSize={"sm"} fontWeight={"semibold"}>
                    Availability:
                  </Text>
                  <Text
                    fontSize={"sm"}
                    color="teal.400"
                    fontWeight={"semibold"}
                  >
                    {stock}
                  </Text>
                  <Text fontSize={"sm"} fontWeight={"semibold"}>
                    left in stock
                  </Text>
                </HStack>

                {minQty > 1 && (
                  <HStack>
                    <Text
                      fontSize={"xs"}
                      color="purple.500"
                      fontWeight={"semibold"}
                    >
                      Min. order:
                    </Text>
                    <Text fontSize={"xs"} fontWeight={"semibold"}>
                      {minQty}
                    </Text>
                    <Text
                      fontSize={"xs"}
                      color="purple.500"
                      fontWeight={"semibold"}
                    >
                      pcs
                    </Text>
                  </HStack>
                )}

                {maxQty > 0 && maxQty < stock! && (
                  <HStack>
                    <Text
                      fontSize={"xs"}
                      color="purple.500"
                      fontWeight={"semibold"}
                    >
                      Max. order:
                    </Text>
                    <Text fontSize={"xs"} fontWeight={"semibold"}>
                      {maxQty}
                    </Text>
                    <Text
                      fontSize={"xs"}
                      color="purple.500"
                      fontWeight={"semibold"}
                    >
                      pcs
                    </Text>
                  </HStack>
                )}
              </>
            ) : (
              <Text
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={"darkLighten"}
                align={"end"}
              >
                out of stock
              </Text>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default ProductDetailQuantity;
