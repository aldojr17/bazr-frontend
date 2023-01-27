import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/Routes";

function ProductDashboard() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(routes.SELLER_PRODUCT_CREATE, { replace: true });
      }}
    >
      Add Product
    </Button>
  );
}

export default ProductDashboard;
