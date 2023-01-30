import { useEffect, useState } from "react";
import ProductContainer from "../../components/Container/ProductContainer";
import useProduct from "../../hooks/useProduct";
import { IProductPaginationPayload } from "../../interfaces/Product";
import { IShopHomeProductsOverviewProps } from "../../interfaces/Shop";

function ShopHomeProductsOverview(props: IShopHomeProductsOverviewProps) {
  const {
    shopId,
    resetCategory,
    setIndexActiveTab,
    scrollToSortOption,
    resetSortBy,
    resetSort,
    resetPage,
  } = props;
  const { fetchShopProducts } = useProduct();
  const [shopProducts, setShopProducts] = useState<IProductPaginationPayload>({
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  });

  const requirement = {
    quantityProductToDisplay: 6,
    sortBy: {
      purchased: "unit_sold",
      most: "desc",
    },
  };

  const handleMoreProducts = () => {
    resetCategory();
    setIndexActiveTab(0);
    resetSortBy();
    resetSort();
    resetPage();
    scrollToSortOption();
  };

  useEffect(() => {
    fetchShopProducts(shopId, {
      limit: requirement.quantityProductToDisplay,
      sort: requirement.sortBy.most,
      sortBy: requirement.sortBy.purchased,
    }).then((response) => setShopProducts(response!));
  }, [shopId]);

  return (
    <ProductContainer
      products={shopProducts.data}
      label={"Best Seller"}
      seeMoreLabel={"more best sellers"}
      onSeeMore={handleMoreProducts}
    />
  );
}

export default ShopHomeProductsOverview;
