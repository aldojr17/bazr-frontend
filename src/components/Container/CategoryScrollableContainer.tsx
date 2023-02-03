import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Icon from "../../assets/icons";
import { ICategoryScrollableContainerProps } from "../../interfaces/Components";
import routes from "../../routes/Routes";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import CategoryCard from "../Card/CategoryCard";

function CategoryScrollableContainer(props: ICategoryScrollableContainerProps) {
  const {
    label,
    categoryLevel,
    categories,
    primaryURL,
    secondaryURL,
    isLoading,
    onError,
  } = props;
  const navigate = useNavigate();

  const handleCardOnClick = (categoryId: number, categoryURL: string) => {
    switch (categoryLevel) {
      case "primary":
        navigate(routes.PRIMARY_CATEGORY(categoryURL));
        return;
      case "secondary":
        navigate(
          routes.SECONDARY_CATEGORY(primaryURL!, categoryURL, categoryId)
        );
        return;
      case "tertiary":
        navigate(
          routes.TERTIARY_CATEGORY(
            primaryURL!,
            secondaryURL!,
            categoryURL,
            categoryId
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <>
      {categories.length !== 0 && (
        <Flex direction={"column"} my={2}>
          <Flex justifyContent={"space-between"}>
            <Heading
              variant={"sectionHeading"}
              fontSize={{ base: "md", sm: "xl", md: "2xl" }}
            >
              {label ?? "Category"}
            </Heading>
          </Flex>
          {onError ? (
            <Box bgColor={"lightLighten"} py={28} borderRadius={"lg"}>
              <Center>
                <VStack>
                  <Text>Something has occurred..</Text>
                  <Text
                    as={Link}
                    href={"#"}
                    variant={"link"}
                    alignItems={"center"}
                    fontSize={"lg"}
                  >
                    <Icon.Refresh width={4} pb={"2px"} me={2} />
                    Refresh
                  </Text>
                </VStack>
              </Center>
            </Box>
          ) : (
            <Skeleton isLoaded={!isLoading} borderRadius={"lg"}>
              <XScrollableWrapper showScrollbar>
                {categories.map((category) => (
                  <CategoryCard
                    {...category!}
                    key={category.id!}
                    onClick={() =>
                      handleCardOnClick(category.id, slugify(category.name))
                    }
                  />
                ))}
              </XScrollableWrapper>
            </Skeleton>
          )}
        </Flex>
      )}
    </>
  );
}

export default CategoryScrollableContainer;
