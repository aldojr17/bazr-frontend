import {
  Avatar,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../assets/icons";
import useCart from "../../../hooks/useCart";
import useUser from "../../../hooks/useUser";
import routes from "../../../routes/Routes";
import { formatCurrency } from "../../../util/util";

function NavProfile() {
  const { user } = useUser();
  const { clearUserCart } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    destroyCookie(null, "auth");
    localStorage.clear();
    clearUserCart();
    navigate("/login", { replace: true });
  };

  useEffect(() => {}, [user]);

  return (
    <Popover isLazy trigger="hover" offset={[5, 8]} placement="bottom-start">
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
          }}
          justifyContent={"center"}
          alignItems={"center"}
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
        <PopoverBody p={5}>
          <VStack gap={1}>
            <Button
              variant={"primaryNavbarGhost"}
              width={"100%"}
              py={8}
              as={Link}
              to={routes.PROFILE}
            >
              <HStack width={"100%"} spacing={5} alignItems={"center"}>
                <Avatar src={user?.profile_picture} boxSize={7} />
                <HStack
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  flex={1}
                >
                  <Text fontWeight={"semibold"} noOfLines={1}>
                    Hi {user?.name}!
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"normal"}
                    color={"darkLighten"}
                  >
                    Go to your profile {">"}
                  </Text>
                </HStack>
              </HStack>
            </Button>
            <Button
              variant={"lightGhost"}
              width={"100%"}
              py={8}
              as={Link}
              to={routes.WALLET}
            >
              <HStack width={"100%"} spacing={5} alignItems={"center"}>
                <Icon.Wallet boxSize={7} fill={"darkLighten"} />
                <HStack
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  flex={1}
                >
                  <Text fontWeight={"semibold"}>My Wallet</Text>
                  {user?.wallet_detail.is_activated ? (
                    <Text fontWeight={"semibold"} color={"primaryDarken"}>
                      Rp {formatCurrency(user?.wallet_detail.balance!)},-
                    </Text>
                  ) : (
                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      Setup your wallet!
                    </Text>
                  )}
                </HStack>
              </HStack>
            </Button>
            <Button
              variant={"lightGhost"}
              width={"100%"}
              py={8}
              as={Link}
              to={
                user?.is_seller ? routes.SELLER_HOME : routes.REGISTER_MERCHANT
              }
            >
              <HStack width={"100%"} spacing={5} alignItems={"center"}>
                <Icon.Shop boxSize={7} fill={"darkLighten"} />
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  width={"100%"}
                >
                  <Text fontWeight={"semibold"} noOfLines={1}>
                    {user?.is_seller ? "Your shop" : "Start selling!"}
                  </Text>
                  <Text
                    fontSize={"xs"}
                    fontWeight={"normal"}
                    color={"darkLighten"}
                  >
                    {user?.is_seller
                      ? "Go to Seller Panel >"
                      : "Register as a merchant >"}
                  </Text>
                </HStack>
              </HStack>
            </Button>
          </VStack>
        </PopoverBody>

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
  );
}

export default NavProfile;
