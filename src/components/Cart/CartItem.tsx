import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useCart from "../../hooks/useCart";
import { ICartItemProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const CartItem = ({ ...props }: ICartItemProps) => {
  const { updateCart } = useCart();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: props.data.quantity,
      min: 1,
      max: 99,
      onChange: (valString, valNumber) => {
        if (valString !== "") {
          updateCart({
            quantity: valNumber,
            shop_id: props.data.shop_id,
            variant_type_id: props.data.variant_type_id,
          });
        }
      },
    });

  return (
    <>
      <HStack width={"100%"} pt={3} alignItems={"center"}>
        <Checkbox
          isChecked={props.selectedCart}
          onChange={(event) =>
            props.handleSelectItem(
              event,
              props.data.cart_id,
              props.data.shop_id
            )
          }
        />
        <AspectRatio
          ratio={1}
          width={{
            base: "5em",
            sm: "5em",
            md: "6em",
            lg: "6em",
            xl: "7em",
          }}
        >
          <Image src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png" />
        </AspectRatio>
        <VStack
          maxH={{
            base: "5em",
            sm: "5em",
            md: "6em",
            lg: "6em",
            xl: "7em",
          }}
          alignItems={"start"}
        >
          <Button
            variant={"unstyled"}
            size={{
              base: "sm",
              sm: "sm",
              md: "initial",
              lg: "initial",
              xl: "initial",
            }}
            __css={{
              paddingInlineStart: 0,
            }}
            fontWeight={"bold"}
          >
            {props.data.product_name}
          </Button>
          <Text
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "initial",
              lg: "initial",
              xl: "initial",
            }}
          >
            {props.data.variant_type_name}
          </Text>
          <Text
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "initial",
              lg: "initial",
              xl: "initial",
            }}
          >
            Rp.{formatCurrency(props.data.variant_type_price)}
          </Text>
        </VStack>
      </HStack>

      <Flex
        alignItems={"start"}
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
          marginStart={"1.5em"}
          color={"teal.500"}
          textAlign={"start"}
        >
          Note
        </Button>
        <HStack spacing={5} justifyContent={"end"} width={"100%"}>
          <IconButton
            variant={"unstyled"}
            aria-label="delete"
            icon={<Icon.Trash />}
            onClick={() => props.handleDeleteItem(props.data.cart_id)}
          />
          <HStack>
            <Button
              width={8}
              variant={"outline"}
              size={{
                base: "sm",
                sm: "sm",
                md: "sm",
                lg: "sm",
                xl: "sm",
              }}
              {...getDecrementButtonProps()}
            >
              -
            </Button>
            <Box
              borderBottom={"1px solid rgb(243, 243, 243)"}
              width={{
                base: "3em",
                sm: "4em",
                md: "4em",
                lg: "4em",
                xl: "4em",
              }}
            >
              <Input
                {...getInputProps()}
                size={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "sm",
                  xl: "md",
                }}
                border={"none"}
                textAlign={"center"}
                _focusVisible={{
                  outline: "none",
                }}
                paddingInline={{
                  sm: 0,
                  md: 0,
                  lg: 0,
                  xl: 0,
                }}
              />
            </Box>
            <Button
              width={8}
              variant={"outline"}
              size={{
                sm: "sm",
                md: "sm",
                lg: "sm",
                xl: "sm",
              }}
              {...getIncrementButtonProps()}
            >
              +
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </>
  );
};

export default CartItem;
