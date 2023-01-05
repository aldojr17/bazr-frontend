import { useEffect, useState } from "react";
import ProductScrollableContainer from "../../components/Container/ProductScrollableContainer";
import useProduct from "../../hooks/useProduct";
import {
  IProductPayload,
  IStoreProductListProps,
} from "../../interfaces/Product";

function StoreProductList(props: IStoreProductListProps) {
  const { shopId } = props;
  const { getShopProducts } = useProduct();

  const [products, setProducts] = useState<IProductPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getShopProducts(shopId, {
      limit: 12,
    })
      .then((response) => setProducts(response!.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductScrollableContainer
      products={products}
      label={"More from this store"}
      isLoading={isLoading}
      link={"#"}
    />
  );
}

export default StoreProductList;
