import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    default: {
      fontSize: "sm",
      fontWeight: "normal",
    },
    productCardTitle: {
      fontSize: "sm",
      textTransform: "uppercase",
      fontWeight: "semibold",
    },
    productCardPrice: {
      fontSize: "xl",
      fontWeight: "bold",
      color: "primary",
    },
    productCardRating: {
      fontSize: "sm",
      fontWeight: "semibold",
      color: "dark",
    },
    productCardReview: {
      fontSize: "sm",
      fontWeight: "semibold",
      color: "darkLighten",
    },
    link: {
      fontSize: "sm",
      fontWeight: "semibold",
      color: "primary",
      _hover: {
        color: "primaryDarken",
      },
    },
    footerItem: {
      marginY: 3,
      fontSize: "sm",
      fontWeight: "semibold",
      color: "darkLighten",
    },
  },
});

export default Text;
