import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  VStack,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";
import { NavbarProps } from "../../interfaces/Navbar";
import HoverCart from "../Cart/HoverCart";

const Navbar = ({ onOpen }: NavbarProps) => {
  const isLogged = parseCookies().auth;
  const { cart, clearUserCart } = useCart();
  const { user, fetchProfile } = useUser();
  const navigate = useNavigate();

  const handleNavigateToCartPage = () => {
    if (parseCookies().auth) {
      navigate("/cart", { replace: true });
      return;
    }

    navigate("/login", { replace: true });
  };

  const handleLogout = () => {
    destroyCookie(null, "auth");
    localStorage.clear();
    clearUserCart();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Box borderBottom={"1px solid #dee2e6"} py={5}>
      <SimpleGrid
        columns={{
          base: 2,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
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
          <Button variant={"ghost"} onClick={onOpen} pe={7}>
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
              base: 0,
              sm: 5,
              md: 5,
              lg: 5,
              xl: 5,
            }}
          >
            <Popover
              isLazy
              trigger="hover"
              offset={[-100, 8]}
              placement="bottom"
            >
              <PopoverTrigger>
                <Button
                  variant={"ghost"}
                  position={"relative"}
                  p={{
                    base: 0,
                    sm: "initial",
                    md: "initial",
                    lg: "initial",
                    xl: "initial",
                  }}
                  onClick={handleNavigateToCartPage}
                >
                  <Box
                    borderBottom={cart.length !== 0 ? "2px" : ""}
                    borderColor={"purple.600"}
                    pb={"0.3em"}
                    pt={1}
                  >
                    <Icon.Cart
                      width={{
                        base: "1.2em",
                        sm: "1.4em",
                        md: "1.4em",
                        lg: "1.4em",
                        xl: "1.4em",
                      }}
                      height={{
                        base: "1.2em",
                        sm: "1.4em",
                        md: "1.4em",
                        lg: "1.4em",
                        xl: "1.4em",
                      }}
                    />
                  </Box>
                  <Text
                    bottom={
                      cart.length > 9
                        ? {
                            base: "1em",
                            sm: "1em",
                            md: "1em",
                            lg: "1em",
                            xl: "1em",
                          }
                        : {
                            base: "0.87em",
                            sm: "0.87em",
                            md: "0.87em",
                            lg: "0.87em",
                            xl: "0.87em",
                          }
                    }
                    fontSize={
                      cart.length > 9
                        ? {
                            base: "0.65em",
                            sm: "0.7em",
                            md: "0.7em",
                            lg: "0.7em",
                            xl: "0.7em",
                          }
                        : {
                            base: "0.8em",
                            sm: "0.8em",
                            md: "0.8em",
                            lg: "0.8em",
                            xl: "0.8em",
                          }
                    }
                    as={"span"}
                    position={"absolute"}
                  >
                    {cart.length !== 0
                      ? cart.length > 9
                        ? "9+"
                        : cart.length
                      : ""}
                  </Text>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                width={"md"}
                borderRadius={"xl"}
                boxShadow={"dark-lg"}
                display={{
                  base: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                  xl: "block",
                }}
              >
                {cart.length !== 0 ? (
                  <PopoverHeader
                    px={5}
                    width="100%"
                    fontWeight={"semibold"}
                    color={"secondary"}
                    pt={5}
                    pb={2}
                  >
                    Recently Added Products
                  </PopoverHeader>
                ) : (
                  ""
                )}
                <PopoverArrow />
                <PopoverBody px={5}>
                  {cart.length !== 0 ? (
                    <VStack spacing={3} py={3}>
                      {cart.slice(0, 5).map((value, index) => (
                        <HoverCart
                          key={index}
                          image=""
                          name={value.product_name}
                          price={value.variant_type_price}
                        />
                      ))}
                    </VStack>
                  ) : (
                    <Center boxSize={"xs"} width={"100%"}>
                      Cart is empty
                    </Center>
                  )}
                </PopoverBody>
                {cart.length !== 0 ? (
                  <PopoverFooter px={5}>
                    <Flex
                      justifyContent={
                        cart.length !== 0 && cart.length > 5
                          ? "space-between"
                          : "end"
                      }
                      alignItems={"center"}
                    >
                      {cart.length !== 0 && cart.length > 5 ? (
                        <Text
                          fontWeight={"semibold"}
                          py={3}
                          color="secondary"
                          fontSize={"sm"}
                        >
                          {cart.length - 5} more products in cart
                        </Text>
                      ) : (
                        ""
                      )}
                      <Button
                        variant={"primary"}
                        size={"md"}
                        onClick={handleNavigateToCartPage}
                      >
                        Cart
                      </Button>
                    </Flex>
                  </PopoverFooter>
                ) : (
                  ""
                )}
              </PopoverContent>
            </Popover>

            {isLogged ? (
              <Button
                display={{
                  base: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                  xl: "block",
                }}
                variant={"ghost"}
                p={{
                  base: 0,
                  sm: "initial",
                  md: "initial",
                  lg: "initial",
                  xl: "initial",
                }}
              >
                <Icon.Heart
                  width={{
                    base: "1.2em",
                    sm: "1.4em",
                    md: "1.4em",
                    lg: "1.4em",
                    xl: "1.4em",
                  }}
                  height={{
                    base: "1.2em",
                    sm: "1.4em",
                    md: "1.4em",
                    lg: "1.4em",
                    xl: "1.4em",
                  }}
                />
              </Button>
            ) : (
              ""
            )}

            {isLogged ? (
              <Popover
                isLazy
                trigger="hover"
                offset={[5, 8]}
                placement="bottom-start"
              >
                <PopoverTrigger>
                  <Button
                    variant={"ghost"}
                    to={"/profile"}
                    as={Link}
                    p={{
                      base: 0,
                      sm: "initial",
                      md: "initial",
                      lg: "initial",
                      xl: "initial",
                    }}
                  >
                    <Icon.Profile
                      width={{
                        base: "1.4em",
                        sm: "1.6em",
                        md: "1.6em",
                        lg: "1.6em",
                        xl: "1.6em",
                      }}
                      height={{
                        base: "1.4em",
                        sm: "1.6em",
                        md: "1.6em",
                        lg: "1.6em",
                        xl: "1.6em",
                      }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  width={{
                    base: "xs",
                    sm: "md",
                    md: "md",
                    lg: "md",
                    xl: "md",
                  }}
                  borderRadius={"xl"}
                  boxShadow={"dark-lg"}
                  display={{
                    base: "none",
                    sm: "none",
                    md: "none",
                    lg: "block",
                    xl: "block",
                  }}
                >
                  <PopoverArrow />
                  <PopoverBody px={5}>
                    <Button
                      variant={"ghost"}
                      bgColor={"blackAlpha.100"}
                      width={"100%"}
                      py={10}
                      to={"/profile"}
                      as={Link}
                    >
                      <HStack width={"100%"} spacing={5} alignItems={"center"}>
                        <Avatar bg={"purple.600"} src={user?.profile_picture} />
                        <VStack alignItems={"start"}>
                          <Text>{user?.name}</Text>
                          <Text fontWeight={"normal"}>
                            Go to your profile {">"}
                          </Text>
                        </VStack>
                      </HStack>
                    </Button>
                  </PopoverBody>

                  <PopoverFooter px={5}>
                    <Flex justifyContent={"end"}>
                      <Button
                        variant={"ghost"}
                        size={"md"}
                        colorScheme={"teal"}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Flex>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            ) : (
              <HStack>
                <Button
                  variant={"basicOutline"}
                  size={"sm"}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant={"primary"}
                  size={"sm"}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </HStack>
            )}
          </HStack>
        </HStack>
      </SimpleGrid>
    </Box>
  );
};

export default Navbar;
