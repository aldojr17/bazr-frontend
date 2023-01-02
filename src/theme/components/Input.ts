import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    quantity: {
      field: {
        border: "none",

        _hover: {
          border: "3px solid",
          borderColor: "primary",
          transition: "none",
        },
        _focus: {
          border: "3px solid",
          borderColor: "primary",
        },
      },
    },
  },
  defaultProps: {},
});

export default Input;
