import { Box, Center, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Card/ProductCard";
import useProduct from "../../hooks/useProduct";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import { IProductPaginationPayload } from "../../interfaces/Product";
import { IShopHomeProductsOverviewProps } from "../../interfaces/Shop";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";

function ShopHomeProductsOverview(props: IShopHomeProductsOverviewProps) {
  const { getShopProducts } = useProduct();
  const [shopProducts, setshopProducts] = useState<IProductPaginationPayload>({
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  });

  const requirement = {
    quantityProductToDisplay: 6,
    sortBy: {
      purchased: "unit_sold",
      most: "desc",
    },
  };

  const myConst = {
    indexTabAllProduct: 0,
  };

  useEffect(() => {
    const _useEffectAsync = async () => {
      const searchFilterPayload: ISearchFilterPayload = {
        limit: requirement.quantityProductToDisplay,
        sort: requirement.sortBy.most,
        sortBy: requirement.sortBy.purchased,
      };
      const shopProducts = await getShopProducts(
        props.shopId,
        searchFilterPayload
      );
      if (shopProducts) {
        setshopProducts(shopProducts);
      }
    };
    _useEffectAsync();
  }, [props.shopId]);

  return (
    <Box className="py-3">
      <Flex justifyContent="space-between">
        <Heading
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          Best Selling Products
        </Heading>
        <Box
          onClick={() => {
            props.resetCategory();
            props.setIndexActiveTab(myConst.indexTabAllProduct);
            props.resetSortBy();
            props.resetSort();
            props.resetPage();
            props.scrollToSortOption();
          }}
          paddingEnd={{
            base: "",
            sm: "2",
            md: "15",
            lg: "30",
          }}
          color="primary"
          role="button"
        >
          More Best Selling {">"}
        </Box>
      </Flex>
      <Flex
        wrap="wrap"
        direction="row"
        justifyContent="space-evenly"
        rowGap={{ base: 1, sm: 3, lg: 2 }}
        columnGap={{ base: 1, sm: 2, lg: 1 }}
        _after={{
          md: { content: '""', flex: "auto" },
          lg: { content: "none" },
        }}
      >
        {shopProducts.data.length !== 0 ? (
          <XScrollableWrapper>
            {shopProducts.data.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </XScrollableWrapper>
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
  );
}

export default ShopHomeProductsOverview;
