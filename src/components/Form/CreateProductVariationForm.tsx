import { Flex, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ICreateProductVariationFormProps } from "../../interfaces/Components";
import {
  ICreateVariantGroup,
  ICreateVariantType,
} from "../../interfaces/Variant";
import ProductVariationListForm from "./ProductVariationListForm";

function CreateProductVariationForm(props: ICreateProductVariationFormProps) {
  const [secVariationEnable, setSecVariationEnable] = useState(false);
  const [oneVarInput, setOneVarInput] = useState<string[]>([""]);
  const [secVarInput, setSecVarInput] = useState<string[]>([""]);
  const [isInit, setIsInit] = useState<boolean>(true);

  const mapVariant = (vList: ICreateVariantType[]) => {
    let oneVar: string[] = [];
    let twoVar: string[] = [];

    vList.forEach((v) => {
      oneVar.push(v.vtOne_name);
      twoVar.push(v.vtTwo_name ?? "");
    });
    oneVar.push("");
    twoVar.push("");

    const uniqueOneVar: string[] = Array.from(new Set(oneVar));
    const uniqueTwoVar: string[] = Array.from(new Set(twoVar));

    setOneVarInput(uniqueOneVar);
    setSecVarInput(uniqueTwoVar);
  };

  useEffect(() => {
    props.setVgInput([
      {
        vg_name: "Variant 1",
      },
    ]);

    if (props.vgInput.length > 1) {
      setSecVariationEnable(true);

      const initVgInput: ICreateVariantGroup[] = [];
      props.vgInput.forEach((val) => {
        initVgInput.push(val);
      });

      props.setVgInput(initVgInput);

      mapVariant(props.vtList);
    }

    setTimeout(() => setIsInit(false));
  }, []);

  useEffect(() => {
    if (isInit) {
      return;
    }

    var vtList: ICreateVariantType[] = [];

    oneVarInput.forEach((one, oneIdx) => {
      if (oneIdx === oneVarInput.length - 1) {
        return;
      }

      if (secVarInput.length > 1) {
        secVarInput.forEach((two, twoIdx) => {
          if (twoIdx === secVarInput.length - 1) {
            return;
          }

          vtList = [
            ...vtList,
            {
              vtOne_name: one,
              vtTwo_name: two,
              price: "",
              stock: "",
            },
          ];
        });
      } else {
        vtList = [
          ...vtList,
          {
            vtOne_name: one,
            price: "",
            stock: "",
          },
        ];
      }
    });

    const mapVtList = vtList.map((val1) => {
      const vtTemp = props.vtList.find(
        (val2) =>
          val1.vtOne_name === val2.vtOne_name &&
          val1.vtTwo_name === val2.vtTwo_name
      );

      if (vtTemp) {
        return {
          ...vtTemp,
        } as ICreateVariantType;
      }

      return val1;
    });

    if (oneVarInput.length > 1) {
      props.setVtList([...mapVtList]);
    } else {
      props.setVtList([]);
    }
  }, [oneVarInput, secVarInput]);

  const handleVgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var type: string;

    if (event.target.value.length > 1) {
      type =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
    } else {
      type = event.target.value.charAt(0).toUpperCase();
    }

    props.setVgInput(
      props.vgInput.map((vg, idx) => {
        if (idx === Number(event.target.id)) {
          return {
            ...vg,
            vg_name: type,
          };
        }
        return vg;
      })
    );
  };

  const handleOneVtChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: Number
  ) => {
    var type: string;

    if (event.target.value.length > 1) {
      type =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
    } else {
      type = event.target.value.charAt(0).toUpperCase();
    }

    if (event.target.value.length === 0) {
      setOneVarInput(
        oneVarInput.filter((_, idx) => {
          return idx !== index;
        })
      );
      return;
    }

    if (index !== oneVarInput.length - 1) {
      setOneVarInput([
        ...oneVarInput.map((input, idx) => {
          if (idx === index) {
            input = type;
          }

          return input;
        }),
      ]);
    } else {
      if (type.trim().length === 0) {
        return;
      }

      setOneVarInput([
        ...oneVarInput.map((input, idx) => {
          if (idx === index) {
            input = type;
          }

          return input;
        }),
        "",
      ]);
    }
  };

  const handleSecVtChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: Number
  ) => {
    var type: string;

    if (event.target.value.length > 1) {
      type =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
    } else {
      type = event.target.value.charAt(0).toUpperCase();
    }

    if (event.target.value.length === 0) {
      setSecVarInput(
        secVarInput.filter((_, idx) => {
          return idx !== index;
        })
      );
      return;
    }

    if (index !== secVarInput.length - 1) {
      setSecVarInput([
        ...secVarInput.map((input, idx) => {
          if (idx === index) {
            input = type;
          }

          return input;
        }),
      ]);
    } else {
      if (type.trim().length === 0) {
        return;
      }

      setSecVarInput([
        ...secVarInput.map((input, idx) => {
          if (idx === index) {
            input = type;
          }

          return input;
        }),
        "",
      ]);
    }
  };

  return (
    <>
      <Flex flexDirection={"row"} justifyContent={"space-between"} width="70%">
        <Text>Variations</Text>
        <Flex width="70%" direction={"column"}>
          <Flex
            width="100%"
            p={5}
            direction={"column"}
            backgroundColor="gray.100"
          >
            <Flex
              width="100%"
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Flex
                width="70%"
                justifyContent={"space-between"}
                alignItems={"center"}
                direction={"row"}
              >
                <Text>Variation 1</Text>
                <Input
                  id="0"
                  type="text"
                  placeholder="eg: colour, etc."
                  backgroundColor={"white"}
                  maxLength={14}
                  width="75%"
                  value={props.vgInput[0]?.vg_name}
                  onChange={handleVgChange}
                />
              </Flex>
              <Button
                variant={"ghost"}
                onClick={() => props.setVariation(false)}
              >
                X
              </Button>
            </Flex>
            <Flex width="100%" direction={"row"} mt={5}>
              <Flex
                width="70%"
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                direction={"row"}
              >
                <Text>Options</Text>
                <Flex width={"75%"} direction={"column"} gap={1}>
                  {oneVarInput.map((string, index) => {
                    return (
                      <Input
                        key={index}
                        type="text"
                        placeholder="eg: red, etc."
                        backgroundColor={"white"}
                        maxLength={20}
                        width="100%"
                        value={string}
                        onChange={(e) => handleOneVtChange(e, index)}
                      />
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {!secVariationEnable ? (
            <Flex
              width="100%"
              p={5}
              direction={"column"}
              mt={5}
              backgroundColor="gray.100"
            >
              <Flex
                width="100%"
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Flex
                  width="70%"
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Text>Variation 2</Text>
                  <Button
                    width={"75%"}
                    onClick={() => {
                      setSecVariationEnable(true);
                      props.setVgInput([
                        ...props.vgInput,
                        {
                          vg_name: "Variant 2",
                        },
                      ]);
                    }}
                    variant="outline"
                    backgroundColor={"white"}
                  >
                    + Add Variation 2
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex
              width="100%"
              p={5}
              direction={"column"}
              mt={5}
              backgroundColor="gray.100"
            >
              <Flex
                width="100%"
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Flex
                  width="70%"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  direction={"row"}
                >
                  <Text>Variation 2</Text>
                  <Input
                    id="1"
                    type="text"
                    placeholder="eg: size, etc."
                    backgroundColor={"white"}
                    maxLength={14}
                    width="75%"
                    value={props.vgInput[1]?.vg_name}
                    onChange={handleVgChange}
                  />
                </Flex>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setSecVariationEnable(false);
                    props.setVgInput(
                      props.vgInput.filter((_, idx) => idx !== 1)
                    );
                  }}
                >
                  X
                </Button>
              </Flex>
              <Flex width="100%" direction={"row"} mt={5}>
                <Flex
                  width="70%"
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  direction={"row"}
                >
                  <Text>Options</Text>
                  <Flex width={"75%"} direction={"column"} gap={1}>
                    {secVarInput.map((string, index) => {
                      return (
                        <Input
                          key={index}
                          type="text"
                          placeholder="eg: S, M, etc."
                          backgroundColor={"white"}
                          maxLength={20}
                          width="100%"
                          value={string}
                          onChange={(e) => handleSecVtChange(e, index)}
                        />
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
      <ProductVariationListForm
        secVariation={secVariationEnable}
        vgInput={props.vgInput}
        setVgInput={props.setVgInput}
        vtList={props.vtList}
        setVtList={props.setVtList}
      />
    </>
  );
}

export default CreateProductVariationForm;
