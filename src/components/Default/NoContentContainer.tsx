import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { INoContentContainerProps } from "../../interfaces/Components";

function NoContentContainer(props: INoContentContainerProps) {
  const { message, onReload, innerPadding } = props;
  return (
    <Box bgColor={"lightLighten"} py={innerPadding ?? 14} borderRadius={"lg"}>
      <Center>
        <VStack>
          <Text>{message}</Text>
          {onReload && (
            <Text
              as={Button}
              onClick={() => onReload && onReload()}
              alignItems={"center"}
              fontSize={"lg"}
            >
              <Icon.Refresh width={4} pb={"2px"} me={2} />
              Refresh
            </Text>
          )}
        </VStack>
      </Center>
    </Box>
  );
}

export default NoContentContainer;
