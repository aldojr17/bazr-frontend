import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";
import { NavbarProps } from "../../interfaces/Navbar";
import routes from "../../routes/Routes";

const AdminNavbar = (props: NavbarProps) => {
  const { user } = useUser();

  const { clearUserCart } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    destroyCookie(null, "auth");
    localStorage.clear();
    clearUserCart();
    navigate(routes.LOGIN, { replace: true });
  };

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
        <Popover placement={"bottom-start"} isLazy trigger="hover">
          <PopoverTrigger>
            <Avatar
              name="Profile Picture"
              src={user?.profile_picture}
              cursor="pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverFooter px={5}>
              <Flex justifyContent={"end"}>
                <Button
                  variant={"primaryLink"}
                  size={"md"}
                  onClick={handleLogout}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={2}
                >
                  Logout
                  <Icon.Logout fill={"primary"} />
                </Button>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Center>
    </Flex>
  );
};

export default AdminNavbar;
