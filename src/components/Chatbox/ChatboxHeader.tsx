import { Avatar, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IChatboxHeaderProps } from "../../interfaces/Components/Chatbox";

function ChatboxHeader(props: IChatboxHeaderProps) {
  const { visitorProfilePicture, visitorName, lastUpdated } = props;

  return (
    <Flex
      p={3}
      backgroundColor={"light"}
      direction={"row"}
      alignItems={"center"}
      gap={3}
    >
      <Avatar src={visitorProfilePicture} boxSize={10} />
      <Flex direction={"column"}>
        <Text fontWeight={"semibold"} fontSize={"lg"}>
          {visitorName}
        </Text>
        <Text color={"darkLighten"} fontWeight={"medium"} fontSize={"sm"}>
          last updated: {dayjs(lastUpdated).format("HH:mm [ - ] MMMM DD, YYYY")}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ChatboxHeader;
