import {
  Button,
  Center,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import Icon from "../../../assets/icons";
import useCart from "../../../hooks/useCart";
import routes from "../../../routes/Routes";
import HoverCartItem from "../../Cart/HoverCartItem";

function NavCart() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartLength = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const handleNavigateToCartPage = () => {
    if (parseCookies().auth) {
      navigate(routes.CART);
    } else {
      navigate(routes.LOGIN, { replace: true });
    }
  };

  return (
    <Popover isLazy trigger={"hover"} offset={[-100, 8]} placement="bottom">
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          display={{
            base: "none",
            lg: "block",
          }}
          position={"relative"}
          p={{
            base: 0,
            sm: "initial",
          }}
          onClick={handleNavigateToCartPage}
        >
          <Flex direction={"column"} alignItems={"center"} pt={1}>
            <Icon.Cart
              width={{
                base: "1.2em",
                sm: "1.4em",
              }}
              height={{
                base: "1.2em",
                sm: "1.4em",
              }}
            />
            {cartLength !== 0 && <Divider mt={1} width={"25px"} />}
          </Flex>
          <Text
            left={cartLength > 9 ? "0.9rem" : "1.3em"}
            bottom={cartLength > 9 ? "1em" : "0.87em"}
            fontSize={
              cartLength > 9
                ? {
                    base: "0.65em",
                    sm: "0.7em",
                  }
                : "0.8em"
            }
            as={"span"}
            position={"absolute"}
          >
            {cartLength !== 0 ? (cartLength > 9 ? "9+" : cartLength) : ""}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        width={"md"}
        borderRadius={"xl"}
        boxShadow={"dark-lg"}
        display={{
          base: "none",
          lg: "block",
        }}
      >
        {cart.length !== 0 ? (
          <>
            <PopoverHeader
              px={5}
              width="100%"
              fontWeight={"bold"}
              color={"primary"}
              textTransform={"uppercase"}
              pt={5}
              pb={2}
            >
              Recently Added Products
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody px={5}>
              <VStack spacing={4} py={3}>
                {cart.slice(0, 5).map((value, index) => (
                  <HoverCartItem
                    key={index}
                    image={value.product_photo}
                    name={value.product_name}
                    variantName={value.variant_type_name}
                    quantity={value.quantity}
                    price={value.variant_type_price}
                  />
                ))}
              </VStack>
            </PopoverBody>
            <PopoverFooter px={5}>
              <Flex
                justifyContent={
                  cart.length !== 0 && cart.length > 5 ? "space-between" : "end"
                }
                alignItems={"center"}
              >
                {cart.length !== 0 && cart.length > 5 && (
                  <Text
                    fontWeight={"semibold"}
                    py={3}
                    color="darkLighten"
                    fontSize={"sm"}
                  >
                    {cart.length - 5} more products in cart
                  </Text>
                )}
                <Button
                  variant={"primary"}
                  size={"sm"}
                  onClick={handleNavigateToCartPage}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={2}
                >
                  Go to Cart
                </Button>
              </Flex>
            </PopoverFooter>
          </>
        ) : (
          <>
            <PopoverArrow />
            <PopoverBody px={5}>
              <Center boxSize={"xs"} width={"100%"}>
                Cart is empty
              </Center>
            </PopoverBody>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NavCart;
