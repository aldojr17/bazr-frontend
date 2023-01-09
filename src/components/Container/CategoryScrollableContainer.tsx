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
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import CategoryCard from "../Card/CategoryCard";

function CategoryScrollableContainer(props: ICategoryScrollableContainerProps) {
  const { label, categories, isLoading, onError } = props;
  const navigate = useNavigate();

  return (
    <>
      {categories.length !== 0 && (
        <Flex direction={"column"} my={2}>
          <Flex justifyContent={"space-between"}>
            <Heading
              fontWeight={"bold"}
              fontSize={{ base: "md", sm: "xl", md: "2xl" }}
              mb={3}
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
              <XScrollableWrapper>
                {categories.map((category) => (
                  <CategoryCard
                    {...category}
                    key={category.id}
                    onClick={() => navigate(`p/${slugify(category.name)}`)}
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
