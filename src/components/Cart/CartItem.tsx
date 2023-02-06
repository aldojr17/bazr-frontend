import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import { ICartItemProps } from "../../interfaces/Components";
import routes from "../../routes/Routes";
import ProductListItem from "../Card/ProductListItem";
import QuantitySelector from "../Default/QuantitySelector";

const CartItem = ({ ...props }: ICartItemProps) => {
  const navigate = useNavigate();
  const { updateCart } = useCart();

  const isDisabled =
    !props.data.stock || props.data.stock < props.data.min_buy_qty;

  const onQuantityChange = (qty: number) => {
    if (qty !== props.data.quantity) {
      updateCart({
        quantity: qty - props.data.quantity,
        shop_id: props.data.shop_id,
        variant_type_id: props.data.variant_type_id,
      });
    }
  };

  return (
    <Box backgroundColor={isDisabled ? "lightLighten" : "transparent"}>
      <HStack width={"100%"} pt={3} alignItems={"start"} gap={2}>
        <Checkbox
          isChecked={props.selectedCart}
          colorScheme={"default"}
          onChange={(event) =>
            props.handleSelectItem(
              event,
              props.data.cart_id,
              props.data.shop_id
            )
          }
          disabled={isDisabled}
        />
        <Box width={"100%"} pb={5} pe={3}>
          <ProductListItem
            key={props.data.variant_type_id}
            name={props.data.product_name}
            qty={props.data.quantity}
            regularPrice={props.data.variant_type_price}
            discountedPrice={props.data.price_after_discount}
            total={props.data.total}
            variantName={props.data.variant_type_name.split(",").join(", ")}
            onClick={() =>
              navigate(
                routes.PDP(props.data.product_id!, props.data.product_name)
              )
            }
            disabled={isDisabled}
            productPhoto={props.data.product_photo}
          />
        </Box>
      </HStack>

      <Flex
        alignItems={"center"}
        width={"100%"}
        justifyContent={"space-between"}
        mb={3}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
      >
        <Button
          variant={"unstyled"}
          marginStart={"2.75em"}
          color={"primary"}
          textAlign={"start"}
          fontSize={"xs"}
          disabled={isDisabled}
        >
          Add Notes
        </Button>
        <HStack
          spacing={5}
          justifyContent={"end"}
          alignItems={"center"}
          width={"100%"}
        >
          {isDisabled && (
            <Text fontSize={"xs"} color={"dark"} fontWeight={"semibold"}>
              Out of stock
            </Text>
          )}
          <IconButton
            variant={"unstyled"}
            aria-label="delete"
            icon={<Icon.Trash boxSize={4} fill={isDisabled ? "red" : "dark"} />}
            onClick={() => props.handleDeleteItem(props.data.cart_id)}
          />
          <QuantitySelector
            onQuantityChange={onQuantityChange}
            maxQty={props.data.max_buy_qty}
            minQty={props.data.min_buy_qty}
            stock={props.data.stock}
            defaultValue={props.data.quantity}
            disabled={isDisabled}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default CartItem;
