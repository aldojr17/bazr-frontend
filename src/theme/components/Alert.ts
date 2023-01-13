import { defineStyleConfig } from "@chakra-ui/react";

const Alert = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    successToast: {
      container: {
        bg: "primary",
        color: "white",
        boxShadow: "default",
      },
    },
    errorToast: {
      container: {
        bg: "red.400",
        color: "white",
        boxShadow: "default",
      },
    },
    infoToast: {
      container: {
        bg: "darkLighten",
        color: "white",
        boxShadow: "default",
      },
    },
  },
  defaultProps: {},
});

export default Alert;
