import { Box, Divider, Heading } from "@chakra-ui/react";
import { IDetailProps } from "../../interfaces/Components/PDP";
import Description from "./Description";
import ProductDetailPricing from "./ProductDetailPricing";
import ProductDetailRating from "./ProductDetailRating";
import ShopDetail from "./ShopDetail";

function Detail(props: IDetailProps) {
  const {
    productName,
    productMinPrice,
    productMaxPrice,
    productRating,
    productReview,
    productView,
    productSoldCount,
    shopId,
    selectedVariant,
    productDescription,
  } = props;
  return (
    <Box>
      <Heading variant={"productTitle"}>{productName}</Heading>
      <ProductDetailRating
        rating={productRating}
        review={productReview}
        soldCount={productSoldCount}
      />

      <ProductDetailPricing
        showRange={selectedVariant.id === 0}
        minRange={productMinPrice!}
        maxRange={productMaxPrice!}
        normalPrice={selectedVariant.price!}
        discountedPrice={selectedVariant.discounted_price!}
      />
      <Divider variant={{ base: "solidPrimary", lg: "solidLight" }} my={1} />
      <Description description={productDescription} />
      <Divider variant={{ base: "solidPrimary", lg: "solidLight" }} my={10} />
      <ShopDetail shopId={shopId} />
    </Box>
  );
}

export default Detail;
