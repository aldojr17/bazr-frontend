import React, { KeyboardEvent } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ILayoutProps } from "../interfaces/Layout";
import Footer from "./Footer/Footer";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import Icon from "../assets/icons";
import { useNavigate } from "react-router-dom";
import MobileBottomNavbar from "../components/Navbar/MobileBottomNavbar";

const Layout = ({ children }: ILayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code !== "Enter") {
      return;
    }

    onClose();
    navigate(`/search?q=${event.currentTarget.value}`, { replace: true });
  };

  return (
    <Flex direction={"column"} minH="100vh" maxWidth={"100%"}>
      <Navbar onOpen={onOpen} />
      <Box flex={1}>{children}</Box>
      <Show above={"lg"}>
        <Footer />
      </Show>
      <Show below={"lg"}>
        <MobileBottomNavbar />
      </Show>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          marginLeft={{
            base: 10,
            sm: 10,
            md: 0,
            lg: 0,
            xl: 0,
          }}
          marginRight={{
            base: 10,
            sm: 10,
            md: 0,
            lg: 0,
            xl: 0,
          }}
          padding={3}
        >
          <InputGroup>
            <InputLeftElement>
              <Icon.Search fill="primary" width={"1.2em"} height={"1.2em"} />
            </InputLeftElement>
            <Input
              placeholder={`Look for "Bunga Natal Merah" in BAZR`}
              border={"none"}
              _focusVisible={{
                outline: "none",
              }}
              onKeyDown={handleSearch}
            />
          </InputGroup>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Layout;
