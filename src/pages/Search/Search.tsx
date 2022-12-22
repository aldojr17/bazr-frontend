import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import categoryService from "../../api/service/category";
import Icon from "../../assets/icons";
import { IPrimaryCategoryPayload } from "../../interfaces/Category";
import {
  ISearchFilterPayload,
  ISearchParamsPayload,
  SearchFilterState,
  SearchParamsState,
} from "../../interfaces/Filter";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const [categories, setCategories] = useState<IPrimaryCategoryPayload[]>([]);
  const [filter, setFilter] = useState<ISearchFilterPayload>(SearchFilterState);
  const [params, setParams] = useState<ISearchParamsPayload>(SearchParamsState);

  const fetchCategories = async () => {
    const response = await categoryService.fetchAllCategory();
    if (response.is_success) {
      setCategories(response.data);
    }
  };

  const handleChangeLocation = (id: number, isChecked: boolean) => {
    if (!isChecked) {
      setFilter({
        ...filter,
        location: filter.location?.filter((val) => val !== id).map((val) => val),
      });
    } else {
      setFilter({
        ...filter,
        location: filter.location ? [...filter.location, id] : [id],
      });
    }
  };

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "") {
      setFilter({
        ...filter,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    } else {
      setFilter({
        ...filter,
        [event.currentTarget.name]: parseInt(event.currentTarget.value),
      });
    }
  };

  const handleClearFilter = () => {
    setFilter(SearchFilterState);

    setSearch({ q: params.name }, { replace: true });
  };

  const handleSelectCategory = (id: number) => {
    let searchParams = {
      q: params.name,
      c: String(id),
    };

    setSearch(searchParams, { replace: true });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setParams({
      name: search.get("q") !== null ? String(search.get("q")) : "",
      category: search.get("c") !== null ? String(search.get("c")) : "",
      city: search.get("city") !== null ? String(search.get("city")) : "",
    });
  }, [search]);

  return (
    <>
      <Box className="p-5">
        <HStack ps={4} pb={5}>
          <Text fontSize={"xl"}>Search result for</Text>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {'"' + params.name + '"'}
          </Text>
        </HStack>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={1} padding={4}>
            <VStack spacing={5}>
              <VStack alignItems={"start"} spacing={5} width={"100%"}>
                <Heading size={"md"}>Price</Heading>
                <VStack spacing={3} width={"100%"}>
                  <InputGroup>
                    <InputLeftAddon children="Rp" />
                    <Input
                      type="number"
                      placeholder="Minimum Price"
                      _focusVisible={{
                        outline: "none",
                      }}
                      name={"minPrice"}
                      value={filter.minPrice === 0 ? "" : filter.minPrice}
                      onChange={handleChangeNumber}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Rp" />
                    <Input
                      type="number"
                      placeholder="Maximum Price"
                      _focusVisible={{
                        outline: "none",
                      }}
                      name={"maxPrice"}
                      value={filter.maxPrice === 0 ? "" : filter.maxPrice}
                      onChange={handleChangeNumber}
                    />
                  </InputGroup>
                  <Button variant={"outline"} borderRadius={"lg"} width={"100%"}>
                    Apply filter
                  </Button>
                </VStack>
              </VStack>
              <Accordion allowMultiple width={"100%"}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton py={2} px={1}>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size={"sm"}>Category</Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        {categories.length !== 0
                          ? categories.map((category) => (
                              <Accordion key={category.id} allowMultiple>
                                <AccordionItem border={"none"}>
                                  <HStack spacing={8}>
                                    <AccordionButton px={0} width={0}>
                                      <AccordionIcon />
                                    </AccordionButton>
                                    <Text
                                      as="span"
                                      noOfLines={1}
                                      textAlign={"start"}
                                      onClick={() => handleSelectCategory(category.id)}
                                      role={"button"}
                                    >
                                      {category.name}
                                    </Text>
                                  </HStack>
                                  <AccordionPanel py={0} pe={0}>
                                    {category.secondary_category.length !== 0
                                      ? category.secondary_category.map((secondary) => (
                                          <Accordion key={secondary.id} allowMultiple>
                                            <AccordionItem border={"none"}>
                                              <HStack spacing={8}>
                                                <AccordionButton px={0} width={0}>
                                                  <AccordionIcon />
                                                </AccordionButton>
                                                <Text
                                                  as="span"
                                                  noOfLines={1}
                                                  textAlign={"start"}
                                                  onClick={() => handleSelectCategory(secondary.id)}
                                                  role={"button"}
                                                >
                                                  {secondary.name}
                                                </Text>
                                              </HStack>
                                              <AccordionPanel py={0} pe={0}>
                                                {secondary.tertiary_category.length !== 0
                                                  ? secondary.tertiary_category.map((tertiary) => (
                                                      <Box py={2} key={tertiary.id}>
                                                        <Text
                                                          as="span"
                                                          ms={"1em"}
                                                          px={3}
                                                          noOfLines={1}
                                                          textAlign={"start"}
                                                          onClick={() => handleSelectCategory(tertiary.id)}
                                                          role={"button"}
                                                        >
                                                          {tertiary.name}
                                                        </Text>
                                                      </Box>
                                                    ))
                                                  : ""}
                                              </AccordionPanel>
                                            </AccordionItem>
                                          </Accordion>
                                        ))
                                      : ""}
                                  </AccordionPanel>
                                </AccordionItem>
                              </Accordion>
                            ))
                          : ""}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton py={2} px={1}>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size={"sm"}>Rating</Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <Checkbox>
                          <Icon.Star mt={"-.3em"} fill={"orange"} width={"1.2em"} marginEnd={2} />
                          <Text as={"span"}>4 &amp; Up</Text>
                        </Checkbox>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton py={2} px={1}>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size={"sm"}>Location</Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <CheckboxGroup>
                          <VStack alignItems={"start"}>
                            <Checkbox value="1" onChange={(e) => handleChangeLocation(1, e.target.checked)}>
                              <Text as={"span"}>DKI Jakarta</Text>
                            </Checkbox>
                            <Checkbox value="2" onChange={(e) => handleChangeLocation(2, e.target.checked)}>
                              <Text as={"span"}>Bali</Text>
                            </Checkbox>
                            <Checkbox value="3" onChange={(e) => handleChangeLocation(3, e.target.checked)}>
                              <Text as={"span"}>Jawa Barat</Text>
                            </Checkbox>
                          </VStack>
                        </CheckboxGroup>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </VStack>
          </GridItem>
          <GridItem colSpan={4} p={4}>
            <HStack justifyContent={"space-between"}>
              <Text>Sort</Text>
              <Button variant={"outline"} borderRadius={"md"} onClick={handleClearFilter}>
                Clear Filter
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
