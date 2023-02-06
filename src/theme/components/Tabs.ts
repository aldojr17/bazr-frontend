import { defineStyleConfig } from "@chakra-ui/react";

const Tabs = defineStyleConfig({
  variants: {
    default: {
      tab: {
        mb: "-3px",
        fontSize: "lg",
        fontWeight: "semibold",
        color: "darkLighten",
        whiteSpace: "nowrap",
        _selected: {
          color: "primary",
          borderBottom: "3px solid",
        },
      },
      tablist: {
        mb: "-3px",
        borderBottom: "3px solid",
        borderColor: "blackAlpha.200",
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
