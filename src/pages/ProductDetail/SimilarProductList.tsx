import { useEffect, useState } from "react";
import ProductScrollableContainer from "../../components/Container/ProductScrollableContainer";
import useProduct from "../../hooks/useProduct";
import { ISimilarProductListProps } from "../../interfaces/Components/PDP";
import { IProductPayload } from "../../interfaces/Product";
import routes from "../../routes/Routes";

function SimilarProductList(props: ISimilarProductListProps) {
  const { productCategoryId, productCategoryLevel } = props;
  const { fetchAllProducts } = useProduct();

  const [products, setProducts] = useState<IProductPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts({
      limit: 24,
      category: productCategoryId,
      category_level: productCategoryLevel,
    })
      .then((response) => setProducts(response?.data!))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductScrollableContainer
      products={products}
      label={"Similar items"}
      isLoading={isLoading}
      link={routes.SEARCH("", productCategoryId, productCategoryLevel)}
    />
  );
}

export default SimilarProductList;
