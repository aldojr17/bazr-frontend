import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import useCategory from "../../hooks/useCategory";
import {
  IPrimaryCategoryPayload,
  ISecondaryCategoryPayload,
  ITertiaryCategoryPayload,
} from "../../interfaces/Category";
import Search from "../Search/Search";

function CategoryTertiary() {
  const { cPrimary, cSecondary, cTertiary } = useParams();
  const {
    categoryLoading,
    fetchCategoriesProduct,
    fetchPrimaryCategoryBySlugifiedName,
    fetchSecondaryCategoryBySlugifiedName,
    fetchTertiaryCategoryBySlugifiedName,
  } = useCategory();

  const [primaryCategory, setPrimaryCategory] =
    useState<IPrimaryCategoryPayload | null>(null);

  const [secondaryCategory, setSecondaryCategory] =
    useState<ISecondaryCategoryPayload | null>(null);

  const [tertiaryCategory, setTertiaryCategory] =
    useState<ITertiaryCategoryPayload | null>(null);

  useEffect(() => {
    let primary = fetchPrimaryCategoryBySlugifiedName(cPrimary!);
    let secondary = fetchSecondaryCategoryBySlugifiedName(
      cPrimary!,
      cSecondary!
    );
    let tertiary = fetchTertiaryCategoryBySlugifiedName(
      cPrimary!,
      cSecondary!,
      cTertiary!
    );

    setPrimaryCategory(primary ?? null);
    setSecondaryCategory(secondary ?? null);
    setTertiaryCategory(tertiary ?? null);
  }, [categoryLoading]);

  useEffect(() => {
    fetchCategoriesProduct("");
  }, []);

  return (
    <>
      <Box className="px-4 pt-4 px-lg-5 pt-lg-5">
        {primaryCategory && secondaryCategory && tertiaryCategory && (
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
              tertiary_category: {
                id: tertiaryCategory.id,
                name: tertiaryCategory.name,
              },
            }}
          />
        )}
        <Heading
          variant={"sectionHeading"}
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
        >
          {tertiaryCategory?.name}
        </Heading>
      </Box>
      <Search />
    </>
  );
}

export default CategoryTertiary;
