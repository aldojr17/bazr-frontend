import { Avatar, Flex } from "@chakra-ui/react";
import { IChatBubbleProps } from "../../interfaces/Components/Chatbox";

function ChatBubbleVisitor(props: IChatBubbleProps) {
  const { profilePicture, message } = props;

  return (
    <Flex
      direction={"row"}
      width={"100%"}
      justifyContent={"start"}
      alignItems={"end"}
      gap={2}
    >
      <Avatar src={profilePicture} boxSize={8} />
      <Flex
        color={"dark"}
        fontWeight={"medium"}
        backgroundColor={"primary"}
        borderRadius={"lg"}
        p={3}
        height={"fit-content"}
        maxW={"60%"}
      >
        {message}
      </Flex>
    </Flex>
  );
}

export default ChatBubbleVisitor;
