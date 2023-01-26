import { useParams } from "react-router-dom";
import {
  Container,
  Skeleton,
  Tab,
  TabList,
  Tabs,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Grid,
  GridItem,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShop from "../../hooks/useShop";
import {
  IFlatShopCategories,
  IShopHomeProductsProps,
  IShopProfilePayload,
} from "../../interfaces/Shop";
import ShopHomeProducts from "./ShopHomeProducts";
import ShopProfile from "./ShopProfile";
import ShopHomeProductsOverview from "./ShopHomeProductsOverview";
import { useScroll } from "../../hooks/useScroll";
import ShopCategoryBeside from "./ShopCategoryBeside";
import Icon from "../../assets/icons";
import useTitle from "../../hooks/useTitle";

function ShopHome() {
  const { shopUsername } = useParams();
  useTitle(`BAZR | ${shopUsername}`);
  const [isFetchShopProfileLoaded, setIsFetchShopProfileLoaded] =
    useState(true);
  const [shopProfile, setShopProfile] = useState<IShopProfilePayload | null>({
    id: 0,
    name: "",
    username: "",
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
    useState<boolean>(true);
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
    const _useEffectAsync = async () => {
      setIsFetchShopProfileLoaded(false);
      const response = await fetchShopProfileByShopUsername(shopUsername!);
      setShopProfile(response);
      setIsFetchShopProfileLoaded(true);

      setIsShopCategoriesLoaded(false);
      const shopCategories = await fetchShopCategories(response?.id!);
      if (shopCategories) {
        setshopCategories2(flattenShopCategories(shopCategories));
      }
      setIsShopCategoriesLoaded(true);
    };
    _useEffectAsync();
  }, [shopUsername]);
  return (
    <Container maxW="8xl">
      <ShopProfile
        isFetchShopProfileLoaded={isFetchShopProfileLoaded}
        shopProfile={shopProfile}
      />
      <Tabs
        isFitted
        isLazy
        onChange={() => setIsAutoScrollToProducts(true)}
        index={indexActiveTab}
        colorScheme="red"
        display={{
          base: "none",
          md: "block",
        }}
      >
        <TabList>
          <Tab
            onClick={() => {
              changeCategory(myConst.indexUnset);
              setIndexActiveTab(myConst.indexTabAllProduct);
              setIndexCategorySelect(myConst.indexUnset);
            }}
          >
            All Products
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
                <Skeleton isLoaded={isShopCategoriesLoaded}>
                  {category.name}
                </Skeleton>
              </Tab>
            ))}
          {shopCategories.length > requirements.tabQuantityToBeDisplay ? (
            <Tab>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Text>
                    Others
                    <Icon.ArrowDown />
                  </Text>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    {shopCategories
                      .slice(requirements.tabQuantityToBeDisplay)
                      .map((category, index) => (
                        <Text
                          onClick={() => {
                            changeCategory(
                              index + requirements.tabQuantityToBeDisplay
                            );
                            setIndexActiveTab(myConst.indexTabOther);
                            setIndexCategorySelect(
                              index + requirements.tabQuantityToBeDisplay
                            );
                          }}
                          textColor={
                            categoryId ===
                            shopCategories[
                              index + requirements.tabQuantityToBeDisplay
                            ].id
                              ? ""
                              : "black"
                          }
                          key={`${category.id};${index}`}
                        >
                          {category.name}
                        </Text>
                      ))}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tab>
          ) : (
            ""
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
