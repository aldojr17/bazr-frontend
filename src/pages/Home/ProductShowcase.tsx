import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContainer from "../../components/Container/ProductContainer";
import useProduct from "../../hooks/useProduct";

function ProductShowcase() {
  const navigate = useNavigate();
  const { products, fetchAllProducts } = useProduct();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts({
      limit: 18,
      sortBy: "unit_sold",
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductContainer
      products={products.data}
      label={"Recommended"}
      isLoading={isLoading}
      onLoadMore={() => navigate("/search?q=")}
    />
  );
}

export default ProductShowcase;
