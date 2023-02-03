import { Container, Flex, Box, Heading, Skeleton } from "@chakra-ui/react";
import ProductCard from "../../components/Card/ProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import useUser from "../../hooks/useUser";
import { IProductPayload } from "../../interfaces/Product";

function UserFavorite() {
  const { fetchUserFavouriteProduct } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);
  const [products, setProduct] = useState<IProductPayload[]>([]);

  const updateProduct = async () => {
    const response = await fetchUserFavouriteProduct({ page: page });
    setIsLoading(true);

    if (response.is_success) {
      setProduct(response.data.data);
      setTotalPage(response.data.total_page);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateProduct();
  }, [page]);

  return (
    <Container maxW="container.xl">
      <Box
        py={{
          base: "1em",
          sm: "1.5em",
          md: "2em",
          lg: "2.5em",
          xl: "4em",
        }}
      >
        <Flex direction="column" width="100%">
          <Heading
            size={{
              base: "md",
              sm: "lg",
            }}
          >
            My Favourites
          </Heading>
          <Skeleton isLoaded={!isLoading} borderRadius={"lg"}>
            <Flex
              wrap={"wrap"}
              direction={"row"}
              justifyContent={products.length <= 5 ? "start" : "space-between"}
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
            <Pagination
              data={{
                total_page: totalPage,
                current_page: page,
              }}
              setPage={setPage}
            />
          </Skeleton>
        </Flex>
      </Box>
    </Container>
  );
}

export default UserFavorite;
