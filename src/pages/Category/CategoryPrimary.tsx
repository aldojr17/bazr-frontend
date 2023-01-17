import { Box, Center, Flex, Text, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { CategoryWrapper } from "../Home/style";
import CategoryCard from "../../components/Card/CategoryCard";
import { useEffect } from "react";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import useProduct from "../../hooks/useProduct";
import useTitle from "../../hooks/useTitle";
import ProductCard from "../../components/Card/ProductCard";
import slugify from "slugify";

function CategoryPrimary() {
  const { cPrimary } = useParams();
  const { fetchPrimaryCategoryBySlugifiedName } = useCategory();
  useTitle("BAZR | " + fetchPrimaryCategoryBySlugifiedName(cPrimary!)?.name);
  const { products, getProducts } = useProduct();
  const navigate = useNavigate();

  const slugifiedPrimary = fetchPrimaryCategoryBySlugifiedName(cPrimary!);

  useEffect(() => {
    window.scrollTo(0, 0);
    const category = fetchPrimaryCategoryBySlugifiedName(cPrimary!);
    const filter: ISearchFilterPayload = {
      category: category?.id,
      category_level: "1",
      limit: 30,
    };
    getProducts(filter);
  }, [cPrimary]);

  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          <span>{fetchPrimaryCategoryBySlugifiedName(cPrimary!)?.name}</span>
        </Heading>
        <CategoryWrapper>
          {slugifiedPrimary?.secondary_category?.map((secondary_category) => {
            return (
              <CategoryCard
                {...secondary_category}
                key={secondary_category.id}
                onClick={() => {
                  navigate(
                    `/p/${cPrimary}/${slugify(secondary_category.name)}?q=&c=${
                      secondary_category.id
                    }&cl=2`
                  );
                }}
              />
            );
          })}
        </CategoryWrapper>
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
            products.data.map((product) => <ProductCard {...product} />)
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
