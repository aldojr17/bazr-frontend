import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContainer from "../../components/Container/ProductContainer";
import useProduct from "../../hooks/useProduct";

function ProductShowcase() {
  const navigate = useNavigate();
  const { products, getProducts } = useProduct();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts({
      limit: 18,
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
