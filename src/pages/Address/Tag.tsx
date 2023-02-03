import { Text } from "@chakra-ui/react";

function Tag(props: { text: string }) {
  return (
    <Text
      border="2px"
      borderColor="teal.100"
      fontSize="smaller"
      color="teal.500"
      cursor="default"
      padding={1}
    >
      {props.text}
    </Text>
  );
}

export default Tag;
