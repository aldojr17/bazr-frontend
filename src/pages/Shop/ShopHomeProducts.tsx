import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import ProductCard from "../../components/Card/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import useProduct from "../../hooks/useProduct";
import { IProductPaginationPayload } from "../../interfaces/Product";

interface IProps {
  shopId: number;
}

function ShopHomeProducts(props: IProps) {
  const { getShopProducts } = useProduct();
  const [shopProducts, setshopProducts] = useState<IProductPaginationPayload>({
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  });
  const [isShopProductsLoaded, setIsShopProductsLoaded] = useState(true);
  const sortByOption = {
    RECOMMENDED: "view_count",
    NEWEST: "date",
    MOST_BUY: "unit_sold",
    PRICE: "lowest_price",
  };
  const sortOption = {
    ASCENDING: "asc",
    DESCENDING: "desc",
  };
  const requirement = {
    quantityProductToDisplay: 20,
    sortBy: {
      purchased: sortByOption.MOST_BUY,
      most: sortOption.DESCENDING,
    },
  };
  const [sortBy, setSortBy] = useState<string>(requirement.sortBy.purchased);
  const [sort, setSort] = useState<string>(requirement.sortBy.most);
  const [page, setPage] = useState<number>(1);

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangeSort = (value: string) => {
    setSort(value);
  };

  useEffect(() => {
    const _useEffectAsync = async () => {
      setIsShopProductsLoaded(false);
      const shopProducts = await getShopProducts(props.shopId, {
        limit: requirement.quantityProductToDisplay,
        sort: sort,
        sortBy: sortBy,
        page: page,
      });
      if (shopProducts) {
        setshopProducts(shopProducts);
      }
      setIsShopProductsLoaded(true);
    };
    _useEffectAsync();
  }, [sortBy, sort, page]);
  return (
    <>
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
            xl: "lg",
          }}
        >
          Sort by:
        </Text>
        <Button
          fontWeight={sortBy === sortByOption.RECOMMENDED ? "bold" : "normal"}
          variant={"unstyled"}
          size={{
            lg: "sm",
            xl: "md",
          }}
          onClick={() => handleChangeSortBy(sortByOption.RECOMMENDED)}
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
          fontWeight={sortBy === sortByOption.NEWEST ? "bold" : "normal"}
          variant={"unstyled"}
          size={{
            lg: "xs",
            xl: "md",
          }}
          onClick={() => handleChangeSortBy(sortByOption.NEWEST)}
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
          fontWeight={sortBy === sortByOption.MOST_BUY ? "bold" : "normal"}
          variant={"unstyled"}
          size={{
            lg: "xs",
            xl: "md",
          }}
          onClick={() => handleChangeSortBy(sortByOption.MOST_BUY)}
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
          fontWeight={sortBy === sortByOption.PRICE ? "bold" : "normal"}
          variant={"unstyled"}
          size={{
            lg: "xs",
            xl: "md",
          }}
          onClick={() => handleChangeSortBy(sortByOption.PRICE)}
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
          onClick={() => {
            sort === sortOption.DESCENDING
              ? handleChangeSort(sortOption.ASCENDING)
              : handleChangeSort(sortOption.DESCENDING);
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
              {sortBy === sortByOption.RECOMMENDED
                ? "Recommended"
                : sortBy === sortByOption.NEWEST
                ? "Newest"
                : sortBy === sortByOption.MOST_BUY
                ? "Most buy"
                : "Price"}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => handleChangeSortBy(sortByOption.RECOMMENDED)}
              >
                Recommended
              </MenuItem>
              <MenuItem onClick={() => handleChangeSortBy(sortByOption.NEWEST)}>
                Newest
              </MenuItem>
              <MenuItem
                onClick={() => handleChangeSortBy(sortByOption.MOST_BUY)}
              >
                Most buy
              </MenuItem>
              <MenuItem onClick={() => handleChangeSortBy(sortByOption.PRICE)}>
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
                ? handleChangeSort(sortOption.ASCENDING)
                : handleChangeSort(sortOption.DESCENDING);
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
      </HStack>
      <Box marginTop={5}>
        <Grid
          templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          placeItems="center"
          gap={6}
        >
          {shopProducts.data.length !== 0 ? (
            shopProducts.data.map((product) => (
              <Skeleton key={product.id} isLoaded={isShopProductsLoaded}>
                <GridItem>
                  <ProductCard {...product} />
                </GridItem>
              </Skeleton>
            ))
          ) : (
            <GridItem
              colSpan={{
                base: 2,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
              }}
            >
              <Center>
                <Text>No products available.</Text>
              </Center>
            </GridItem>
          )}
        </Grid>
      </Box>
      <Box>
        {shopProducts?.data.length !== 0 ? (
          <Pagination
            data={{
              current_page: shopProducts?.current_page
                ? shopProducts.current_page
                : 0,
              total_page: shopProducts?.total_page!
                ? shopProducts.total_page
                : 0,
            }}
            setPage={setPage}
          />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default ShopHomeProducts;
