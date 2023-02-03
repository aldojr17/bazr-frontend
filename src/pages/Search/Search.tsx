import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons";
import {
  ISearchFilterPayload,
  ISearchParamsPayload,
  SearchParamsState,
} from "../../interfaces/Filter";
import ProductCard from "../../components/Card/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import useCategory from "../../hooks/useCategory";
import { IProductPaginationPayload } from "../../interfaces/Product";
import useTitle from "../../hooks/useTitle";
import useProduct from "../../hooks/useProduct";
import NoProductContainer from "../../components/Default/NoProductContainer";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useTitle(`Shop for ${search.get("q")} | BAZR`);

  const { fetchAllProducts } = useProduct();
  const { categoriesProduct, fetchCategoriesProduct } = useCategory(false);

  const [params, setParams] = useState<ISearchParamsPayload>({
    q: search.get("q") !== null ? String(search.get("q")) : "",
    pmin: search.get("pmin") !== null ? String(search.get("pmin")) : "",
    pmax: search.get("pmax") !== null ? String(search.get("pmax")) : "",
    c: search.get("c") !== null ? String(search.get("c")) : "",
    cl: search.get("cl") !== null ? String(search.get("cl")) : "",
    rt: search.get("rt") !== null ? String(search.get("rt")) : "",
    city: search.get("city") !== null ? String(search.get("city")) : "",
  });
  const [sortBy, setSortBy] = useState<string>("view_count");
  const [sort, setSort] = useState<string>("desc");
  const [products, setProducts] = useState<IProductPaginationPayload>();
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState<string>("none");
  const [page, setPage] = useState<number>(1);

  const getProducts = async (filter?: ISearchFilterPayload) => {
    setIsLoading(true);

    const response = await fetchAllProducts(filter);

    if (response) {
      setProducts(response);
    }

    setIsLoading(false);
  };

  const handleChangeLocation = (id: number[], isChecked: boolean) => {
    let newParams: Record<string, string> = {
      q: search.get("q") !== null ? String(search.get("q")) : "",
    };

    if (!isChecked) {
      setParams({
        ...params,
        city: params.city
          ?.split(",")
          .filter((val) => !id.includes(parseInt(val)))
          .join(","),
      });
      newParams["city"] = params.city
        ?.split(",")
        .filter((val) => !id.includes(parseInt(val)))
        .join(",")!;
    } else {
      setParams({
        ...params,
        city:
          params.city?.split(",").length !== 0
            ? [...params.city?.split(",")!, ...id].join(",")
            : `${id.join(",")}`,
      });
      newParams["city"] =
        params.city?.split(",").length !== 0
          ? [...params.city?.split(",")!, ...id].join(",")
          : `${id.join(",")}`;
    }

    if (newParams["city"].at(0) === ",") {
      newParams["city"] = newParams["city"].substring(1);
    }

    if (newParams["city"] === "") {
      newParams = {
        q: search.get("q") !== null ? String(search.get("q")) : "",
      };
    }

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "" && key !== "city") {
        newParams[key] = value;
      }
    });

    setSearch(newParams, { replace: true });
  };

  const handleChangeLocationModal = (id: number[], isChecked: boolean) => {
    if (!isChecked) {
      setParams({
        ...params,
        city: params.city
          ?.split(",")
          .filter((val) => !id.includes(parseInt(val)))
          .join(","),
      });
    } else {
      setParams({
        ...params,
        city:
          params.city?.split(",").length !== 0
            ? [...params.city?.split(",")!, ...id].join(",")
            : `${id.join(",")}`,
      });
    }
  };

  const handleApplyPriceFilter = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let newParams: Record<string, string> = {
      q: search.get("q") !== null ? String(search.get("q")) : "",
    };

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "") {
        newParams[key] = value;
      }
    });

    setSearch(newParams, { replace: true });
  };

  const handleApplyPriceFilterModal = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let newParams: Record<string, string> = {
      q: search.get("q") !== null ? String(search.get("q")) : "",
    };

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "" && key !== "q") {
        if (value.at(0) === ",") {
          newParams[key] = value.substring(1);
        } else {
          newParams[key] = value;
        }
      }
    });

    setSearch(newParams, { replace: true });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [event.currentTarget.name]:
        event.currentTarget.value !== "" ? event.currentTarget.value : "",
    });
  };

  const handleClearFilter = () => {
    setSearch({ q: String(search.get("q")) }, { replace: true });
    setParams(SearchParamsState);
    setSortBy("view_count");
    setSort("desc");
    setDisplay("none");
  };

  const handleSelectCategory = (id: number, level: number) => {
    setParams({
      ...params,
      c: String(id),
      cl: String(level),
    });

    let newParams: Record<string, string> = {
      q: search.get("q") !== null ? String(search.get("q")) : "",
      c: String(id),
      cl: String(level),
    };

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "" && key !== "c" && key !== "cl") {
        newParams[key] = value;
      }
    });

    setSearch(newParams, { replace: true });
  };

  const handleSelectCategoryModal = (id: number, level: number) => {
    setParams({
      ...params,
      c: String(id),
      cl: String(level),
    });
  };

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
    let newParams: Record<string, string> = {
      q: search.get("q") !== null ? String(search.get("q")) : "",
    };

    if (event.currentTarget.checked) {
      setParams({
        ...params,
        rt: "4",
      });

      newParams["rt"] = "4";
    } else {
      setParams({ ...params, rt: "" });

      newParams = {
        q: search.get("q") !== null ? String(search.get("q")) : "",
      };
    }

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "" && key !== "rt") {
        newParams[key] = value;
      }
    });

    setSearch(newParams, { replace: true });
  };

  const handleChangeRatingModal = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setParams({
        ...params,
        rt: "4",
      });
    } else {
      setParams({ ...params, rt: "" });
    }
  };

  const handleChangeSort = (value: string) => {
    setSort(value);
  };

  const showHideClearFilterButton = () => {
    if (
      params.c !== "" ||
      params.city !== "" ||
      params.cl !== "" ||
      params.pmax !== "" ||
      params.pmin !== "" ||
      params.rt !== ""
    ) {
      setDisplay("flex");
      return;
    }

    setDisplay("none");
  };

  const handleFilter = () => {
    let addOnFilter: Record<string, string | number> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (key && value !== "" && key !== "q") {
        switch (key) {
          case "pmin":
            addOnFilter["min_price"] = value;
            break;
          case "pmax":
            addOnFilter["max_price"] = value;
            break;
          case "c":
            addOnFilter["category"] = value;
            break;
          case "cl":
            addOnFilter["category_level"] = value;
            break;
          case "rt":
            addOnFilter["min_rating"] = value;
            break;
          default:
            if (value.at(0) === ",") {
              addOnFilter[key] = value.substring(1);
            } else {
              addOnFilter[key] = value;
            }
        }
      }
    });

    getProducts({
      name: String(search.get("q")),
      limit: 30,
      sortBy,
      sort,
      page,
      ...addOnFilter,
    });
  };

  useEffect(() => {
    setParams({
      q: search.get("q") !== null ? String(search.get("q")) : "",
      pmin: search.get("pmin") !== null ? String(search.get("pmin")) : "",
      pmax: search.get("pmax") !== null ? String(search.get("pmax")) : "",
      c: search.get("c") !== null ? String(search.get("c")) : "",
      cl: search.get("cl") !== null ? String(search.get("cl")) : "",
      rt: search.get("rt") !== null ? String(search.get("rt")) : "",
      city: search.get("city") !== null ? String(search.get("city")) : "",
    });
    handleFilter();
    showHideClearFilterButton();
  }, [search, sortBy, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, sort]);

  useEffect(() => {
    fetchCategoriesProduct(
      search.get("q") !== null ? String(search.get("q")) : ""
    );
  }, [search]);

  return (
    <Container maxW="container.xl">
      <Box
        padding={{
          base: 5,
          sm: 5,
          md: 5,
          lg: 12,
          xl: 12,
        }}
      >
        {search.get("q") !== null &&
        search.get("q") !== undefined &&
        search.get("q")!.length > 0 ? (
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
              {'"' + search.get("q") + '"'}
            </Text>
          </HStack>
        ) : (
          ""
        )}
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
                  fontSize={{
                    lg: "md",
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
                    <InputLeftAddon
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      children="Rp"
                    />
                    <Input
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      type="number"
                      placeholder="Minimum Price"
                      _focusVisible={{
                        outline: "none",
                      }}
                      name={"pmin"}
                      value={params.pmin}
                      onChange={handlePriceChange}
                    />
                  </InputGroup>
                  <InputGroup
                    size={{
                      lg: "sm",
                      xl: "md",
                    }}
                  >
                    <InputLeftAddon
                      children="Rp"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <Input
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      type="number"
                      placeholder="Maximum Price"
                      _focusVisible={{
                        outline: "none",
                      }}
                      name={"pmax"}
                      value={params.pmax}
                      onChange={handlePriceChange}
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
                    onClick={handleApplyPriceFilter}
                  >
                    Apply filter
                  </Button>
                </VStack>
              </VStack>
              <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton py={2} px={1}>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading
                            fontSize={{
                              lg: "md",
                              xl: "md",
                            }}
                          >
                            Category
                          </Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        {categoriesProduct.length !== 0
                          ? categoriesProduct.map((category) => (
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
                                      onClick={() =>
                                        handleSelectCategory(category.id, 1)
                                      }
                                      role={"button"}
                                      fontSize={{
                                        lg: "sm",
                                        xl: "sm",
                                      }}
                                      fontWeight={
                                        params.c! === String(category.id) &&
                                        params.cl === "1"
                                          ? "bold"
                                          : "semibold"
                                      }
                                      color={
                                        params.c! === String(category.id) &&
                                        params.cl === "1"
                                          ? "primary"
                                          : "dark"
                                      }
                                    >
                                      {category.name}
                                    </Text>
                                  </HStack>
                                  <AccordionPanel py={0} pe={0}>
                                    {category.secondary_category &&
                                    category.secondary_category.length !== 0
                                      ? category.secondary_category.map(
                                          (secondary) => (
                                            <Accordion
                                              key={secondary.id}
                                              allowMultiple
                                            >
                                              <AccordionItem border={"none"}>
                                                <HStack spacing={8}>
                                                  <AccordionButton
                                                    px={0}
                                                    width={0}
                                                  >
                                                    <AccordionIcon />
                                                  </AccordionButton>
                                                  <Text
                                                    as="span"
                                                    noOfLines={1}
                                                    textAlign={"start"}
                                                    onClick={() =>
                                                      handleSelectCategory(
                                                        secondary.id,
                                                        2
                                                      )
                                                    }
                                                    role={"button"}
                                                    fontSize={{
                                                      lg: "sm",
                                                      xl: "sm",
                                                    }}
                                                    fontWeight={
                                                      params.c! ===
                                                        String(secondary.id) &&
                                                      params.cl === "2"
                                                        ? "bold"
                                                        : "semibold"
                                                    }
                                                    color={
                                                      params.c! ===
                                                        String(secondary.id) &&
                                                      params.cl === "2"
                                                        ? "primary"
                                                        : "dark"
                                                    }
                                                  >
                                                    {secondary.name}
                                                  </Text>
                                                </HStack>
                                                <AccordionPanel py={0} pe={0}>
                                                  {secondary.tertiary_category &&
                                                  secondary.tertiary_category
                                                    .length !== 0
                                                    ? secondary.tertiary_category.map(
                                                        (tertiary) => (
                                                          <Box
                                                            py={2}
                                                            key={tertiary.id}
                                                          >
                                                            <Text
                                                              as="span"
                                                              ms={"1em"}
                                                              px={3}
                                                              noOfLines={{
                                                                base: 1,
                                                                lg: 2,
                                                                xl: 1,
                                                              }}
                                                              textAlign={
                                                                "start"
                                                              }
                                                              onClick={() =>
                                                                handleSelectCategory(
                                                                  tertiary.id,
                                                                  3
                                                                )
                                                              }
                                                              role={"button"}
                                                              fontSize={{
                                                                lg: "sm",
                                                                xl: "sm",
                                                              }}
                                                              fontWeight={
                                                                params.c! ===
                                                                  String(
                                                                    tertiary.id
                                                                  ) &&
                                                                params.cl ===
                                                                  "3"
                                                                  ? "bold"
                                                                  : "semibold"
                                                              }
                                                              color={
                                                                params.c! ===
                                                                  String(
                                                                    tertiary.id
                                                                  ) &&
                                                                params.cl ===
                                                                  "3"
                                                                  ? "primary"
                                                                  : "dark"
                                                              }
                                                            >
                                                              {tertiary.name}
                                                            </Text>
                                                          </Box>
                                                        )
                                                      )
                                                    : ""}
                                                </AccordionPanel>
                                              </AccordionItem>
                                            </Accordion>
                                          )
                                        )
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
                            fontSize={{
                              lg: "md",
                              xl: "md",
                            }}
                          >
                            Rating
                          </Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <Checkbox
                          colorScheme={"default"}
                          onChange={handleChangeRating}
                          isChecked={params.rt !== ""}
                        >
                          <Icon.Star
                            mt={"-.3em"}
                            fill={"yellow.200"}
                            width={"1.2em"}
                            marginEnd={2}
                          />
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
                            fontSize={{
                              lg: "md",
                              xl: "md",
                            }}
                          >
                            Location
                          </Heading>
                        </Box>
                        {isExpanded ? <Icon.Minus /> : <Icon.Plus />}
                      </AccordionButton>
                      <AccordionPanel pb={4} px={1}>
                        <VStack alignItems={"start"}>
                          <Checkbox
                            colorScheme={"default"}
                            value="151"
                            onChange={(e) => {
                              handleChangeLocation(
                                [151, 152, 153, 154, 155, 189],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("151")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              DKI Jakarta
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="444"
                            onChange={(e) => {
                              handleChangeLocation(
                                [444],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("444")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Surabaya
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="278"
                            onChange={(e) => {
                              handleChangeLocation(
                                [278],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("278")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Medan
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="22"
                            onChange={(e) => {
                              handleChangeLocation(
                                [22, 23, 24],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("22")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Bandung
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="254"
                            onChange={(e) => {
                              handleChangeLocation(
                                [254],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("254")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Makassar
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="398"
                            onChange={(e) => {
                              handleChangeLocation(
                                [398, 399],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("398")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Semarang
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="327"
                            onChange={(e) => {
                              handleChangeLocation(
                                [327],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("327")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Palembang
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="48"
                            onChange={(e) => {
                              handleChangeLocation(
                                [48],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("48")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Batam
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="350"
                            onChange={(e) => {
                              handleChangeLocation(
                                [350],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("350")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Pekanbaru
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="255"
                            onChange={(e) => {
                              handleChangeLocation(
                                [255, 256],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("255")}
                          >
                            <Text
                              as={"span"}
                              fontWeight={"semibold"}
                              fontSize={"sm"}
                              noOfLines={1}
                            >
                              Malang
                            </Text>
                          </Checkbox>
                        </VStack>
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
            maxWidth={{
              base: "18rem",
              sm: "100%",
            }}
            justifySelf={{
              base: "center",
              sm: "auto",
            }}
          >
            <HStack
              justifyContent={"space-between"}
              __css={{
                margin: "0",
              }}
            >
              <HStack
                spacing={5}
                display={{
                  base: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                  xl: "flex",
                }}
              >
                <Text
                  fontSize={{
                    lg: "sm",
                    xl: "sm",
                  }}
                  fontWeight={"semibold"}
                  color={"lightDarken"}
                >
                  Sort by:
                </Text>
                <Button
                  fontWeight={sortBy === "view_count" ? "bold" : "semibold"}
                  color={sortBy === "view_count" ? "primary" : "dark"}
                  variant={"unstyled"}
                  size={{
                    lg: "sm",
                    xl: "md",
                  }}
                  onClick={() => handleChangeSortBy("view_count")}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "sm",
                    }}
                  >
                    Recommended
                  </Text>
                </Button>
                <Button
                  fontWeight={sortBy === "date" ? "bold" : "semibold"}
                  color={sortBy === "date" ? "primary" : "dark"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "sm",
                  }}
                  onClick={() => handleChangeSortBy("date")}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "sm",
                    }}
                  >
                    Newest
                  </Text>
                </Button>
                <Button
                  fontWeight={sortBy === "unit_sold" ? "bold" : "semibold"}
                  color={sortBy === "unit_sold" ? "primary" : "dark"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "sm",
                  }}
                  onClick={() => {
                    handleChangeSortBy("unit_sold");
                    handleChangeSort("desc");
                  }}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "sm",
                    }}
                  >
                    Most buy
                  </Text>
                </Button>
                <Button
                  fontWeight={sortBy === "lowest_price" ? "bold" : "semibold"}
                  color={sortBy === "lowest_price" ? "primary" : "dark"}
                  variant={"unstyled"}
                  size={{
                    lg: "xs",
                    xl: "md",
                  }}
                  onClick={() => handleChangeSortBy("lowest_price")}
                >
                  <Text
                    fontSize={{
                      lg: "sm",
                      xl: "sm",
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
                  onClick={() => {
                    sort === "desc"
                      ? handleChangeSort("asc")
                      : handleChangeSort("desc");
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
                    selected={sort}
                  />
                </Button>
              </HStack>
              <Button
                variant={"outline"}
                borderRadius={"md"}
                size={{
                  lg: "sm",
                  xl: "sm",
                }}
                onClick={handleClearFilter}
                display={{
                  base: "none",
                  sm: "none",
                  md: "none",
                  lg: display,
                  xl: display,
                }}
              >
                <Text
                  fontSize={{
                    lg: "sm",
                    xl: "sm",
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
                display={{
                  base: "flex",
                  sm: "flex",
                  md: "flex",
                  lg: "none",
                  xl: "none",
                }}
              >
                <HStack>
                  <Menu isLazy>
                    <MenuButton
                      fontSize={{
                        base: "sm",
                        sm: "sm",
                        md: "md",
                      }}
                    >
                      {sortBy === "view_count"
                        ? "Recommended"
                        : sortBy === "date"
                        ? "Newest"
                        : sortBy === "unit_sold"
                        ? "Most buy"
                        : "lowest_price"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => handleChangeSortBy("view_count")}
                      >
                        Recommended
                      </MenuItem>
                      <MenuItem onClick={() => handleChangeSortBy("date")}>
                        Newest
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleChangeSortBy("unit_sold");
                          handleChangeSort("desc");
                        }}
                      >
                        Most buy
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleChangeSortBy("lowest_price")}
                      >
                        Price
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Button
                    variant={"unstyled"}
                    size={{
                      base: "xs",
                      sm: "sm",
                      md: "md",
                    }}
                    onClick={() => {
                      sort === "desc"
                        ? handleChangeSort("asc")
                        : handleChangeSort("desc");
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
                      selected={sort}
                    />
                  </Button>
                </HStack>
                <HStack>
                  <Button
                    textDecoration={display === "flex" ? "underline" : ""}
                    fontWeight={"normal"}
                    variant={"unstyled"}
                    onClick={onOpen}
                    size={{
                      base: "sm",
                      sm: "sm",
                      md: "md",
                    }}
                  >
                    Filter
                  </Button>
                  <IconButton
                    size={"sm"}
                    aria-label="close"
                    variant={"unstyled"}
                    icon={<Icon.Close />}
                    onClick={handleClearFilter}
                    display={display}
                    width={{
                      base: "1em",
                      sm: "1.3em",
                      md: "1.3em",
                    }}
                    height={{
                      base: "1em",
                      sm: "1.3em",
                      md: "1.3em",
                    }}
                  />
                </HStack>
              </HStack>
            </HStack>

            <Box>
              {products?.data.length !== 0 ? (
                <Flex
                  wrap={"wrap"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  rowGap={{ base: 1, sm: 3, lg: 2 }}
                  columnGap={{ base: 1, sm: 2, lg: 1 }}
                  _after={{
                    md: { content: '""', flex: "auto" },
                    lg: { content: "none" },
                  }}
                >
                  {products?.data.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </Flex>
              ) : (
                <NoProductContainer />
              )}
            </Box>

            {products?.data.length !== 0 ? (
              <Pagination
                data={{
                  current_page: products?.current_page
                    ? products.current_page
                    : 0,
                  total_page: products?.total_page! ? products.total_page : 0,
                }}
                setPage={setPage}
              />
            ) : (
              ""
            )}
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
                      name={"pmin"}
                      value={params.pmin}
                      onChange={handlePriceChange}
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
                      name={"pmax"}
                      value={params.pmax}
                      onChange={handlePriceChange}
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
                        {categoriesProduct.length !== 0
                          ? categoriesProduct.map((category) => (
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
                                      onClick={() => {
                                        handleSelectCategoryModal(
                                          category.id,
                                          1
                                        );
                                      }}
                                      role={"button"}
                                      fontSize={{
                                        base: "sm",
                                        sm: "sm",
                                        md: "md",
                                      }}
                                      fontWeight={
                                        params.c! === String(category.id) &&
                                        params.cl === "1"
                                          ? "bold"
                                          : "normal"
                                      }
                                    >
                                      {category.name}
                                    </Text>
                                  </HStack>
                                  <AccordionPanel py={0} pe={0}>
                                    {category.secondary_category &&
                                    category.secondary_category.length !== 0
                                      ? category.secondary_category.map(
                                          (secondary) => (
                                            <Accordion
                                              key={secondary.id}
                                              allowMultiple
                                            >
                                              <AccordionItem border={"none"}>
                                                <HStack spacing={8}>
                                                  <AccordionButton
                                                    px={0}
                                                    width={0}
                                                  >
                                                    <AccordionIcon />
                                                  </AccordionButton>
                                                  <Text
                                                    as="span"
                                                    noOfLines={1}
                                                    textAlign={"start"}
                                                    onClick={() => {
                                                      handleSelectCategoryModal(
                                                        secondary.id,
                                                        2
                                                      );
                                                    }}
                                                    role={"button"}
                                                    fontSize={{
                                                      base: "sm",
                                                      sm: "sm",
                                                      md: "md",
                                                    }}
                                                    fontWeight={
                                                      params.c! ===
                                                        String(secondary.id) &&
                                                      params.cl === "2"
                                                        ? "bold"
                                                        : "normal"
                                                    }
                                                  >
                                                    {secondary.name}
                                                  </Text>
                                                </HStack>
                                                <AccordionPanel py={0} pe={0}>
                                                  {secondary.tertiary_category &&
                                                  secondary.tertiary_category
                                                    .length !== 0
                                                    ? secondary.tertiary_category.map(
                                                        (tertiary) => (
                                                          <Box
                                                            py={2}
                                                            key={tertiary.id}
                                                          >
                                                            <Text
                                                              as="span"
                                                              ms={"1em"}
                                                              px={3}
                                                              noOfLines={{
                                                                base: 1,
                                                                lg: 2,
                                                                xl: 1,
                                                              }}
                                                              textAlign={
                                                                "start"
                                                              }
                                                              onClick={() => {
                                                                handleSelectCategoryModal(
                                                                  tertiary.id,
                                                                  3
                                                                );
                                                              }}
                                                              role={"button"}
                                                              fontSize={{
                                                                base: "sm",
                                                                sm: "sm",
                                                                md: "md",
                                                              }}
                                                              fontWeight={
                                                                params.c! ===
                                                                  String(
                                                                    tertiary.id
                                                                  ) &&
                                                                params.cl ===
                                                                  "3"
                                                                  ? "bold"
                                                                  : "normal"
                                                              }
                                                            >
                                                              {tertiary.name}
                                                            </Text>
                                                          </Box>
                                                        )
                                                      )
                                                    : ""}
                                                </AccordionPanel>
                                              </AccordionItem>
                                            </Accordion>
                                          )
                                        )
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
                        <Checkbox
                          colorScheme={"default"}
                          onChange={(e) => {
                            handleChangeRatingModal(e);
                          }}
                          isChecked={params.rt !== ""}
                        >
                          <Icon.Star
                            mt={"-.3em"}
                            fill={"orange"}
                            width={"1.2em"}
                            marginEnd={2}
                          />
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
                        <VStack alignItems={"start"}>
                          <Checkbox
                            colorScheme={"default"}
                            value="151"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [151, 152, 153, 154, 155, 189],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("151")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              DKI Jakarta
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="444"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [444],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("444")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Surabaya
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="278"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [278],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("278")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Medan
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="22"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [22, 23, 24],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("22")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Bandung
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="254"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [254],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("254")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Makassar
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="398"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [398, 399],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("398")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Semarang
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="327"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [327],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("327")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Palembang
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="48"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [48],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("48")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Batam
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="350"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [350],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("350")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Pekanbaru
                            </Text>
                          </Checkbox>
                          <Checkbox
                            colorScheme={"default"}
                            value="255"
                            onChange={(e) => {
                              handleChangeLocationModal(
                                [255, 256],
                                e.currentTarget.checked
                              );
                            }}
                            isChecked={params.city?.includes("255")}
                          >
                            <Text as={"span"} noOfLines={1}>
                              Malang
                            </Text>
                          </Checkbox>
                        </VStack>
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
              onClick={(e) => {
                handleApplyPriceFilterModal(e);
                onClose();
              }}
              variant={"outline"}
              borderRadius={"md"}
            >
              Apply Filter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Search;
