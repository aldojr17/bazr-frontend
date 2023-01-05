import { Box, Divider, Heading } from "@chakra-ui/react";
import { IDetailProps } from "../../interfaces/Product";
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
    shopId,
    selectedVariant,
  } = props;
  return (
    <Box>
      <ProductDetailRating rating={productRating} review={productReview} />
      <Heading variant={"productTitle"} mt={2} mb={1}>
        {productName}
      </Heading>
      <ProductDetailPricing
        showRange={selectedVariant.id === 0}
        minRange={productMinPrice!}
        maxRange={productMaxPrice!}
        normalPrice={selectedVariant.price!}
        // discountedPrice={7000}
      />
      <Divider variant={{ base: "solidPrimary", lg: "solidLight" }} my={10} />
      <Description />
      <Divider variant={{ base: "solidPrimary", lg: "solidLight" }} my={10} />
      <ShopDetail shopId={shopId} />
    </Box>
  );
}

export default Detail;
