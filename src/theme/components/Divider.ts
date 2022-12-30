import { defineStyleConfig } from "@chakra-ui/react";

const Divider = defineStyleConfig({
    baseStyle: {
        borderColor: "primary",
    },
    sizes: {
    },
    variants: {
        solidPrimary: {
            borderWidth: '5px',
            borderStyle: "solid",
            borderRadius: 10,
            borderColor: "primary",
        },
    },
    defaultProps: {
        variant: "solidPrimary",
    },
});

export default Divider;
