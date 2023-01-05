import { Box, Flex } from "@chakra-ui/react";

function Review() {
  return (
    <Flex
      w={"100%"}
      direction={{ base: "column", lg: "row" }}
      gap={5}
      justifyContent={"space-between"}
    >
      <Box w={{ base: "100%", lg: "30%" }} bgColor={"gray.500"} p={"10"}>
        Product Review Summary and Filter
      </Box>
      <Box w={{ base: "100%", lg: "70%" }} bgColor={"teal.500"} p={"10"}>
        Product Review List
      </Box>
    </Flex>
  );
}

export default Review;
