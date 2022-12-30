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
    secondary: "#949494",
    secondaryLighten: "#A3A3A3",
    secondaryDarken: "#8F8F8F",
    dark: "#212121",
    darkLighten: "#212121",
    light: "#212121",
    lightLighten: "#212121",
  },
  shadows: {
    default: "0px 8px 24px rgba(154, 170, 207, 0.15)",
  },
  components: {
    Button,
    Heading,
    Select,
    Divider,
    Input,
  },
});
