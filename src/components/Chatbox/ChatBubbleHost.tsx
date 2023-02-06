import { Avatar, Flex } from "@chakra-ui/react";
import { IChatBubbleProps } from "../../interfaces/Components/Chatbox";

function ChatBubbleHost(props: IChatBubbleProps) {
  const { profilePicture, message } = props;

  return (
    <Flex
      direction={"row"}
      width={"100%"}
      justifyContent={"end"}
      alignItems={"end"}
      gap={2}
    >
      <Flex
        color={"dark"}
        fontWeight={"medium"}
        backgroundColor={"light"}
        borderRadius={"lg"}
        p={3}
        height={"fit-content"}
        maxW={"60%"}
      >
        {message}
      </Flex>
      <Avatar src={profilePicture} boxSize={8} />
    </Flex>
  );
}

export default ChatBubbleHost;
