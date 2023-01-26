import { Button, Center, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { IProductContainerProps } from "../../interfaces/Components";
import ProductCard from "../Card/ProductCard";
import ErrorContainer from "../Default/ErrorContainer";
import NoProductContainer from "../Default/NoProductContainer";

function ProductContainer(props: IProductContainerProps) {
  const { products, label, isLoading, isError, onError, onLoadMore } = props;
  return (
    <Flex direction={{ base: "column", lg: "column" }} my={10}>
      <Flex justifyContent={"space-between"}>
        <Heading
          variant={"sectionHeading"}
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
        >
          {label}
        </Heading>
      </Flex>
      {isError ? (
        <ErrorContainer onError={onError} />
      ) : (
        <>
          {products.length === 0 ? (
            <NoProductContainer onReload={onError} />
          ) : (
            <Skeleton isLoaded={!isLoading} borderRadius={"lg"}>
              <Flex
                wrap={"wrap"}
                direction={"row"}
                justifyContent={"space-between"}
                rowGap={{ base: 1, sm: 3, lg: 2 }}
                columnGap={{ base: 1, sm: 2, lg: 1 }}
                _after={{
                  md: { content: '""', flex: "auto" },
                  lg: { content: "none" },
                }}
              >
                {products.length !== 0 &&
                  products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
              </Flex>
              {onLoadMore && (
                <Center mt={5}>
                  <Button variant={"primary"} onClick={() => onLoadMore()}>
                    See All Products
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
