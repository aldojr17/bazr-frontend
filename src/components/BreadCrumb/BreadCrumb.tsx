import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { IBreadCrumbProps } from "../../interfaces/Components";

function BreadCrumb(props: IBreadCrumbProps) {
  const { categories } = props;

  return (
    <Breadcrumb
      spacing="8px"
      separator={<FiChevronRight color="gray.500" />}
      my={8}
      variant="default"
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {categories.primary_id && (
        <BreadcrumbItem isCurrentPage={!categories.secondary_id}>
          <BreadcrumbLink
            href="#"
            color={`${categories.secondary_id ? "primary" : "secondary"}`}
          >
            {categories.primary_category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {categories.secondary_id && (
        <BreadcrumbItem isCurrentPage={!categories.tertiary_id}>
          <BreadcrumbLink
            href="#"
            color={`${categories.tertiary_id ? "primary" : "secondary"}`}
          >
            {categories.secondary_category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {categories.tertiary_id && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" color={"secondary"}>
            {categories.tertiary_category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}

export default BreadCrumb;
