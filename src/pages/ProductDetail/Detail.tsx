import { Box, Divider, Heading, HStack, Show } from "@chakra-ui/react";
import { IDetailProps } from "../../interfaces/Components/PDP";
import Description from "./Description";
import ProductAction from "./ProductAction";
import ProductDetailPricing from "./ProductDetailPricing";
import ProductDetailRating from "./ProductDetailRating";
import ShopDetail from "./ShopDetail";

function Detail(props: IDetailProps) {
  const {
    productId,
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
    productIsFavorite,
    productFavoriteCount,
  } = props;
  return (
    <Box>
      <Heading
        fontSize={{ base: "2xl", lg: "3xl" }}
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
        {productName}
      </Heading>
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
      <Show below={"lg"}>
        <HStack>
          <Divider
            variant={{ base: "solidPrimary", lg: "solidLight" }}
            my={1}
          />
          <ProductAction
            productId={productId}
            isFavorite={productIsFavorite}
            favoriteCount={productFavoriteCount}
          />
        </HStack>
      </Show>
      <Divider
        variant={"solidLight"}
        display={{ base: "none", lg: "block" }}
        my={1}
      />
      <Description description={productDescription} />
      <Divider variant={{ base: "solidPrimary", lg: "solidLight" }} my={5} />
      <ShopDetail shopId={shopId} />
    </Box>
  );
}

export default Detail;
