import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Icon from "../../assets/icons";
import useUser from "../../hooks/useUser";
import { IChatboxProps } from "../../interfaces/Components/Chatbox";
import ChatboxHeader from "./ChatboxHeader";
import ChatBubbleHost from "./ChatBubbleHost";
import ChatBubbleVisitor from "./ChatBubbleVisitor";

function Chatbox(props: IChatboxProps) {
  const { hostId, visitorName, chats, refundId, lastUpdated } = props;

  const { sendUserRefundChat } = useUser();

  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState(chats ?? []);
  const [isError, setIsError] = useState(false);

  const testRef = useRef(null);

  const handleSend = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isError) {
      return;
    }

    const _text = (e.currentTarget.children[0].children[0] as HTMLInputElement)
      .value;
    const _messages = messages ?? [];
    _messages.push({
      user_id: hostId,
      text: _text,
    });

    setMessages(_messages);

    setTextInput("");

    sendUserRefundChat({
      refunds_id: refundId,
      chat: _text,
    })
      .then((res) => !res.is_success && setIsError(true))
      .catch((err) => setIsError(true));
  };

  useEffect(() => {
    if (testRef && testRef.current !== null) {
      (testRef.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [textInput]);

  return (
    <Flex direction={"column"} borderRadius={"lg"} overflow={"hidden"}>
      <ChatboxHeader
        visitorName={visitorName}
        visitorProfilePicture="-"
        lastUpdated={lastUpdated}
      />
      <Flex
        p={3}
        maxHeight={"25rem"}
        minHeight={"25rem"}
        overflow={"auto"}
        backgroundColor={"lightLighten"}
        flex={2}
        gap={3}
        direction={"column"}
      >
        {messages &&
          messages.map((chat, index) =>
            chat.user_id === hostId ? (
              <ChatBubbleHost
                key={index}
                profilePicture=""
                message={chat.text}
              />
            ) : (
              <ChatBubbleVisitor
                key={index}
                profilePicture=""
                message={chat.text}
              />
            )
          )}
        <Text
          display={isError ? "block" : "none"}
          fontWeight={"medium"}
          fontSize={"xs"}
          color={"danger"}
          align={"end"}
        >
          Failed to send message. Please reopen chat window.
        </Text>
        <div ref={testRef} />
      </Flex>
      <form onSubmit={handleSend}>
        <Flex p={3} backgroundColor={"lightDarken"} direction={"row"} gap={2}>
          <Input
            value={textInput}
            variant={"outline"}
            backgroundColor={"white"}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <IconButton
            type={"submit"}
            aria-label="send"
            icon={<Icon.Send fill={"white"} />}
            disabled={isError}
          />
        </Flex>
      </form>
    </Flex>
  );
}

export default Chatbox;
