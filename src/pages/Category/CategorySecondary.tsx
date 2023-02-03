import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CategoryScrollableContainer from "../../components/Container/CategoryScrollableContainer";
import useCategory from "../../hooks/useCategory";
import useTitle from "../../hooks/useTitle";
import {
  IPrimaryCategoryPayload,
  ISecondaryCategoryPayload,
} from "../../interfaces/Category";
import { formatTitle } from "../../util/util";
import Search from "../Search/Search";

function CategorySecondary() {
  const { cPrimary, cSecondary } = useParams();
  const {
    categoryLoading,
    fetchCategoriesProduct,
    fetchPrimaryCategoryBySlugifiedName,
    fetchSecondaryCategoryBySlugifiedName,
  } = useCategory();

  const [primaryCategory, setPrimaryCategory] =
    useState<IPrimaryCategoryPayload | null>(null);

  const [secondaryCategory, setSecondaryCategory] =
    useState<ISecondaryCategoryPayload | null>(null);

  useTitle(formatTitle(secondaryCategory?.name!));

  useEffect(() => {
    let primary = fetchPrimaryCategoryBySlugifiedName(cPrimary!);
    let secondary = fetchSecondaryCategoryBySlugifiedName(
      cPrimary!,
      cSecondary!
    );

    setPrimaryCategory(primary ?? null);
    setSecondaryCategory(secondary ?? null);
  }, [categoryLoading]);

  useEffect(() => {
    fetchCategoriesProduct("");
  }, []);

  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        {primaryCategory && secondaryCategory && (
          <BreadCrumb
            categories={{
              id: 0,
              primary_category: {
                id: primaryCategory.id,
                name: primaryCategory.name,
              },
              secondary_category: {
                id: secondaryCategory.id,
                name: secondaryCategory.name,
              },
            }}
          />
        )}
        {secondaryCategory && (
          <CategoryScrollableContainer
            categoryLevel="tertiary"
            primaryURL={cPrimary}
            secondaryURL={cSecondary}
            categories={secondaryCategory?.tertiary_category!}
            label={secondaryCategory?.name}
          />
        )}
      </Box>

      <Search />
    </>
  );
}

export default CategorySecondary;
