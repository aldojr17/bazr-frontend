import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid px-lg-5">
        <HStack direction={"row"} className={"d-none d-lg-block"}>
          <Button variant={"ghost"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Dots />
              <Text as={"span"} fontWeight={"normal"}>
                Categories
              </Text>
            </Flex>
          </Button>
          <Button variant={"ghost"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Search />
              <Text as={"span"} fontWeight={"normal"}>
                Search
              </Text>
            </Flex>
          </Button>
        </HStack>
        <Link to={"/"} className={`nav-link d-lg-none d-block`}>
          BaZR
        </Link>
        <HStack>
          <Button variant={"ghost"} className={"d-block d-lg-none"}>
            <Icon.Search size={24} />
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
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mx-auto d-none d-lg-block">
            <li className="nav-item d-none d-md-block">
              <Link to={"/"} className={`nav-link`}>
                BaZR
              </Link>
            </li>
          </ul>
          <HStack className="mt-3 mt-lg-0">
            <Button variant={"ghost"}>
              <Icon.Heart fill={false} />
            </Button>
            <Button variant={"ghost"}>
              <Icon.Profile />
            </Button>
            <Button variant={"ghost"}>
              <Icon.Cart />
            </Button>
          </HStack>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
