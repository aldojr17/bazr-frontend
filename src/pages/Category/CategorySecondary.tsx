import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import CategoryCard from "../../components/Card/CategoryCard";
import useCategory from "../../hooks/useCategory";
import { CategoryWrapper } from "../Home/style";
import Search from "../Search/Search";

function CategorySecondary() {
  const { cPrimary, cSecondary } = useParams();
  const {
    getPrimaryCategoryBySlugifiedName,
    getSecondaryCategoryBySlugifiedName,
  } = useCategory();
  const navigate = useNavigate();
  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          <span>
            {getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)?.name}
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
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              {
                getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                  ?.name
              }
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <CategoryWrapper>
          {getSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!) !==
          undefined
            ? getSecondaryCategoryBySlugifiedName(
                cPrimary!,
                cSecondary!
              )?.tertiary_category.map((tertiary_category) => {
                return (
                  <CategoryCard
                    {...tertiary_category}
                    key={tertiary_category.id}
                    onClick={() => {
                      navigate(
                        `/p/${cPrimary}/${slugify(
                          getSecondaryCategoryBySlugifiedName(
                            cPrimary!,
                            cSecondary!
                          )!.name
                        )}/${slugify(tertiary_category.name)}?q=&c=${
                          tertiary_category.id
                        }&cl=3`
                      );
                    }}
                  />
                );
              })
            : ""}
        </CategoryWrapper>
      </Box>

      <Search />
    </>
  );
}

export default CategorySecondary;
