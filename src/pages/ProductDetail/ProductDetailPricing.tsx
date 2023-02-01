import { Box, Flex, Heading, HStack, Show, Text } from "@chakra-ui/react";
import { IProductDetailPricingProps } from "../../interfaces/Components/PDP";
import { formatCurrency } from "../../util/util";

function ProductDetailPricing(props: IProductDetailPricingProps) {
  const { normalPrice, discountedPrice, showRange, minRange, maxRange } = props;

  return (
    <Box my={{ base: 0, lg: 5 }}>
      {showRange && minRange !== maxRange ? (
        <>
          <Show below={"lg"}>
            <Flex direction={"row"} align={"start"}>
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                color={"darkLighten"}
                mt={1}
              >
                starts from
              </Text>
              <Heading variant={"productNormalPrice"} ms={1}>
                Rp{formatCurrency(minRange!)}
              </Heading>
            </Flex>
          </Show>
          <Show above={"lg"}>
            <Heading
              variant={"productNormalPrice"}
              noOfLines={1}
              wordBreak={"break-all"}
            >
              Rp{formatCurrency(minRange!)} - Rp{formatCurrency(maxRange!)}
            </Heading>
          </Show>
        </>
      ) : (
        <>
          {discountedPrice ? (
            <HStack>
              <Heading variant={"productOriginalPrice"}>
                Rp{formatCurrency(normalPrice)}
              </Heading>
              <Heading variant={"productDiscountedPrice"}>
                Rp{formatCurrency(discountedPrice)}
              </Heading>
            </HStack>
          ) : (
            <Heading variant={"productNormalPrice"}>
              Rp{formatCurrency(normalPrice)}
            </Heading>
          )}
        </>
      )}
    </Box>
  );
}

export default ProductDetailPricing;
