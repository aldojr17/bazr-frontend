import {
  Box,
  Divider,
  HStack,
  IconButton,
  Input,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import useDebounce from "../../hooks/useDebounce";
import { IProductDetailQuantityProps } from "../../interfaces/Product";

function ProductDetailQuantity(props: IProductDetailQuantityProps) {
  const { stock, minQty, maxQty, onQuantityChange } = props;

  const [quantity, setQuantity] = useState(1);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      focusInputOnChange: false,
      defaultValue: 1,
      min: minQty > 1 ? minQty : 1,
      max: maxQty > 0 && maxQty < stock! ? maxQty : stock! > 0 ? stock! : 1,
      onChange: (string, number) => {
        if (string !== "") {
          setQuantity(number);
        }
      },
      value: quantity,
    });

  const debouncedQuantityChange = useDebounce(onQuantityChange, 1000);

  useEffect(() => {
    debouncedQuantityChange(quantity);
  }, [quantity]);

  useEffect(() => {
    setQuantity(1);
  }, [stock]);

  return (
    <>
      <Box p={3}>
        <Text fontWeight={"semibold"} fontSize={"lg"}>
          Select amount:
        </Text>
        <HStack ms={-2} my={3}>
          <IconButton
            aria-label="minus"
            icon={<Icon.Minus fill={"primary"} />}
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
            icon={<Icon.Plus fill={"primary"} />}
            variant="quantity"
            {...getIncrementButtonProps()}
          />
        </HStack>

        {stock !== null && (
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
        )}

        {minQty > 1 && (
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

        {maxQty > 0 && maxQty < stock! && (
          <HStack>
            <Text fontSize={"xs"} color="purple.500" fontWeight={"semibold"}>
              Max. order:
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
      <Divider variant={"solidLight"} my={5} />
    </>
  );
}

export default ProductDetailQuantity;
