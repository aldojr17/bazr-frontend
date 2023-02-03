import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import slugify from "slugify";
import Icon from "../../assets/icons";
import { IBreadCrumbProps } from "../../interfaces/Components";
import routes from "../../routes/Routes";

function BreadCrumb(props: IBreadCrumbProps) {
  const { categories } = props;

  return (
    <Breadcrumb
      display={{ base: "none", lg: "flex" }}
      spacing="8px"
      separator={<Icon.ChevronRight color="gray.500" />}
      my={8}
      variant="default"
    >
      <BreadcrumbItem>
        <BreadcrumbLink href={routes.HOME}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      {categories.primary_category?.id && (
        <BreadcrumbItem isCurrentPage={!categories.secondary_category?.id}>
          <BreadcrumbLink
            href={routes.PRIMARY_CATEGORY(
              slugify(categories.primary_category?.name)
            )}
            color={`${
              categories.secondary_category?.id ? "darkLighten" : "primary"
            }`}
          >
            {categories.primary_category?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {categories.secondary_category?.id && (
        <BreadcrumbItem isCurrentPage={!categories.tertiary_category?.id}>
          <BreadcrumbLink
            href={routes.SECONDARY_CATEGORY(
              slugify(categories.primary_category?.name!),
              slugify(categories.secondary_category?.name),
              categories.secondary_category?.id
            )}
            color={`${
              categories.tertiary_category?.id ? "darkLighten" : "primary"
            }`}
          >
            {categories.secondary_category?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {categories.tertiary_category?.id && (
        <BreadcrumbItem>
          <BreadcrumbLink
            href={routes.TERTIARY_CATEGORY(
              slugify(categories.primary_category?.name!),
              slugify(categories.secondary_category?.name!),
              slugify(categories.tertiary_category?.name),
              categories.tertiary_category?.id
            )}
            color={"primary"}
          >
            {categories.tertiary_category?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}

export default BreadCrumb;
