import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    productTitle: {
      fontSize: "3xl",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    productRating: {
      fontSize: "xl",
      fontWeight: "bold",
      color: "gray.600",
    },
    productNormalPrice: {
      fontSize: "3xl",
      fontWeight: "bold",
      color: "teal.400",
    },
    productOriginalPrice: {
      fontSize: "xl",
      color: "gray.500",
      textDecoration: "line-through",
    },
    productDiscountedPrice: {
      fontSize: "3xl",
      fontWeight: "bold",
      color: "red.400",
    },
    variantName: {
      fontSize: "md",
      color: "gray.600",
    },
    productShopName: {
      fontSize: "xl",
      fontWeight: "semibold",
    },
  },
  defaultProps: {
    variant: "productTitle",
  },
});

export default Heading;
