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
      fontSize: "lg",
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
    },
  },
});

export default Text;
