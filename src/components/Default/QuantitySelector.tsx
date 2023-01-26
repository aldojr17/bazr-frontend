import { HStack, IconButton, Input, useNumberInput } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import useDebounce from "../../hooks/useDebounce";
import { IQuantitySelectorProps } from "../../interfaces/Components";

function QuantitySelector(props: IQuantitySelectorProps) {
  const { minQty = 1, maxQty = 99, stock = 0, onQuantityChange } = props;

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
  );
}

export default QuantitySelector;
