import {
  Box,
  Button,
  Center,
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
      py={{ base: 2, lg: 5 }}
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
          md: 5,
        }}
        gridAutoFlow={"dense"}
      >
        <HStack
          direction={"row"}
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Button
            variant={"lightLink"}
            onClick={onOpen}
            leftIcon={<Icon.Search />}
          >
            Search
          </Button>
        </HStack>

        <HStack
          display={{
            base: "flex",
            lg: "none",
          }}
          gridColumn={2}
          justifyContent={"end"}
        >
          <Button variant={"ghost"} onClick={onOpen} p={0}>
            <Icon.Search fill={"lightDarken"} />
          </Button>
        </HStack>

        <Center
          justifyContent={{
            sm: "start",
            lg: "center",
          }}
        >
          <Link to={"/"} className={`nav-link`}>
            <Image
              loading="lazy"
              src="/logo.svg"
              width={{ base: "5rem", lg: "8em" }}
            />
          </Link>
        </Center>
        <HStack
          justifyContent={{
            sm: "start",
            md: "end",
          }}
          gridColumn={3}
          width={"100%"}
          marginStart={{
            base: "-1em",
            sm: 0,
          }}
        >
          <HStack
            className="mt-md-0 mt-lg-0"
            spacing={{
              base: 3,
              sm: 0,
              md: 3,
              lg: 4,
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
