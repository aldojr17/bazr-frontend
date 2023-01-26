import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/Card/ProductCard";
import CategoryScrollableContainer from "../../components/Container/CategoryScrollableContainer";
import useCategory from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";
import useTitle from "../../hooks/useTitle";
import { IPrimaryCategoryPayload } from "../../interfaces/Category";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import { formatTitle } from "../../util/util";

function CategoryPrimary() {
  const { cPrimary } = useParams();
  const {
    categoryLoading,
    fetchCategoriesProduct,
    fetchPrimaryCategoryBySlugifiedName,
  } = useCategory();
  const { products, fetchAllProducts } = useProduct();

  const [primaryCategory, setPrimaryCategory] =
    useState<IPrimaryCategoryPayload | null>(null);

  useTitle(formatTitle(primaryCategory?.name!));

  useEffect(() => {
    window.scrollTo(0, 0);
    const primary = fetchPrimaryCategoryBySlugifiedName(cPrimary!);
    const filter: ISearchFilterPayload = {
      category: primary?.id,
      category_level: 1,
      limit: 30,
    };

    setPrimaryCategory(primary ?? null);

    fetchAllProducts(filter);
  }, [categoryLoading]);

  useEffect(() => {
    fetchCategoriesProduct("");
  }, []);

  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        {primaryCategory && (
          <BreadCrumb
            categories={{
              id: 0,
              primary_category: {
                id: primaryCategory.id,
                name: primaryCategory.name,
              },
            }}
          />
        )}
        {primaryCategory && (
          <CategoryScrollableContainer
            categoryLevel="secondary"
            primaryURL={cPrimary}
            categories={primaryCategory?.secondary_category!}
            label={primaryCategory?.name}
          />
        )}
      </Box>

      <Box className="px-4 px-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          PRODUCTS
        </Heading>
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
          {products.data.length !== 0 ? (
            products.data.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <Center>
              <Text>No products available.</Text>
            </Center>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default CategoryPrimary;
