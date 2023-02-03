import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { INoProductContainerProps } from "../../interfaces/Components";

function NoProductContainer(props: INoProductContainerProps) {
  const { onReload } = props;

  return (
    <Box bgColor={"lightLighten"} py={28} borderRadius={"lg"}>
      <Center>
        <VStack>
          <Text>No products to display.</Text>
          {onReload ? (
            <Text
              as={Button}
              onClick={() => onReload && onReload()}
              alignItems={"center"}
              fontSize={"lg"}
            >
              <Icon.Refresh width={4} pb={"2px"} me={2} />
              Refresh
            </Text>
          ) : (
            ""
          )}
        </VStack>
      </Center>
    </Box>
  );
}

export default NoProductContainer;
