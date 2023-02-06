import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductContainer from "../../components/Container/ProductContainer";
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
    <Container maxW={{ base: "container.sm", lg: "container.xl" }}>
      <ProductContainer
        products={products}
        label={"My Favorites"}
        isLoading={isLoading}
      />
      <Pagination
        data={{
          total_page: totalPage,
          current_page: page,
        }}
        setPage={setPage}
      />
    </Container>
  );
}

export default UserFavorite;
