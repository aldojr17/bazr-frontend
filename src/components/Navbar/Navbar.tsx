import {
  Button,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons";

interface NavbarProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <SimpleGrid
        columns={{
          base: 2,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        className={"px-lg-5 px-md-5 px-4"}
        gridAutoFlow={"dense"}
      >
        <HStack direction={"row"} className={"d-none d-md-flex d-lg-block"}>
          <Button variant={"ghost"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Dots />
              <Text as={"span"} fontWeight={"normal"}>
                Categories
              </Text>
            </Flex>
          </Button>
          <Button variant={"ghost"} onClick={onOpen}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Search />
              <Text as={"span"} fontWeight={"normal"}>
                Search
              </Text>
            </Flex>
          </Button>
        </HStack>
        <HStack
          className={"d-flex d-md-none d-lg-none"}
          gridColumn={2}
          justifyContent={"end"}
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <Icon.Search />
          </Button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </HStack>
        <Center
          className={"d-flex"}
          justifyContent={{
            sm: "start",
            md: "center",
            lg: "center",
            xl: "center",
          }}
        >
          <Link to={"/"} className={`nav-link`}>
            BaZR
          </Link>
        </Center>
        <HStack
          id="navbar"
          justifyContent={{
            sm: "start",
            md: "end",
            lg: "end",
            xl: "end",
          }}
          width={"100%"}
          className="collapse navbar-collapse d-md-flex"
          marginStart={{
            base: "-1em",
            sm: "-1em",
            md: 0,
            lg: 0,
            xl: 0,
          }}
        >
          <HStack className="mt-2 mt-md-0 mt-lg-0">
            <Button variant={"ghost"}>
              <Icon.Heart />
            </Button>
            <Button variant={"ghost"}>
              <Icon.Profile width={"1.5em"} height={"1.5em"} />
            </Button>
            <Button variant={"ghost"}>
              <Icon.Cart />
            </Button>
          </HStack>
        </HStack>
      </SimpleGrid>
    </nav>
  );
};

export default Navbar;
