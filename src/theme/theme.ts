import { extendTheme } from "@chakra-ui/react";
import {
  Button,
  Divider,
  Heading,
  Input,
  Select,
  Text,
  Alert,
} from "./components";

export const customTheme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  colors: {
    primary: "#4FD1C5", //teal.300
    primaryLighten: "#81E6D9", //teal.200
    primaryDarken: "#38B2AC", //teal.400
    secondary: "#B794F4", //purple.300
    secondaryLighten: "#D6BCFA", //purple.200
    secondaryDarken: "#9F7AEA", //purple.400
    dark: "RGBA(0, 0, 0, 0.64)", //blackAlpha.700
    darkLighten: "RGBA(0, 0, 0, 0.48)", //blackAlpha.600
    darkDarken: "RGBA(0, 0, 0, 0.80)", //blackAlpha.800
    light: "#CBD5E0", //gray.300
    lightLighten: "#E2E8F0", //gray.200
    lightDarken: "#A0AEC0", //gray.400
    default: {
      100: "#8DE2D9",
      200: "#7DDED4",
      300: "#6DD9CF",
      400: "#5DD5C9",
      500: "#4FD1C5",
      600: "#3CCDBE",
      700: "#32C3B4",
      800: "#2EB2A5",
      900: "#2AA296",
    },
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
    Text,
    Alert,
  },
});
