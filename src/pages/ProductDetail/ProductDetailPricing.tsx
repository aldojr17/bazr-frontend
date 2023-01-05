import { Heading, HStack } from "@chakra-ui/react";
import { IProductDetailPricingProps } from "../../interfaces/Product";
import { formatCurrency } from "../../util/util";

function ProductDetailPricing(props: IProductDetailPricingProps) {
  const { normalPrice, discountedPrice, showRange, minRange, maxRange } = props;

  return (
    <>
      {showRange && minRange !== maxRange ? (
        <Heading variant={"productNormalPrice"}>
          Rp {formatCurrency(minRange)} - Rp {formatCurrency(maxRange)}
        </Heading>
      ) : (
        <>
          {discountedPrice ? (
            <HStack>
              <Heading variant={"productOriginalPrice"}>
                Rp {formatCurrency(normalPrice)}
              </Heading>
              <Heading variant={"productDiscountedPrice"}>
                Rp {formatCurrency(discountedPrice)}
              </Heading>
            </HStack>
          ) : (
            <Heading variant={"productNormalPrice"}>
              Rp {formatCurrency(normalPrice)}
            </Heading>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetailPricing;
