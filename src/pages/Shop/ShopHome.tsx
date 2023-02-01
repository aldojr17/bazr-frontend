import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Skeleton,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../assets/icons";
import { useScroll } from "../../hooks/useScroll";
import useShop from "../../hooks/useShop";
import useTitle from "../../hooks/useTitle";
import {
  IFlatShopCategories,
  IShopHomeProductsProps,
  IShopProfilePayload,
} from "../../interfaces/Shop";
import { formatTitle } from "../../util/util";
import ShopCategoryBeside from "./ShopCategoryBeside";
import ShopHomeProducts from "./ShopHomeProducts";
import ShopHomeProductsOverview from "./ShopHomeProductsOverview";
import ShopProfile from "./ShopProfile";

function ShopHome() {
  const { shopUsername } = useParams();
  useTitle(formatTitle(shopUsername!));
  const [isFetchShopProfileLoaded, setIsFetchShopProfileLoaded] =
    useState(false);
  const [shopProfile, setShopProfile] = useState<IShopProfilePayload | null>({
    id: 0,
    name: "",
    username: "",
    profile_picture: "",
    city: "",
    joined_at: "",
    total_product: 0,
  });
  const {
    fetchShopProfileByShopUsername,
    fetchShopCategories,
    flattenShopCategories,
  } = useShop();
  const [shopCategories, setshopCategories2] = useState<IFlatShopCategories[]>(
    []
  );
  const [isShopCategoriesLoaded, setIsShopCategoriesLoaded] =
    useState<boolean>(false);
  const myConst = {
    indexUnset: -1,
    categoryIdUnset: 0,
    categoryLevelUnset: 0,
    indexTabAllProduct: 0,
    indexTabOther: 5,
  };
  const [categoryId, setCategoryId] = useState(myConst.categoryIdUnset);
  const [categoryLevel, setCategoryLevel] = useState(
    myConst.categoryLevelUnset
  );
  const [scrollToSortOption, sortOptionRef] = useScroll();
  const [isAutoScrollToProducts, setIsAutoScrollToProducts] = useState(false);
  const [indexActiveTab, setIndexActiveTab] = useState(0);
  const sortByOption: IShopHomeProductsProps["sortByOption"] = {
    RECOMMENDED: "view_count",
    NEWEST: "date",
    MOST_BUY: "unit_sold",
    PRICE: "lowest_price",
  };

  const sortOption: IShopHomeProductsProps["sortOption"] = {
    ASCENDING: "asc",
    DESCENDING: "desc",
  };

  const requirements: IShopHomeProductsProps["requirements"] = {
    quantityProductToDisplay: 20,
    sortBy: {
      purchased: sortByOption.MOST_BUY,
      most: sortOption.DESCENDING,
    },
    quantityProductToDisplayLessVersion: 6,
    tabQuantityToBeDisplay: 4,
  };
  const [sortBy, setSortBy] = useState<string>(requirements.sortBy.purchased);
  const [sort, setSort] = useState<string>(requirements.sortBy.most);
  const [page, setPage] = useState<number>(1);
  const [indexCategorySelect, setIndexCategorySelect] = useState(
    myConst.indexUnset
  );

  const resetSortBy = () => {
    setSortBy(requirements.sortBy.purchased);
  };

  const resetSort = () => {
    setSort(requirements.sortBy.most);
  };

  const resetPage = () => {
    setPage(1);
  };

  function resetCategory() {
    setCategoryId(myConst.categoryIdUnset);
    setCategoryLevel(myConst.categoryLevelUnset);
  }

  function changeCategory(index: number) {
    if (index === myConst.indexUnset) {
      setCategoryId(myConst.categoryIdUnset);
      setCategoryLevel(myConst.categoryLevelUnset);
      return;
    }
    setCategoryId(shopCategories[index].id);
    setCategoryLevel(shopCategories[index].level);
  }

  const handleSelectChangeShopCategoryProducts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCategory(parseInt(event.target.value));
    let _indexTabsToBeActived = parseInt(event.target.value) + 1;
    if (_indexTabsToBeActived >= myConst.indexTabOther) {
      _indexTabsToBeActived = 5;
    }
    setIndexActiveTab(_indexTabsToBeActived);
    setIndexCategorySelect(parseInt(event.target.value));
  };

  useEffect(() => {
    fetchShopProfileByShopUsername(shopUsername!).then((response) => {
      setShopProfile(response);
      setIsFetchShopProfileLoaded(true);

      fetchShopCategories(response?.id!).then((res) => {
        setshopCategories2(flattenShopCategories(res!));
        setIsShopCategoriesLoaded(true);
      });
    });
  }, [shopUsername]);

  return (
    <Container maxW="container.xl">
      <ShopProfile
        isLoaded={isFetchShopProfileLoaded}
        shopProfile={shopProfile}
      />
      <Tabs
        isFitted
        isLazy
        onChange={() => setIsAutoScrollToProducts(true)}
        index={indexActiveTab}
        display={{
          base: "none",
          md: "block",
        }}
        variant={"default"}
      >
        <TabList>
          <Tab
            onClick={() => {
              changeCategory(myConst.indexUnset);
              setIndexActiveTab(myConst.indexTabAllProduct);
              setIndexCategorySelect(myConst.indexUnset);
            }}
          >
            <Text noOfLines={1}>All Products</Text>
          </Tab>
          {shopCategories
            .slice(0, requirements.tabQuantityToBeDisplay)
            .map((category, index) => (
              <Tab
                onClick={() => {
                  changeCategory(index);
                  setIndexActiveTab(index + 1);
                  setIndexCategorySelect(index);
                }}
                key={`${category.id};${index}`}
              >
                <Skeleton isLoaded={isShopCategoriesLoaded} noOfLines={1}>
                  {category.name}
                </Skeleton>
              </Tab>
            ))}
          {shopCategories.length > requirements.tabQuantityToBeDisplay && (
            <Tab>
              <Popover offset={[15, 12]} placement={"bottom-end"}>
                <PopoverTrigger>
                  <HStack
                    gap={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Text>Others</Text>
                    <Icon.ChevronDown pt={1} fill={"currentcolor"} />
                  </HStack>
                </PopoverTrigger>
                <PopoverContent width={"fit-content"}>
                  <PopoverBody width={"200px"} display={"block"}>
                    {shopCategories
                      .slice(requirements.tabQuantityToBeDisplay)
                      .map((category, index) => (
                        <Text
                          align={"end"}
                          mb={1}
                          onClick={() => {
                            changeCategory(
                              index + requirements.tabQuantityToBeDisplay
                            );
                            setIndexActiveTab(myConst.indexTabOther);
                            setIndexCategorySelect(
                              index + requirements.tabQuantityToBeDisplay
                            );
                          }}
                          color={
                            categoryId ===
                              shopCategories[
                                index + requirements.tabQuantityToBeDisplay
                              ].id &&
                            categoryLevel ===
                              shopCategories[
                                index + requirements.tabQuantityToBeDisplay
                              ].level
                              ? ""
                              : "darkLighten"
                          }
                          fontSize={"md"}
                          key={`${category.id};${index}`}
                          _hover={{ color: "dark" }}
                        >
                          {category.name}
                        </Text>
                      ))}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tab>
          )}
        </TabList>
      </Tabs>
      <Box className="py-4">
        <ShopHomeProductsOverview
          shopId={shopProfile!.id}
          resetCategory={resetCategory}
          setIndexActiveTab={setIndexActiveTab}
          scrollToSortOption={scrollToSortOption}
          resetSortBy={resetSortBy}
          resetSort={resetSort}
          resetPage={resetPage}
        />
      </Box>
      <HStack
        width={"100%"}
        bg="secondaryLighten"
        px={4}
        justifyContent={"space-between"}
        display={{
          base: "flex",
          sm: "flex",
          md: "flex",
          lg: "flex",
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
              {sortBy === sortByOption.RECOMMENDED
                ? "Recommended"
                : sortBy === sortByOption.NEWEST
                ? "Newest"
                : sortBy === sortByOption.MOST_BUY
                ? "Most buy"
                : "Price"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortBy(sortByOption.RECOMMENDED)}>
                Recommended
              </MenuItem>
              <MenuItem onClick={() => setSortBy(sortByOption.NEWEST)}>
                Newest
              </MenuItem>
              <MenuItem onClick={() => setSortBy(sortByOption.MOST_BUY)}>
                Most buy
              </MenuItem>
              <MenuItem onClick={() => setSortBy(sortByOption.PRICE)}>
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
                ? setSort(sortOption.ASCENDING)
                : setSort(sortOption.DESCENDING);
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
        <HStack className="p-2">
          <Select
            variant="outline"
            borderRadius={"2xl"}
            borderWidth={"medium"}
            onChange={handleSelectChangeShopCategoryProducts}
            value={indexCategorySelect}
          >
            <option value={myConst.indexUnset}>All Products</option>
            {shopCategories.map((category, index) => (
              <option key={index} value={index}>
                {category.name}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(6, 1fr)" className="pt-4">
        <GridItem
          display={{
            base: "none",
            xl: "flex",
          }}
          className="px-3"
          colSpan={{
            base: 0,
            xl: 1,
          }}
        >
          <Box>
            <Flex alignItems="center" fontWeight="bold">
              <Icon.Hamburger width="1.5em" height="1.5em" fontWeight="bold" />
              <Text fontWeight="bold" className="ps-1" fontSize="1.5em">
                CATEGORY
              </Text>
            </Flex>
            <ShopCategoryBeside
              shopCategories={shopCategories}
              activeCategoryId={categoryId}
              activeCategoryLevel={categoryLevel}
              setCategoryId={setCategoryId}
              setCategoryLevel={setCategoryLevel}
              resetCategory={resetCategory}
              setIndexActiveTab={setIndexActiveTab}
              setIndexCategorySelect={setIndexCategorySelect}
            />
          </Box>
        </GridItem>
        <GridItem
          className="px-3"
          colSpan={{
            base: 6,
            xl: 5,
          }}
        >
          <Box>
            <ShopHomeProducts
              shopId={shopProfile!.id}
              category_id={categoryId}
              category_level={categoryLevel}
              is_auto_scroll_to_products={isAutoScrollToProducts}
              scrollToSortOption={scrollToSortOption}
              sortOptionRef={sortOptionRef}
              sortByOption={sortByOption}
              sortOption={sortOption}
              requirements={requirements}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sort={sort}
              setSort={setSort}
              page={page}
              setPage={setPage}
            />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default ShopHome;
