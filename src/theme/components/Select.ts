import { defineStyleConfig } from "@chakra-ui/react";

const Select = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    default: {
      field: {
        height: "fit-content",
        paddingY: "2",
        paddingStart: "2",
        paddingInlineEnd: "10",
        border: "2.5px solid",
        borderColor: "primary",
        borderRadius: "lg",
        fontSize: "sm",
        fontWeight: "semibold",
      },
      icon: {
        color: "teal.400",
      },
    },
  },
  defaultProps: {
    variant: "default",
  },
});

export default Select;
