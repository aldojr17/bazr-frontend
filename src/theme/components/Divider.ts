import { defineStyleConfig } from "@chakra-ui/react";

const Divider = defineStyleConfig({
  baseStyle: {
    borderColor: "primary",
  },
  variants: {
    solidPrimary: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "primary",
    },
    solidLight: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "light",
    },
  },
  defaultProps: {
    variant: "solidPrimary",
  },
});

export default Divider;
