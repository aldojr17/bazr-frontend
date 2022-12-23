import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "light", // Normally, it is "semibold"
    borderRadius: "full",
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },
  // 3. We can add a new visual variant
  variants: {
    primary: {
      bg: "primary",
      color: "dark",
      boxShadow: "0 0 2px 2px #efdfde",
      _hover: {
        bg: "primaryLighten",
      },
      _active: {
        bg: "primaryDarken",
      },
    },
    secondary: {
      bg: "secondary",
      color: "dark",
      boxShadow: "0 0 2px 2px #efdfde",
      _hover: {
        bg: "secondaryLighten",
      },
      _active: {
        bg: "secondaryDarken",
      },
    },
    carousel: {
      bg: "#ed5b5b",
    },
    icon: {
      bg: "white",
      boxShadow: "rgb(49 53 59 / 12%) 0px 1px 6px 0px",
      borderColor: "dark",
    },
    // 4. We can override existing variants
    solid: (props: StyleFunctionProps) => ({
      bg: props.colorMode === "dark" ? "red.300" : "red.500",
    }),
    link: (props: StyleFunctionProps) => ({
      color: "secondary",
      _hover: {
        color: "secondaryLighten",
      },
      _active: {
        color: "secondaryDarken",
      },
    }),
    // 5. We can add responsive variants
    sm: {
      bg: "teal.500",
      fontSize: "md",
    },
  },
  // 6. We can overwrite defaultProps
  defaultProps: {
    // size: 'lg', // default is md
    variant: "primary", // default is solid
    // colorScheme: 'green', // default is gray
  },
});

export default Button;
