import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/Routes";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      zIndex={9999}
      bg="gray.100"
    >
      <VStack alignItems={"start"} gap={6}>
        <VStack alignItems={"start"}>
          <Heading>Error 404: Page Not Found</Heading>
          <Text fontWeight={"semibold"} color={"darkLighten"}>
            We are working on something new... Stay tuned!
          </Text>
        </VStack>
        <Button colorScheme="linkedin" onClick={() => navigate(routes.HOME)}>
          Back To Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFound;
