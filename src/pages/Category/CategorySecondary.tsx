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
    fetchPrimaryCategoryBySlugifiedName,
    fetchSecondaryCategoryBySlugifiedName,
  } = useCategory();
  const navigate = useNavigate();

  const slugifiedSecondary = fetchSecondaryCategoryBySlugifiedName(
    cPrimary!,
    cSecondary!
  );

  return (
    <>
      <Box className="p-4 pb-5 p-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          <span>
            {
              fetchSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                ?.name
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
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              {
                fetchSecondaryCategoryBySlugifiedName(cPrimary!, cSecondary!)
                  ?.name
              }
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <CategoryWrapper>
          {slugifiedSecondary?.tertiary_category?.map((tertiary_category) => {
            return (
              <CategoryCard
                {...tertiary_category}
                key={tertiary_category.id}
                onClick={() => {
                  navigate(
                    `/p/${cPrimary}/${slugify(
                      fetchSecondaryCategoryBySlugifiedName(
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
          })}
        </CategoryWrapper>
      </Box>

      <Search />
    </>
  );
}

export default CategorySecondary;
