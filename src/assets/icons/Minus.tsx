import { Icon, IconProps } from "@chakra-ui/react";

const Minus = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 16 16"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
      />
    </Icon>
  );
};

export default Minus;
