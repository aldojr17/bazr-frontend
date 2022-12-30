import { Box, Heading, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IVariantGroupPayload } from "../../interfaces/Variant";

interface IProductDetailVariantProps {
  variantGroup: IVariantGroupPayload;
  onVariantChange: Function;
}

function ProductDetailVariant(props: IProductDetailVariantProps) {
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
    onVariantChange(selectVariant);
  };

  const findVariantType = (variant: {}) => {
    let selectedVariantArray: string[] = Object.values(variant);
    let selectedVariantString = selectedVariantArray.join(",");

    let selectedVariantType = variantGroup.variant_type.find(
      (variantType) => variantType.name === selectedVariantString
    );

    onVariantChange(selectedVariantType);
  };

  const handleSetVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantName =
      e.currentTarget.parentElement?.parentElement?.children[0].innerHTML!;
    const variantType = e.currentTarget.value!;

    let newVariant = { ...selectedVariant, [variantName]: variantType };

    setSelectedVariant(newVariant);
    findVariantType(newVariant);
  };

  useEffect(() => {
    variantPreprocessing();
    setSelectedProductVariant();
  }, []);

  return (
    <Box mt={10}>
      {Object.keys(displayVariants).map((name: string) => (
        <Box key={name} my={5}>
          <Heading variant={"variantName"} my={1}>
            {name}
          </Heading>
          <Select
            variant={"default"}
            width={"fit-content"}
            icon={<FaCaretDown />}
            value={(selectedVariant as any)[name]}
            onChange={(e) => handleSetVariant(e)}
          >
            <option>-</option>
            {(displayVariants as any)[name].map((type: string) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </Box>
      ))}
    </Box>
  );
}

export default ProductDetailVariant;
