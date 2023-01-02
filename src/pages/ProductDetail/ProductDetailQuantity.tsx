import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import useDebounce from "../../hooks/useDebounce";
import { IProductDetailQuantityProps } from "../../interfaces/Product";

function ProductDetailQuantity(props: IProductDetailQuantityProps) {
  const { stock, minQty, maxQty, onQuantityChange } = props;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      focusInputOnChange: false,
      defaultValue: 1,
      min: 1,
      max: stock,
      onChange: (string, number) => {
        if (string !== "") {
          setQuantity(number);
        }
      },
    });

  const [quantity, setQuantity] = useState(1);

  const debouncedQuantityChange = useDebounce(onQuantityChange, 1000);

  useEffect(() => {
    debouncedQuantityChange(quantity);
  }, [quantity]);

  useEffect(() => {
    setQuantity(1);
  }, [stock]);

  return (
    <Box>
      <HStack mb={10}>
        <HStack>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Availability:
          </Text>
          <Text fontSize={"sm"} color="teal.400" fontWeight={"semibold"}>
            {stock}
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            left in stock
          </Text>
        </HStack>
        <Spacer />
      </HStack>
      <Heading variant={"variantName"}>Quantity</Heading>
      <HStack ms={-2} my={3}>
        <IconButton
          aria-label="minus"
          icon={<TiMinus />}
          variant="quantity"
          {...getDecrementButtonProps()}
        />
        <Input
          {...getInputProps()}
          border={"none"}
          textAlign={"center"}
          _focusVisible={{
            outline: "none",
          }}
          fontWeight={"semibold"}
          variant={"quantity"}
          maxW={20}
        />
        <IconButton
          aria-label="plus"
          icon={<TiPlus />}
          variant="quantity"
          {...getIncrementButtonProps()}
        />
      </HStack>

      {minQty && (
        <HStack>
          <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
            Min. order:
          </Text>
          <Text fontSize={"xs"} fontWeight={"semibold"}>
            {minQty}
          </Text>
          <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
            pcs
          </Text>
        </HStack>
      )}
      {maxQty && (
        <HStack>
          <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
            Min. order:
          </Text>
          <Text fontSize={"xs"} fontWeight={"semibold"}>
            {maxQty}
          </Text>
          <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
            pcs
          </Text>
        </HStack>
      )}
    </Box>
  );
}

export default ProductDetailQuantity;
