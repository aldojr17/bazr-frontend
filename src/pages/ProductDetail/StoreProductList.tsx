import { useEffect, useState } from "react";
import ProductScrollableContainer from "../../components/Container/ProductScrollableContainer";
import useProduct from "../../hooks/useProduct";
import { IStoreProductListProps } from "../../interfaces/Components/PDP";
import { IProductPayload } from "../../interfaces/Product";
import routes from "../../routes/Routes";

function StoreProductList(props: IStoreProductListProps) {
  const { shopId, shopName, shopUsername } = props;
  const { fetchShopProducts } = useProduct();

  const [products, setProducts] = useState<IProductPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchShopProducts(shopId, {
      limit: 12,
    })
      .then((response) => setProducts(response!.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductScrollableContainer
      products={products}
      label={`More from ${shopName}`}
      isLoading={isLoading}
      link={routes.SHOP(shopUsername)}
    />
  );
}

export default StoreProductList;
