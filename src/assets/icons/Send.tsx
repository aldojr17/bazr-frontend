import { Icon, IconProps } from "@chakra-ui/react";

const Send = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
    </Icon>
  );
};

export default Send;
