import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
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
  const { getPrimaryCategoryBySlugifiedName } = useCategory();
  useTitle("BAZR | " + getPrimaryCategoryBySlugifiedName(cPrimary!)?.name);
  const { products, getProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const category = getPrimaryCategoryBySlugifiedName(cPrimary!);
    const filter: ISearchFilterPayload = {
      category: category?.id,
      category_level: "1",
      limit: 30,
    };
    getProducts(filter);
  }, []);

  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          <span>{getPrimaryCategoryBySlugifiedName(cPrimary!)?.name}</span>
        </Heading>
        <CategoryWrapper>
          {getPrimaryCategoryBySlugifiedName(cPrimary!) !== undefined
            ? getPrimaryCategoryBySlugifiedName(
                cPrimary!
              )?.secondary_category.map((secondary_category) => {
                return (
                  <CategoryCard
                    {...secondary_category}
                    key={secondary_category.id}
                    onClick={() => {
                      navigate(
                        `/p/${cPrimary}/${slugify(
                          secondary_category.name
                        )}?q=&c=${secondary_category.id}&cl=2`
                      );
                    }}
                  />
                );
              })
            : ""}
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
        {products.data.length !== 0 ? (
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(6, 1fr)",
            }}
            placeItems={{
              base: "center",
              sm: "center",
              md: "initial",
              lg: "initial",
            }}
            gap={6}
          >
            {products.data.map((product) => {
              return (
                <GridItem key={product.id}>
                  <ProductCard {...product} />
                </GridItem>
              );
            })}
          </Grid>
        ) : (
          <Center>no products</Center>
        )}
      </Box>
    </>
  );
}

export default CategoryPrimary;
