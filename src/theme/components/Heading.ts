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
      fontSize: "md",
      fontWeight: "semibold",
      color: "gray.600",
    },
    productNormalPrice: {
      fontSize: "3xl",
      fontWeight: "bold",
      color: "primary",
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
      fontSize: "sm",
      fontWeight: "semibold",
    },
    productShopName: {
      fontSize: "xl",
      fontWeight: "bold",
    },
    sectionHeading: {
      textTransform: "uppercase",
      fontWeight: "bold",
      marginBottom: 3,
    },
  },
  defaultProps: {
    variant: "productTitle",
  },
});

export default Heading;
