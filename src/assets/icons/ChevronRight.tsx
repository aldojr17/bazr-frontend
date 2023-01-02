import { Icon, IconProps } from "@chakra-ui/react";

const ChevronRight = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </Icon>
  );
};

export default ChevronRight;
