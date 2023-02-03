import { Icon, IconProps } from "@chakra-ui/react";

const ChevronDown = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
    </Icon>
  );
};

export default ChevronDown;
