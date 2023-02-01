import { Box, Divider, Heading, Select, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import { IProductDetailVariantProps } from "../../interfaces/Components/PDP";

function ProductDetailVariant(props: IProductDetailVariantProps) {
  const { variantGroup, onVariantChange, error } = props;

  const [displayVariants, setDisplayVariants] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});

  const variantPreprocessing = () => {
    let variants = {};
    const variantNames = variantGroup?.name.split(",")!;
    const variantTypes = variantGroup?.variant_types ?? [];

    for (var index in variantNames) {
      let typeArray = [];

      for (const type of variantTypes) {
        const types = type.name.split(",")!;
        typeArray.push(types[index]);
      }

      (variants as any)[variantNames[index]] = typeArray.filter(
        (e, i, a) => a.indexOf(e) === i
      );
    }

    setDisplayVariants(variants);

    if (variantTypes.length === 1) {
      let selectVariant = {};
      Object.keys(variants).map(
        (key) => ((selectVariant as any)[key] = (variants as any)[key][0])
      );

      setSelectedVariant(selectVariant);
      findVariantType(selectVariant);
    }
  };

  const findVariantType = (variant: {}) => {
    let selectedVariantArray: string[] = Object.values(variant);
    let selectedVariantString = selectedVariantArray.join(",");
    let selectedVariantStringAlt = selectedVariantArray.reverse().join(",");

    let selectedVariantType = variantGroup.variant_types.find(
      (variantType) =>
        variantType.name === selectedVariantString ||
        variantType.name === selectedVariantStringAlt
    );

    if (selectedVariantType) {
      onVariantChange(selectedVariantType);
    } else {
      onVariantChange({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        variant_group_id: 0,
      });
    }
  };

  const handleSetVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantName =
      e.currentTarget.parentElement?.parentElement?.children[0].innerHTML!.replace(
        ":",
        ""
      );
    const variantType = e.currentTarget.value!;

    let newVariant = { ...selectedVariant, [variantName!]: variantType };

    setSelectedVariant(newVariant);
    findVariantType(newVariant);
  };

  useEffect(() => {
    variantPreprocessing();
  }, []);

  return (
    <>
      {Object.keys(displayVariants)[0] !== "DEFAULT" && (
        <>
          <VStack
            backgroundColor={`${error ? "purple.100" : "transparent"}`}
            px={3}
            py={{ base: 0, lg: 3 }}
            borderRadius={"lg"}
            alignItems={"start"}
          >
            <Heading
              fontSize={{ base: "sm", lg: "md" }}
              mb={{ base: 0, lg: 3 }}
            >
              Select variant:
            </Heading>
            {Object.keys(displayVariants).map((name: string) => (
              <Box key={name} mb={5}>
                <Heading
                  fontSize={{ base: "xs", lg: "sm" }}
                  fontWeight={"semibold"}
                  color={"dark"}
                  textTransform={"none"}
                  my={1}
                >
                  {name}:
                </Heading>
                <Select
                  variant={"default"}
                  width={"fit-content"}
                  icon={<Icon.ChevronDown fill={"primary"} />}
                  value={(selectedVariant as any)[name]}
                  onChange={(e) => handleSetVariant(e)}
                >
                  <option hidden>-</option>
                  {(displayVariants as any)[name].map((type: string) => (
                    <option key={type}>{type}</option>
                  ))}
                </Select>
              </Box>
            ))}
            {error && (
              <Text
                as={"i"}
                fontWeight={"semibold"}
                fontSize={"sm"}
                color={"secondary"}
                alignSelf={"end"}
                mt={10}
              >
                Variant is not selected
              </Text>
            )}
          </VStack>
          <Divider variant={"solidLight"} my={3} />
        </>
      )}
    </>
  );
}

export default ProductDetailVariant;
