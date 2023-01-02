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
        border: "3.5px solid",
        borderColor: "teal.400",
        borderRadius: "lg",
        fontSize: "md",
        fontWeight: "extrabold",
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
