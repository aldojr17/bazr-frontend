import { Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CategoryScrollableContainer from "../../components/Container/CategoryScrollableContainer";
import ProductContainer from "../../components/Container/ProductContainer";
import useCategory from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";
import useTitle from "../../hooks/useTitle";
import { IPrimaryCategoryPayload } from "../../interfaces/Category";
import { ISearchFilterPayload } from "../../interfaces/Filter";
import routes from "../../routes/Routes";
import { formatTitle } from "../../util/util";

function CategoryPrimary() {
  const { cPrimary } = useParams();
  const navigate = useNavigate();
  const {
    categoryLoading,
    fetchCategoriesProduct,
    fetchPrimaryCategoryBySlugifiedName,
  } = useCategory();
  const { products, fetchAllProducts } = useProduct();

  const [primaryCategory, setPrimaryCategory] =
    useState<IPrimaryCategoryPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    fetchAllProducts(filter).finally(() => setIsLoading(false));
  }, [categoryLoading]);

  useEffect(() => {
    fetchCategoriesProduct("");
  }, []);

  return (
    <Container maxW={{ base: "container.sm", lg: "container.xl" }}>
      <Box>
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

      <ProductContainer
        products={products.data}
        label={"Products"}
        isLoading={isLoading}
        onLoadMore={() => navigate(routes.SEARCH("", primaryCategory?.id, 1))}
      />
    </Container>
  );
}

export default CategoryPrimary;
