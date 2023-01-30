import { Avatar, Flex, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import useUser from "../../hooks/useUser";
import { NavbarProps } from "../../interfaces/Navbar";

const SellerNavbar = (props: NavbarProps) => {
  const { user } = useUser();

  return (
    <Flex
      as="header"
      align="center"
      justify={{ base: "space-between", md: "end" }}
      w="full"
      px="5"
      bg="white"
      borderBottomWidth="1px"
      h="70px"
    >
      <IconButton
        aria-label="Menu"
        display={{ base: "inline-flex", md: "none" }}
        onClick={props.onOpen}
        icon={<FiMenu />}
      />

      <Flex align="center">
        <Avatar
          name="Profile Picture"
          src={user?.profile_picture}
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
};

export default SellerNavbar;
