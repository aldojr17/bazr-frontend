import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "lg",
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
      color: "white",
      boxShadow: "default",
      _hover: {
        bg: "primaryLighten",
      },
      _active: {
        bg: "primaryDarken",
      },
    },
    primaryOutline: {
      bg: "white",
      color: "primary",
      border: "4px solid",
      borderColor: "teal.400",
      borderRadius: "lg",
      boxShadow: "default",
      _hover: {
        bg: "primary",
        color: "white",
      },
      _active: {
        bg: "primaryDarken",
        borderColor: "primaryDarken",
        color: "white",
      },
    },
    secondary: {
      bg: "secondary",
      color: "dark",
      boxShadow: "default",
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
      bg: "primaryDarken",
      fontSize: "md",
    },
    quantity: {
      color: "primary",
      backgroundColor: "white",
      fontWeight: "bold",
      fontSize: "md",
      width: "8",
      height: "8",
      minWidth: "0",
      minHeight: "0",
      borderRadius: "full",
      border: "3px solid",
      borderColor: "transparent",
      paddingInline: "0",

      _hover: {
        border: "3px solid",
        borderColor: "primary",
      },
      _active: {
        backgroundColor: "primary",
        color: "white",
      },
    },
    outline: {
      border: "4px solid",
      borderColor: "primary",
      borderRadius: "lg",
      color: "teal.400",
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
