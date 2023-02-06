import { Icon, IconProps } from "@chakra-ui/react";

const Warning = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"></path>
      </g>
    </Icon>
  );
};

export default Warning;
