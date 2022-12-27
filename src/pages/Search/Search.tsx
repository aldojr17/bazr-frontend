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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
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
import ProductCard from "../../components/Card/ProductCard";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categories, setCategories] = useState<IPrimaryCategoryPayload[]>([]);
  const [filter, setFilter] = useState<ISearchFilterPayload>(SearchFilterState);
  const [params, setParams] = useState<ISearchParamsPayload>(SearchParamsState);
  const [sortBy, setSortBy] = useState<String>("Recommended");

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

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
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
      <Box
        padding={{
          base: 5,
          sm: 5,
          md: 5,
          lg: 12,
          xl: 12,
        }}
      >
        <HStack ps={4} pb={5}>
          <Text
            fontSize={{
              base: "md",
              sm: "md",
              md: "lg",
              lg: "xl",
              xl: "xl",
            }}
          >
            Search result for
          </Text>
          <Text
            fontSize={{
              base: "md",
              sm: "md",
              md: "lg",
              lg: "xl",
              xl: "xl",
            }}
            fontWeight={"bold"}
          >
            {'"' + params.name + '"'}
          </Text>
        </HStack>
        <Grid
          templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          <GridItem
            colSpan={1}
            padding={4}
            width={{
              lg: "13.5rem",
              xl: "18rem",
            }}
            display={{
              base: "none",
              sm: "none",
              md: "none",
              lg: "grid",
              xl: "grid",
            }}
          >
            <VStack spacing={5}>
              <VStack alignItems={"start"} spacing={5} width={"100%"}>
                <Heading
                  size={{
                    lg: "sm",
                    xl: "md",
                  }}
                >
                  Price
                </Heading>
                <VStack spacing={3} width={"100%"}>
                  <InputGroup
                    size={{
                      lg: "sm",
                      xl: "md",
                    }}
                  >
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
                  <InputGroup
                    size={{
                      lg: "sm",
                      xl: "md",
                    }}
                  >
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
                  <Button
                    variant={"outline"}
                    borderRadius={"lg"}
                    size={{
                      lg: "sm",
                      xl: "md",
                    }}
                    width={"100%"}
                  >
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
                          <Heading
                            size={{
                              lg: "sm",
                              xl: "md",
                            }}
                          >
                            Category
                          </Heading>
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
                                      fontSize={{
                                        lg: "sm",
                                        xl: "md",
                                      }}
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
                                                  fontSize={{
                                                    lg: "sm",
                                                    xl: "md",
                                                  }}
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
                                                          noOfLines={{
                                                            base: 1,
                                                            lg: 2,
                                                            xl: 1,
                                                          }}
                                                          textAlign={"start"}
                                                          onClick={() => handleSelectCategory(tertiary.id)}
                                                          role={"button"}
                                                          fontSize={{
                                                            lg: "sm",
                                                            xl: "md",
                                                          }}
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
                          <Heading
                            size={{
                              lg: "sm",
                              xl: "md",
                            }}
                          >
                            Rating
                          </Heading>
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
                          <Heading
                            size={{
                              lg: "sm",
                              xl: "md",
                            }}
                          >
                            Location
                          </Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <CheckboxGroup>
                          <VStack alignItems={"start"}>
                            <Checkbox value="1" onChange={(e) => handleChangeLocation(1, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                DKI Jakarta
                              </Text>
                            </Checkbox>
                            <Checkbox value="2" onChange={(e) => handleChangeLocation(2, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                Bali
                              </Text>
                            </Checkbox>
                            <Checkbox value="3" onChange={(e) => handleChangeLocation(3, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                Jawa Barat
                              </Text>
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
          <GridItem
            colSpan={{
              base: 2,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
            }}
            p={4}
          >
            <HStack
              justifyContent={"space-between"}
              __css={{
                margin: "0",
              }}
            >
              <HStack spacing={5} display={{ base: "none", sm: "none", md: "none", lg: "flex", xl: "flex" }}>
                <Text
                  fontSize={{
                    lg: "sm",
                    xl: "lg",
                  }}
                >
                  Sort by:
                </Text>
                <Button
                  fontWeight={"bold"}
                  variant={"unstyled"}
                  size={{
                    lg: "sm",
                    xl: "md",
                  }}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "lg",
                    }}
                  >
                    Recommended
                  </Text>
                </Button>
                <Button
                  fontWeight={"normal"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "md",
                  }}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "lg",
                    }}
                  >
                    Newest
                  </Text>
                </Button>
                <Button
                  fontWeight={"normal"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "md",
                  }}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "lg",
                    }}
                  >
                    Most buy
                  </Text>
                </Button>
                <Button
                  fontWeight={"normal"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "md",
                  }}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "lg",
                    }}
                  >
                    Price
                  </Text>
                </Button>
                <Button
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "md",
                  }}
                >
                  <Icon.Sort
                    width={{
                      lg: "1.2rem",
                      xl: "1.5rem",
                    }}
                    height={{
                      lg: "1.2rem",
                      xl: "1.5rem",
                    }}
                    selected={"desc"}
                  />
                </Button>
              </HStack>
              <Button
                variant={"outline"}
                borderRadius={"md"}
                size={{
                  lg: "sm",
                  xl: "md",
                }}
                onClick={handleClearFilter}
                display={{ base: "none", sm: "none", md: "none", lg: "flex", xl: "flex" }}
              >
                <Text
                  fontSize={{
                    lg: "sm",
                    xl: "lg",
                  }}
                >
                  Clear Filter
                </Text>
              </Button>

              <HStack
                width={"100%"}
                bg="secondaryLighten"
                px={4}
                justifyContent={"space-between"}
                display={{ base: "flex", sm: "flex", md: "flex", lg: "none", xl: "none" }}
              >
                <HStack>
                  <Menu isLazy>
                    <MenuButton>{sortBy}</MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleChangeSortBy("Recommended")}>Recommended</MenuItem>
                      <MenuItem onClick={() => handleChangeSortBy("Newest")}>Newest</MenuItem>
                      <MenuItem onClick={() => handleChangeSortBy("Most buy")}>Most buy</MenuItem>
                      <MenuItem onClick={() => handleChangeSortBy("Price")}>Price</MenuItem>
                    </MenuList>
                  </Menu>

                  <Button
                    variant={"unstyled"}
                    size={{
                      base: "lg",
                      sm: "xs",
                      md: "md",
                    }}
                  >
                    <Icon.Sort
                      width={{
                        base: "1.2rem",
                        sm: "1.2rem",
                        md: "1.5rem",
                      }}
                      height={{
                        base: "1.2rem",
                        sm: "1.2rem",
                        md: "1.5rem",
                      }}
                      selected={"desc"}
                    />
                  </Button>
                </HStack>
                <Button fontWeight={"normal"} variant={"unstyled"} onClick={onOpen}>
                  Filter
                </Button>
              </HStack>
            </HStack>

            <Box marginTop={5}>
              <Grid
                templateColumns={{
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                placeItems={{
                  base: "center",
                  sm: "center",
                  md: "initial",
                  lg: "initial",
                }}
                gap={6}
              >
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
                <GridItem>
                  <ProductCard />
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <Modal
        size={{
          sm: "md",
          md: "md",
        }}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent
          maxWidth={{
            base: "18rem",
          }}
        >
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <VStack alignItems={"start"} spacing={5} width={"100%"}>
                <Heading
                  size={{
                    base: "sm",
                    sm: "sm",
                    md: "md",
                  }}
                >
                  Price
                </Heading>
                <VStack spacing={3} width={"100%"}>
                  <InputGroup
                    size={{
                      base: "sm",
                      sm: "md",
                      md: "md",
                    }}
                  >
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
                  <InputGroup
                    size={{
                      base: "sm",
                      sm: "md",
                      md: "md",
                    }}
                  >
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
                </VStack>
              </VStack>
              <Accordion allowMultiple width={"100%"}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton py={2} px={1}>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading
                            size={{
                              base: "sm",
                              sm: "sm",
                              md: "md",
                            }}
                          >
                            Category
                          </Heading>
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
                                      fontSize={{
                                        base: "sm",
                                        sm: "sm",
                                        md: "md",
                                      }}
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
                                                  fontSize={{
                                                    base: "sm",
                                                    sm: "sm",
                                                    md: "md",
                                                  }}
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
                                                          noOfLines={{
                                                            base: 1,
                                                            lg: 2,
                                                            xl: 1,
                                                          }}
                                                          textAlign={"start"}
                                                          onClick={() => handleSelectCategory(tertiary.id)}
                                                          role={"button"}
                                                          fontSize={{
                                                            base: "sm",
                                                            sm: "sm",
                                                            md: "md",
                                                          }}
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
                          <Heading
                            size={{
                              lg: "sm",
                              xl: "md",
                            }}
                          >
                            Rating
                          </Heading>
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
                          <Heading
                            size={{
                              lg: "sm",
                              xl: "md",
                            }}
                          >
                            Location
                          </Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <CheckboxGroup>
                          <VStack alignItems={"start"}>
                            <Checkbox value="1" onChange={(e) => handleChangeLocation(1, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                DKI Jakarta
                              </Text>
                            </Checkbox>
                            <Checkbox value="2" onChange={(e) => handleChangeLocation(2, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                Bali
                              </Text>
                            </Checkbox>
                            <Checkbox value="3" onChange={(e) => handleChangeLocation(3, e.target.checked)}>
                              <Text as={"span"} noOfLines={1}>
                                Jawa Barat
                              </Text>
                            </Checkbox>
                          </VStack>
                        </CheckboxGroup>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size={{
                base: "sm",
                sm: "sm",
                md: "md",
              }}
              onClick={onClose}
              variant={"outline"}
              borderRadius={"md"}
            >
              Apply Filter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
