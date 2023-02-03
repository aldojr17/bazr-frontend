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
    filter: {
      addon: {
        backgroundColor: "lightLighten",
        border: "solid",
        borderColor: "lightLighten",
        color: "darkLighten",
        fontWeight: "semibold",
      },
      field: {
        border: "2px solid",
        borderColor: "lightLighten",
        color: "dark",
        fontWeight: "semibold",
        _placeholder: {
          opacity: 0.5,
        },
      },
    },
  },
  defaultProps: {},
});

export default Input;
