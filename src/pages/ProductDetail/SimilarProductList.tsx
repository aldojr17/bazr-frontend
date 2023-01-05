import { useEffect, useState } from "react";
import ProductScrollableContainer from "../../components/Container/ProductScrollableContainer";
import useProduct from "../../hooks/useProduct";
import {
  IProductPayload,
  ISimilarProductListProps,
} from "../../interfaces/Product";

function SimilarProductList(props: ISimilarProductListProps) {
  const {} = props;
  const { getProducts } = useProduct();

  const [products, setProducts] = useState<IProductPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts({
      limit: 24,
    })
      .then((response) => setProducts(response?.data!))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductScrollableContainer
      products={products}
      label={"Similar items"}
      isLoading={isLoading}
      link={"#"}
    />
  );
}

export default SimilarProductList;
