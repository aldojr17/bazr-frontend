import { Flex } from "@chakra-ui/react";

function TransactionDetailActionButton(props: {
  label: string;
  role?: string | undefined;
  onClick?: () => void | undefined;
}) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      paddingX={2}
      paddingY={1}
      marginBottom={1}
      borderRadius="lg"
      bg="teal.300"
      color="white"
      fontWeight="bold"
      fontSize="xs"
      role={props.role}
      onClick={props.onClick}
    >
      {props.label}
    </Flex>
  );
}

export default TransactionDetailActionButton;
