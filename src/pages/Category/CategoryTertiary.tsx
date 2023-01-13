import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import slugify from "slugify";
import useCategory from "../../hooks/useCategory";
import Search from "../Search/Search";

function CategoryTertiary() {
  const { cPrimary, cSecondary, cTertiary } = useParams();
  const {
    fetchPrimaryCategoryBySlugifiedName,
    fetchSecondaryCategoryBySlugifiedName,
    fetchTertiaryCategoryBySlugifiedName,
  } = useCategory();
  return (
    <>
      <Box className="px-4 pt-4 px-lg-5 pt-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          <span>
            {
              fetchTertiaryCategoryBySlugifiedName(
                cPrimary!,
                cSecondary!,
                cTertiary!
              )?.name
            }
          </span>
        </Heading>
        <Breadcrumb separator=">">
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/p/${slugify(
                fetchPrimaryCategoryBySlugifiedName(cPrimary!)!.name
              )}`}
            >
              {fetchPrimaryCategoryBySlugifiedName(cPrimary!)?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/p/${slugify(
                fetchPrimaryCategoryBySlugifiedName(cPrimary!)!.name
              )}/${slugify(
                fetchSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)!
                  .name
              )}?q=&c=${
                fetchSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                  ?.id
              }&cl=2`}
            >
              {
                fetchSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                  ?.name
              }
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              {
                fetchTertiaryCategoryBySlugifiedName(
                  cPrimary!,
                  cSecondary!,
                  cTertiary!
                )?.name
              }
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Search />
    </>
  );
}

export default CategoryTertiary;
