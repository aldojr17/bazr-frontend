import { Flex, Icon } from "@chakra-ui/react";
import { ISidebarItemProps } from "../../interfaces/Sidebar";

function SidebarItem(props: ISidebarItemProps) {
  return (
    <Flex
      align="center"
      px="4"
      pl="5"
      py="3"
      mx="3"
      my="1"
      rounded="lg"
      cursor="pointer"
      color={props.isActive ? "primaryDarken" : "inherit"}
      bgColor={props.isActive ? "gray.100" : "inherit"}
      _hover={{
        bg: "gray.100",
        color: "primaryDarken",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      onClick={props.onClick}
    >
      {props.icon && (
        <Icon
          me="5"
          boxSize="5"
          _groupHover={{
            color: "primaryDarken",
          }}
          as={props.icon}
        />
      )}
      {props.children}
    </Flex>
  );
}

export default SidebarItem;
