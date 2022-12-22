import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components";

export const customTheme = extendTheme({
  colors: {
    primary: "#89D5C5",
    primaryLighten: "#A4DFD2",
    primaryDarken: "#86D5C4",
    secondary: "#949494",
    secondaryLighten: "#A3A3A3",
    secondaryDarken: "#8F8F8F",
    dark: "#212121",
    darkLighten: "#212121",
    light: "#212121",
    lightLighten: "#212121",
  },
  components: {
    Button,
    Divider: {
      baseStyle: {
        borderColor: "primary",
      },
    },
  },
});
