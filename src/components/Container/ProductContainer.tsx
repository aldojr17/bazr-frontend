import {
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { IProductContainerProps } from "../../interfaces/Components";
import ProductCard from "../Card/ProductCard";
import ErrorContainer from "../Default/ErrorContainer";
import NoProductContainer from "../Default/NoProductContainer";

function ProductContainer(props: IProductContainerProps) {
  const {
    products,
    label,
    isLoading,
    isError,
    onError,
    loadMoreLabel,
    onLoadMore,
    seeMoreLabel,
    onSeeMore,
  } = props;
  return (
    <Flex direction={{ base: "column", lg: "column" }} my={10}>
      <Flex justifyContent={"space-between"}>
        <Heading
          variant={"sectionHeading"}
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
        >
          {label}
        </Heading>
        {onSeeMore && (
          <HStack alignItems={"center"}>
            <Text variant={"link"} onClick={onSeeMore}>
              {seeMoreLabel ?? "see more"}
              <Icon.ChevronRight width={4} pb={"2px"} />
            </Text>
          </HStack>
        )}
      </Flex>
      {isError ? (
        <ErrorContainer onError={onError} />
      ) : (
        <>
          {products.length === 0 ? (
            <NoProductContainer onReload={onError} />
          ) : (
            <Skeleton isLoaded={!isLoading} borderRadius={"lg"}>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                gap={3}
              >
                {products.length !== 0 &&
                  products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
              </Grid>
              {onLoadMore && (
                <Center mt={5}>
                  <Button variant={"primary"} onClick={() => onLoadMore()}>
                    {loadMoreLabel ?? "See All Products"}
                  </Button>
                </Center>
              )}
            </Skeleton>
          )}
        </>
      )}
    </Flex>
  );
}

export default ProductContainer;
