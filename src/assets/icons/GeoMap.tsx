import { Icon, IconProps } from "@chakra-ui/react";

const GeoMap = (props: IconProps) => {
  return (
    <Icon
      width={props.width ? props.width : "1.2em"}
      height={props.height ? props.height : "1.2em"}
      {...props}
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </Icon>
  );
};

export default GeoMap;
