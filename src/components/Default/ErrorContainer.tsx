import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { IErrorContainerProps } from "../../interfaces/Components";

function ErrorContainer(props: IErrorContainerProps) {
  const { onError } = props;

  return (
    <Box bgColor={"lightLighten"} py={28} borderRadius={"lg"}>
      <Center>
        <VStack>
          <Text>Something has occurred..</Text>
          <Text
            as={Button}
            onClick={() => onError && onError()}
            alignItems={"center"}
            fontSize={"lg"}
          >
            <Icon.Refresh width={4} pb={"2px"} me={2} />
            Refresh
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}

export default ErrorContainer;
