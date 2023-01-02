import { Icon, IconProps } from "@chakra-ui/react";

const ChevronRight = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 16 16"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </Icon>
  );
};

export default ChevronRight;
