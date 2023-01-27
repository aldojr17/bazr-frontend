import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons";
import useUser from "../../hooks/useUser";
import { NavbarProps } from "../../interfaces/Navbar";
import NavCart from "./Components/NavCart";
import NavFavorite from "./Components/NavFavorite";
import NavLoginRegisterButtons from "./Components/NavLoginRegisterButtons";
import NavProfile from "./Components/NavProfile";

const Navbar = ({ onOpen }: NavbarProps) => {
  const isLogged = parseCookies().auth;
  const { userLoading, fetchProfile } = useUser();

  useEffect(() => {
    if (isLogged) {
      fetchProfile();
    }
  }, [isLogged]);

  return (
    <Box
      bgColor={"white"}
      borderBottom={"3px solid"}
      borderColor={"primary"}
      py={5}
      boxShadow={"xl"}
      position={"sticky"}
      top={0}
      zIndex={2}
    >
      <SimpleGrid
        columns={{
          base: 2,
          lg: 3,
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        px={{
          base: 4,
          sm: 4,
          md: 5,
          lg: 5,
          xl: 5,
        }}
        gridAutoFlow={"dense"}
      >
        <HStack
          direction={"row"}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          }}
        >
          <Button variant={"ghost"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Dots />
            </Flex>
          </Button>
          <Button variant={"ghost"} onClick={onOpen}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"3"}>
              <Icon.Search />
            </Flex>
          </Button>
        </HStack>

        <HStack
          display={{
            base: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          }}
          gridColumn={2}
          justifyContent={"end"}
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <Icon.Search />
          </Button>
        </HStack>

        <Center
          justifyContent={{
            sm: "start",
            md: "start",
            lg: "center",
            xl: "center",
          }}
        >
          <Link to={"/"} className={`nav-link`}>
            <Image src="/logo.svg" width={"8em"} />
          </Link>
        </Center>
        <HStack
          justifyContent={{
            sm: "start",
            md: "end",
            lg: "end",
            xl: "end",
          }}
          gridColumn={3}
          width={"100%"}
          marginStart={{
            base: "-1em",
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
          }}
        >
          <HStack
            className="mt-md-0 mt-lg-0"
            spacing={{
              base: 3,
              sm: 0,
              md: 3,
              lg: 4,
              xl: 4,
            }}
            alignItems={"center"}
          >
            <Box>
              <NavCart />
            </Box>

            {isLogged ? (
              <Skeleton isLoaded={!userLoading} borderRadius={"lg"}>
                <HStack>
                  <Box>
                    <NavFavorite />
                  </Box>
                  <Box>
                    <NavProfile />
                  </Box>
                </HStack>
              </Skeleton>
            ) : (
              <NavLoginRegisterButtons />
            )}
          </HStack>
        </HStack>
      </SimpleGrid>
    </Box>
  );
};

export default Navbar;
