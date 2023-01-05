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
    getPrimaryCategoryBySlugifiedName,
    getSecondaryCategoryBySlugifiedName,
    getTertiaryCategoryBySlugifiedName,
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
              getTertiaryCategoryBySlugifiedName(
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
                getPrimaryCategoryBySlugifiedName(cPrimary!)!.name
              )}`}
            >
              {getPrimaryCategoryBySlugifiedName(cPrimary!)?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/p/${slugify(
                getPrimaryCategoryBySlugifiedName(cPrimary!)!.name
              )}/${slugify(
                getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)!
                  .name
              )}?q=&c=${
                getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)?.id
              }&cl=2`}
            >
              {
                getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                  ?.name
              }
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              {
                getTertiaryCategoryBySlugifiedName(
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
