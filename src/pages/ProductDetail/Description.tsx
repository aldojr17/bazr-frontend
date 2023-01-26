import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { IDescriptionProps } from "../../interfaces/Components/PDP";

function Description(props: IDescriptionProps) {
  const { description } = props;

  return (
    <Box my={5}>
      <Heading fontSize={"md"} mb={3}>
        Description
      </Heading>
      <Text fontWeight={"normal"} fontSize={"md"}>
        {description}
      </Text>
    </Box>
  );
}

export default Description;
