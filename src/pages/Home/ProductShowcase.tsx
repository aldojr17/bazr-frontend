import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContainer from "../../components/Container/ProductContainer";
import useProduct from "../../hooks/useProduct";
import routes from "../../routes/Routes";

function ProductShowcase() {
  const navigate = useNavigate();
  const { products, fetchAllProducts } = useProduct();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts({
      limit: 18,
      sortBy: "view_count",
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductContainer
      products={products.data}
      label={"Recommended"}
      isLoading={isLoading}
      onLoadMore={() => navigate(routes.SEARCH(""))}
    />
  );
}

export default ProductShowcase;
