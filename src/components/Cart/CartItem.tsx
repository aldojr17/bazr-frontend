import { Button, Checkbox, Flex, HStack, IconButton } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import { ICartItemProps } from "../../interfaces/Components";
import ProductListItem from "../Card/ProductListItem";
import QuantitySelector from "../Default/QuantitySelector";

const CartItem = ({ ...props }: ICartItemProps) => {
  const { updateCart } = useCart();

  const onQuantityChange = (qty: number) => {
    updateCart({
      quantity: qty,
      shop_id: props.data.shop_id,
      variant_type_id: props.data.variant_type_id,
    });
  };

  return (
    <>
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
        />
        <ProductListItem
          key={props.data.variant_type_id}
          index={props.data.variant_type_id}
          name={props.data.product_name}
          qty={props.data.quantity}
          total={props.data.variant_type_price}
          variant_name={props.data.variant_type_name.split(",").join(", ")}
        />
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
        >
          Add Notes
        </Button>
        <HStack spacing={5} justifyContent={"end"} width={"100%"}>
          <IconButton
            variant={"unstyled"}
            aria-label="delete"
            icon={<Icon.Trash boxSize={4} fill={"dark"} />}
            onClick={() => props.handleDeleteItem(props.data.cart_id)}
          />
          <QuantitySelector
            onQuantityChange={onQuantityChange}
            maxQty={props.data.max_buy_qty}
            minQty={props.data.min_buy_qty}
            stock={props.data.stock}
          />
        </HStack>
      </Flex>
    </>
  );
};

export default CartItem;
