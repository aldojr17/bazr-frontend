import { defineStyleConfig } from "@chakra-ui/react";

const Divider = defineStyleConfig({
  baseStyle: {
    borderColor: "primary",
  },
  variants: {
    solidPrimary: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "primary",
    },
    solidLight: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: "lightLighten",
    },
  },
  defaultProps: {
    variant: "solidPrimary",
  },
});

export default Divider;
