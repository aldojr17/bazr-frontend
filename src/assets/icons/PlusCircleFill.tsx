import { Icon, IconProps } from "@chakra-ui/react";

const PlusCircleFill = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 16 16"
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />{" "}
    </Icon>
  );
};

export default PlusCircleFill;
