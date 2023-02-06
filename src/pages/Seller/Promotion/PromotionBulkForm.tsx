import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  IPromotionBulkForm,
  IPromotionBulkFormProps,
} from "../../../interfaces/Promotion";

function PromotionBulkForm(props: IPromotionBulkFormProps) {
  const [input, setInput] = useState<IPromotionBulkForm>({
    quota: "",
    benefit: "",
    benefit_percentage: "",
    max_buy_qty: "",
  });

  const [inputError, setInputError] = useState({
    quota: "",
    benefit_percentage: "",
  });

  const [inputDisabled, setInputDisabled] = useState({
    benefit: false,
    benefit_percentage: false,
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]:
        e.currentTarget.value === "" ? "" : Number(e.currentTarget.value),
    });
    setInputError({ quota: "", benefit_percentage: "" });
  };

  const handleChangeInputBenefit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDisabled({
      benefit: false,
      benefit_percentage: false,
    });

    if (e.currentTarget.value !== "") {
      setInputDisabled({
        benefit: false,
        benefit_percentage: true,
      });
    }

    handleChangeInput(e);
  };

  const handleChangeInputBenefitPercentage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputDisabled({
      benefit: false,
      benefit_percentage: false,
    });

    if (e.currentTarget.value !== "") {
      setInputDisabled({
        benefit: true,
        benefit_percentage: false,
      });
    }

    handleChangeInput(e);
  };

  const handleOnSubmit = () => {
    const isError = validateInputError();
    props.onSubmit(input, isError);
  };

  const validateInputError = (): boolean => {
    let isError = false;
    setInputError({ quota: "", benefit_percentage: "" });

    if (typeof input.quota === "number" && input.quota <= 0) {
      setInputError((prev) => ({
        ...prev,
        quota: "must be greater than 0",
      }));
      isError = true;
    }

    if (input.benefit > 0 && input.benefit_percentage > 0) {
      setInputError((prev) => ({
        ...prev,
        benefit_percentage:
          "fill in one of the benefit or benefit percentage fields",
      }));
      isError = true;
    }

    if (input.benefit_percentage < 0 || input.benefit_percentage > 99) {
      setInputError((prev) => ({
        ...prev,
        benefit_percentage: "min 0 and max 99",
      }));
      isError = true;
    }

    return isError;
  };

  return (
    <Box rounded={"lg"} border={"1px"} borderColor={"gray.200"} p={5} my={5}>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 1,
          md: 2,
          xl: 4,
        }}
        spacingX={10}
        spacingY={5}
      >
        <FormControl isInvalid={inputError.quota !== ""}>
          <FormLabel>Quota</FormLabel>
          <Input
            type="number"
            name="quota"
            onChange={(e) => handleChangeInput(e)}
          />
          <FormErrorMessage>{inputError.quota}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Benefit</FormLabel>
          <InputGroup>
            <InputLeftAddon children="Rp" />
            <Input
              type="number"
              name="benefit"
              variant={inputDisabled.benefit ? "filled" : "outline"}
              isDisabled={inputDisabled.benefit}
              _disabled={{
                opacity: 1,
              }}
              onChange={(e) => handleChangeInputBenefit(e)}
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={inputError.benefit_percentage !== ""}>
          <FormLabel>Benefit Percentage</FormLabel>
          <InputGroup>
            <Input
              type="number"
              name="benefit_percentage"
              variant={inputDisabled.benefit_percentage ? "filled" : "outline"}
              isDisabled={inputDisabled.benefit_percentage}
              _disabled={{
                opacity: 1,
              }}
              onChange={(e) => handleChangeInputBenefitPercentage(e)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
          <FormErrorMessage>{inputError.benefit_percentage}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Max Buy</FormLabel>
          <Input
            type="number"
            name="max_buy_qty"
            onChange={(e) => handleChangeInput(e)}
          />
        </FormControl>
      </SimpleGrid>
      <Flex justifyContent={"end"} mt={5}>
        <Button onClick={() => handleOnSubmit()}>Apply All</Button>
      </Flex>
    </Box>
  );
}

export default PromotionBulkForm;
