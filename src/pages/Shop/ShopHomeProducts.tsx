import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import ProductCard from "../../components/Card/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import useProduct from "../../hooks/useProduct";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import { IShopHomeProductsProps } from "../../interfaces/Shop";
import {
  IProductPaginationPayload,
  IProductPayload,
} from "../../interfaces/Product";

function ShopHomeProducts(props: IShopHomeProductsProps) {
  const {
    sortByOption,
    sortOption,
    requirements,
    sortBy,
    setSortBy,
    sort,
    setSort,
    page,
    setPage,
  } = props;

  const { fetchShopProducts } = useProduct();
  const [shopProducts, setShopProducts] = useState<IProductPaginationPayload>({
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  });

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangeSort = (value: string) => {
    setSort(value);
  };

  const myConst = {
    categoryIdUnset: 0,
  };

  useEffect(() => {
    const _useEffectAsync = async () => {
      const searchFilterPayload: ISearchFilterPayload = {
        limit: requirements.quantityProductToDisplay,
        sort: sort,
        sortBy: sortBy,
        page: page,
      };
      if (props.category_id && props.category_id !== myConst.categoryIdUnset) {
        searchFilterPayload.category = props.category_id;
        searchFilterPayload.category_level = props.category_level;
      }
      const shopProducts = await fetchShopProducts(
        props.shopId,
        searchFilterPayload
      );
      if (shopProducts) {
        setShopProducts(shopProducts);
      }
    };
    _useEffectAsync();
  }, [
    sortBy,
    sort,
    page,
    props.shopId,
    props.category_id,
    props.category_level,
  ]);

  const showShopProducts = (limit?: number) => {
    let shopProductsData: IProductPayload[] = shopProducts.data;
    const limit_is_given = limit !== undefined;
    if (limit_is_given) {
      shopProductsData = shopProductsData.slice(0, limit);
    }
    return shopProductsData.map((product) => (
      <ProductCard key={product.id} {...product} />
    ));
  };

  useEffect(() => {
    if (props.is_auto_scroll_to_products) {
      props.scrollToSortOption();
    }
  }, [props.scrollToSortOption]);

  return (
    <>
      <HStack
        ref={props.sortOptionRef}
        spacing={5}
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "none",
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
      <Box className="py-3">
        <Flex wrap="wrap" direction="row" justifyContent="space-evenly" gap={2}>
          {shopProducts.data.length !== 0 ? (
            showShopProducts()
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
        </Flex>
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
