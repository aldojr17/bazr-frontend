import { Box, Flex, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ISidebarProps } from "../../interfaces/Sidebar";
import routes from "../../routes/Routes";
import SidebarItem from "./SidebarItem";

function Sidebar(props: ISidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClickMenu = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string): boolean => {
    return "/" + location.pathname.split("/").slice(1, 3).join("/") === path;
  };

  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="white"
        color="inherit"
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="8" py="7">
          <Image
            loading="lazy"
            src="/logo.svg"
            width={"7em"}
            onClick={() => navigate(routes.HOME)}
            cursor={"pointer"}
          />
        </Flex>
        <Flex
          direction="column"
          as="nav"
          color="gray.600"
          aria-label="Main Navigation"
        >
          {props.menus.map((menu, index) => {
            return (
              <SidebarItem
                key={index}
                icon={menu.icon}
                isActive={isActive(menu.path)}
                onClick={() => handleOnClickMenu(menu.path)}
              >
                {menu.name}
              </SidebarItem>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}

export default Sidebar;
