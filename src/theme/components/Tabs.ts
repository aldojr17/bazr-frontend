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
    customEnclosed: {
      tab: {
        mb: "-2px",
        borderColor: "transparent",
        borderTopRadius: "md",
        color: "darkLighten",
        fontWeight: "semibold",
        _selected: {
          color: "primary",
          border: "2px solid",
          borderColor: "lightLighten",
          borderBottomColor: "white",
        },
      },
      tablist: {
        mb: "-2px",
        borderBottom: "2px solid",
        borderColor: "lightLighten",
      },
    },
  },
});

export default Tabs;
