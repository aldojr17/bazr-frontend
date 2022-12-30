import { Heading, HStack } from "@chakra-ui/react";
import { getPriceString } from "../../util/util";

interface IProductDetailPricingProps {
  normalPrice: number;
  discountedPrice?: number;
}

function ProductDetailPricing(props: IProductDetailPricingProps) {
  const { normalPrice, discountedPrice } = props;

  return (
    <>
      {discountedPrice ? (
        <HStack>
          <Heading variant={"productOriginalPrice"}>
            Rp {getPriceString(normalPrice)}
          </Heading>
          <Heading variant={"productDiscountedPrice"}>
            Rp {getPriceString(discountedPrice)}
          </Heading>
        </HStack>
      ) : (
        <Heading variant={"productNormalPrice"}>
          Rp {getPriceString(normalPrice)}
        </Heading>
      )}
    </>
  );
}

export default ProductDetailPricing;
