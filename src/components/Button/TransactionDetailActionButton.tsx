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
      paddingX={3}
      paddingY={1}
      my={1}
      borderRadius="lg"
      bg="primary"
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
