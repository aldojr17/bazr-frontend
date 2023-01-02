import { extendTheme } from "@chakra-ui/react";
import { Button, Divider, Heading, Input, Select } from "./components";

export const customTheme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  colors: {
    primary: "#38B2AC", //teal.400
    primaryLighten: "#4FD1C5", //teal.300
    primaryDarken: "#319795", //teal.500
    secondary: "#6B46C1", //purple.600
    secondaryLighten: "#805AD5", //purple.500
    secondaryDarken: "#553C9A", //purple.700
    dark: "#212121",
    darkLighten: "#212121",
    light: "#212121",
    lightLighten: "#212121",
  },
  shadows: {
    default: "0px 8px 24px rgba(154, 170, 207, 0.15)",
  },
  styles: {
    global: {
      a: {
        fontWeight: "semibold",
        _hover: {
          textDecoration: "none",
          color: "primaryDarken",
        },
      },
      span: {
        fontWeight: "semibold",
      },
    },
  },
  components: {
    Button,
    Heading,
    Select,
    Divider,
    Input,
  },
});
