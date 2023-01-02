import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IToastProps } from "../../interfaces/Components";

const Toast = (props: IToastProps) => {
  return (
    <Box
      py={2}
      px={3}
      width={{
        base: "15em",
        sm: "20em",
        md: "20em",
        lg: "20em",
        xl: "20em",
      }}
      color={"white"}
      backgroundColor={"primary"}
      borderRadius={"lg"}
      mx={"auto"}
    >
      <HStack width={"100%"} justifyContent={"space-between"}>
        <Text
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "lg",
            xl: "lg",
          }}
        >
          {props.description}
        </Text>
        <Button variant={"unstyled"} onClick={props.onClick}>
          {props.isUpdated ? "OK" : "Undo"}
        </Button>
      </HStack>
    </Box>
  );
};

export default Toast;
