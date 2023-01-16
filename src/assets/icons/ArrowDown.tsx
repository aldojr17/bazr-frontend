import { Icon, IconProps } from "@chakra-ui/react";

const ArrowDown = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 16 16"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </Icon>
  );
};

export default ArrowDown;
