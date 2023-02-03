import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import routes from "../../routes/Routes";

function MobileBottomNavbar() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("/");
  const { cart } = useCart();

  const handleSelectMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectedMenu(event.currentTarget.id);
    navigate(event.currentTarget.id);
  };

  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      bg={"lightLighten"}
      borderTop={"2px solid"}
      borderColor={"primary"}
      position={"sticky"}
      bottom={0}
      gap={2}
      px={2}
      py={2}
    >
      <Button
        id={"/"}
        width={"20%"}
        variant={"unstyled"}
        height={"fit-content"}
        onClick={handleSelectMenu}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <Icon.Home
            boxSize={5}
            fill={`${selectedMenu === "/" ? "primary" : "dark"}`}
          />
          <Text
            variant={"unstyled"}
            fontSize={"2xs"}
            color={`${selectedMenu === "/" ? "darkDarken" : "darkLighten"}`}
            my={1}
          >
            Home
          </Text>
        </Flex>
      </Button>
      <Button
        id={"/categories"}
        width={"20%"}
        variant={"unstyled"}
        height={"fit-content"}
        onClick={handleSelectMenu}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <Icon.Dots
            boxSize={5}
            fill={`${selectedMenu === "/categories" ? "primary" : "dark"}`}
          />
          <Text
            variant={"unstyled"}
            fontSize={"2xs"}
            color={`${
              selectedMenu === "/categories" ? "darkDarken" : "darkLighten"
            }`}
            my={1}
          >
            Categories
          </Text>
        </Flex>
      </Button>
      <Button
        id={"/favourites"}
        width={"20%"}
        variant={"unstyled"}
        height={"fit-content"}
        onClick={() => navigate(routes.FAVORITE)}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <Icon.Heart
            boxSize={5}
            fill={`${selectedMenu === "/favourites" ? "primary" : "dark"}`}
          />
          <Text
            variant={"unstyled"}
            fontSize={"2xs"}
            color={`${
              selectedMenu === "/favourites" ? "darkDarken" : "darkLighten"
            }`}
            my={1}
          >
            Favourites
          </Text>
        </Flex>
      </Button>
      <Button
        id={"/cart"}
        width={"20%"}
        variant={"unstyled"}
        height={"fit-content"}
        onClick={handleSelectMenu}
      >
        <Flex direction={"column"} alignItems={"center"} position={"relative"}>
          <Icon.CartFilled
            boxSize={5}
            fill={`${selectedMenu === "/cart" ? "primary" : "dark"}`}
          />
          <Text
            variant={"unstyled"}
            fontSize={"2xs"}
            color={`${selectedMenu === "/cart" ? "darkDarken" : "darkLighten"}`}
            my={1}
          >
            Cart
          </Text>
          {cart.length > 0 && (
            <Divider
              position={"absolute"}
              top={0}
              right={"33%"}
              width={"3px"}
              height={"3px"}
              borderWidth={"3px"}
              borderColor={"secondaryDarken"}
              backgroundColor={"secondaryDarken"}
              opacity={1}
            />
          )}
        </Flex>
      </Button>
      <Button
        id={"/profile"}
        width={"20%"}
        variant={"unstyled"}
        height={"fit-content"}
        onClick={handleSelectMenu}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <Icon.Profile
            boxSize={5}
            fill={`${selectedMenu === "/profile" ? "primary" : "dark"}`}
          />
          <Text
            variant={"unstyled"}
            fontSize={"2xs"}
            color={`${
              selectedMenu === "/profile" ? "darkDarken" : "darkLighten"
            }`}
            my={1}
          >
            Profile
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default MobileBottomNavbar;
