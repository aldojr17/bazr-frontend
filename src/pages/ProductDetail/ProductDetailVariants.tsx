import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    IVariantGroupPayload
} from "../../interfaces/Variant";

interface IProductDetailVariantsProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}

function ProductDetailVariants(props: IProductDetailVariantsProps) {
  const { variantGroup, onVariantChange } = props;

  const [displayVariants, setDisplayVariants] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});

  const variantPreprocessing = () => {
    let variants = {};
    const variantNames = variantGroup?.name.split(",")!;
    const variantTypes = variantGroup?.variant_type!;

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
  };

  const setSelectedProductVariant = () => {
    let variant = {};
    const variantNames = variantGroup?.name.split(",")!;
    let selectVariant = variantGroup?.variant_type.reduce((a, b) =>
      a.price < b.price ? a : b
    );

    for (var index in variantNames) {
      variant = {
        ...variant,
        [variantNames[index]]: selectVariant.name.split(",")[index],
      };
    }

    setSelectedVariant(variant);
    onVariantChange(selectVariant)
  };

  const findVariantType = (variant: {}) => {
    let selectedVariantArray: string[] = Object.values(variant)
    let selectedVariantString = selectedVariantArray.join(",")

    let selectedVariantType = variantGroup.variant_type.find((variantType) => variantType.name === selectedVariantString)

    onVariantChange(selectedVariantType)
  }

  const handleSetVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const variantName = e.currentTarget.parentElement?.parentElement?.children[0].innerHTML!
    const variantType = e.currentTarget.innerHTML!

    let newVariant = {...selectedVariant, [variantName]: variantType }

    setSelectedVariant(newVariant)
    findVariantType(newVariant); 
  };

  useEffect(() => {
    variantPreprocessing();
    setSelectedProductVariant();
  }, []);

  return (
    <Box mt={10}>
      {Object.keys(displayVariants).map((name: string) => (
        <Box key={name} my={2}>
          <Heading variant={"variantName"} my={1}>
            {name}
          </Heading>
          <HStack>
            {(displayVariants as any)[name].map((type: string) => (
              <Button
                variant={`${
                  (selectedVariant as any)[name] === type
                    ? "solid"
                    : "outline"
                }`}
                colorScheme="teal"
                size="xs"
                key={type}
                onClick={(e) => handleSetVariant(e)}
              >
                {type}
              </Button>
            ))}
          </HStack>
        </Box>
      ))}
    </Box>
  );
}

export default ProductDetailVariants;
