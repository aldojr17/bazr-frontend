import { defineStyleConfig } from "@chakra-ui/react";

const Tabs = defineStyleConfig({
  variants: {
    default: {
      tab: {
        fontSize: "lg",
        fontWeight: "semibold",
        color: "darkLighten",
        borderBottom: "3px solid",
        borderColor: "blackAlpha.200",
        _selected: {
          color: "primary",
          borderBottom: "3px solid",
        },
      },
    },
  },
});

export default Tabs;
