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
    dark: "RGBA(0, 0, 0, 0.64)",
    darkLighten: "RGBA(0, 0, 0, 0.48)",
    light: "#CBD5E0", //gray.300
    lightLighten: "#E2E8F0", //gray.200
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
