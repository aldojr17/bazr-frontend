import { Avatar, Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useUser from "../../hooks/useUser";
import { NavbarProps } from "../../interfaces/Navbar";

const AdminNavbar = (props: NavbarProps) => {
  const { user } = useUser();

  return (
    <Flex
      as="header"
      align="center"
      justify={{ base: "space-between", md: "space-between" }}
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
        icon={<Icon.Hamburger fill={"lightDarken"} />}
      />

      <Heading color={"primaryDarken"} fontSize={"2xl"}>
        Admin Dashboard
      </Heading>

      <Center>
        <Avatar
          name="Profile Picture"
          src={user?.profile_picture}
          cursor="pointer"
        />
      </Center>
    </Flex>
  );
};

export default AdminNavbar;
